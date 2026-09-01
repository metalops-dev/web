---
title: 'Mermaid Diagrams Example'
description: 'Testing Mermaid diagram integration with astro-mermaid'
pubDate: 2024-12-22
draft: true
tags: ['mermaid', 'diagrams', 'example']
---

This post demonstrates how to use Mermaid diagrams in your blog posts.

## Basic Shapes

```mermaid
graph TD
  server[Web Server] --> database[PostgreSQL]
  server --> cache[Redis]
```

## Architecture Diagram

```mermaid
flowchart LR
  client[Client] --> lb[Load Balancer]
  lb --> api[API Gateway]
  api --> services_auth[Auth Service]
  api --> services_users[Users Service]
  api --> services_orders[Orders Service]

  services_auth --> db_redis[(Redis)]
  services_users --> db_postgres[(PostgreSQL)]
  services_orders --> db_mongo[(MongoDB)]
```

## Sequence Diagram

```mermaid
sequenceDiagram
  user->>browser: Click login
  browser->>server: POST /login
  server->>db: SELECT user
  db-->>server: User data
  server-->>browser: JWT token
  browser-->>user: Logged in
```

## Kubernetes Deployment

```mermaid
flowchart TB
  k8s[Kubernetes Cluster] --> ns[namespace/production]

  ns --> deploy[Deployment]
  ns --> svc[Service]
  ns --> ing[Ingress]

  deploy --> pod1[Pod 1]
  deploy --> pod2[Pod 2]
  deploy --> pod3[Pod 3]

  internet[Internet] -- HTTPS --> ing
  ing --> svc
  svc --> pod1
  svc --> pod2
  svc --> pod3
```

## CI/CD Pipeline

```mermaid
flowchart LR
  git[Git Push] --> ci_build[Build]
  ci_build --> test[Test]
  ci_build --> scan[Security Scan]
  scan --> registry[Container Registry]
  registry --> staging[Deploy Staging]
  staging --> prod[Deploy Production]
```

---

## How to Use Mermaid

Mermaid is already supported in Astro. Simply use fenced code blocks with the `mermaid` language:

````markdown
```mermaid
server -> database
```
````

The diagrams are rendered at build time and output as SVGs.

### Resources

- [Mermaid Documentation](https://mermaid.js.org)
- [Mermaid Playground](https://mermaid.live)
