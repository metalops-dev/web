---
title: "Securing PostgreSQL with TLS via Traefik"
description: "How to terminate TLS for your PostgreSQL connections at Traefik, using Lets Encrypt without managing certificates inside your database container."
pubDate: "May 08 2026"
tags: ["postgresql", "traefik", "security", "devops"]
draft: true
---

Running a database publicly is generally not a great idea, and running it without encryption is worse. Credentials go over the wire in plain text, meaning anyone positioned to sniff traffic on your network path can grab them. You could configure PostgreSQL with its own TLS certificate, but if you're already using Traefik as your reverse proxy, there's a cleaner path: let Traefik handle TLS termination for your database connections the same way it handles your HTTP services.

This is something I set up recently and it works well, so here's how it works and how to configure it.

## How It Works

PostgreSQL uses a protocol called **STARTTLS** to negotiate encryption. When a client connects, it sends a special 8-byte message called an `SSLRequest` packet, asking the server if it supports TLS. The server responds with either `S` (yes) or `N` (no), and if the client gets `S`, the TLS handshake begins from there. It's the same concept as STARTTLS in email protocols, just adapted for databases.

Traefik speaks this protocol natively. When a client connects to your configured TCP entrypoint, Traefik reads those first bytes, recognises the SSLRequest packet, responds with `S`, and performs the TLS handshake using a certificate it fetches from Let's Encrypt. Once the handshake completes, Traefik decrypts the traffic and forwards plain TCP to your Postgres container on the internal Docker network.

The flow looks like this:

```d2
direction: right

client: Client

traefik: Traefik (:5432)

postgres: PostgreSQL

le: Let's Encrypt

client -> traefik: TLS 1.3 (encrypted)
traefik -> le: ACME challenge
le -> traefik: TLS certificate
traefik -> postgres: Plain TCP (internal)
```

From the client's perspective, it has a fully encrypted TLS 1.3 connection to your database. From Postgres's perspective, it's receiving plain TCP on an internal network and doesn't need to know anything about TLS.

## Why This Approach

The alternative is **TLS passthrough** — Traefik forwards the encrypted bytes directly to Postgres, and Postgres handles TLS itself with its own certificate. This works, but it has some drawbacks:

- You need to provision and renew certificates inside the Postgres container
- Traefik can't inspect or route based on connection content
- More moving parts to maintain

With TLS termination at Traefik, you get a single place to manage all your certificates via Let's Encrypt, automatic renewal, and a clean separation of concerns: Traefik handles security at the edge, Postgres focuses on being a database.

The tradeoff is that traffic between Traefik and Postgres is unencrypted. That's fine when both are on the same internal Docker network. If you're running a multi-host cluster where Traefik and Postgres live on different hosts, you'd want to encrypt that leg too, but for single-host deployments it's not a concern.

## Configuration

### Traefik Static Config

Add a dedicated TCP entrypoint for Postgres and a Let's Encrypt certificate resolver:

```yaml
entryPoints:
  postgres:
    address: ":5432"

certificatesResolvers:
  letsencrypt:
    acme:
      email: your@email.com
      storage: acme.json
      httpChallenge:
        entryPoint: http
      keyType: EC384
```

### Postgres Docker Labels

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.tcp.routers.pg.rule=HostSNI(`pg.yourdomain.com`)"
  - "traefik.tcp.routers.pg.entrypoints=postgres"
  - "traefik.tcp.routers.pg.tls=true"
  - "traefik.tcp.routers.pg.tls.certresolver=letsencrypt"
  - "traefik.tcp.routers.pg.service=pg-loadbalancer"
  - "traefik.tcp.services.pg-loadbalancer.loadbalancer.server.port=5432"
  - "traefik.docker.network=proxy"
```

A few things worth noting:

- `HostSNI` works because the client sends the hostname as part of the TLS handshake (Server Name Indication). Traefik uses this to match the router rule and select the right certificate.
- The router and service must be explicitly linked via the `service` label. Unlike HTTP routers, Traefik won't auto-associate TCP routers and services by name.
- The Postgres container only needs to be on the `proxy` network for Traefik to reach it. Port 5432 does not need to be exposed to the host.

### Postgres Container

No special configuration needed inside the Postgres container. It receives plain TCP from Traefik and doesn't need any SSL settings:

```yaml
services:
  postgres:
    image: postgres:18-bookworm
    expose:
      - "5432"
    networks:
      - postgres_network
      - proxy
```

### Connecting

With `sslmode=require`, your client negotiates TLS with Traefik and gets a fully encrypted connection:

```bash
psql "postgresql://user:password@pg.yourdomain.com:5432/mydb?sslmode=require"
```

You can verify the TLS details:

```
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_128_GCM_SHA256, compression: off)
```

## A Note on sslmode

PostgreSQL's `sslmode` has several values: `disable`, `allow`, `prefer`, `require`, `verify-ca`, and `verify-full`. Use `require` for this setup. The STARTTLS negotiation only makes sense if the client is going to follow through with TLS. Values like `allow` and `prefer` have ambiguous behaviour in this context and may fail depending on how Traefik responds to the initial negotiation. Using `require` tells the client to always attempt TLS and fail the connection if it can't be established, which is the correct behaviour here.

## Wrapping Up

Traefik's native support for PostgreSQL STARTTLS means you can secure your database connections with Let's Encrypt certificates using the same tooling you already use for your HTTP services. No certificate management inside the database container, no manual renewal, and a single consistent approach across your entire stack.

The setup is minimal, the security is real, and once it's running you don't have to think about it again.
