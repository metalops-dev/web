---
title: 'D2 Diagrams Example'
description: 'Testing D2 diagram integration with astro-d2'
pubDate: 2024-12-22
draft: true
tags: ['d2', 'diagrams', 'example']
---

This post demonstrates how to use D2 diagrams in your blog posts.

## Basic Shapes

```d2
server: Web Server
database: PostgreSQL
cache: Redis

server -> database: queries
server -> cache: reads/writes
```

## Architecture Diagram

```d2
direction: right

client: Client {
  shape: person
}

lb: Load Balancer {
  shape: hexagon
}

api: API Gateway {
  shape: rectangle
}

services: Microservices {
  auth: Auth Service
  users: Users Service
  orders: Orders Service
}

db: Databases {
  postgres: PostgreSQL
  redis: Redis
  mongo: MongoDB
}

client -> lb
lb -> api
api -> services.auth
api -> services.users
api -> services.orders
services.auth -> db.redis
services.users -> db.postgres
services.orders -> db.mongo
```

## Sequence Diagram

```d2
shape: sequence_diagram

user: User
browser: Browser
server: Server
db: Database

user -> browser: Click login
browser -> server: POST /login
server -> db: SELECT user
db -> server: User data
server -> browser: JWT token
browser -> user: Logged in
```

## Kubernetes Deployment

```d2
k8s: Kubernetes Cluster {
  ns: namespace/production {
    deploy: Deployment {
      replicas: 3
      pod1: Pod
      pod2: Pod
      pod3: Pod
    }
    svc: Service {
      type: ClusterIP
    }
    ing: Ingress {
      shape: cloud
    }
  }
}

internet: Internet {
  shape: cloud
}

internet -> k8s.ns.ing: HTTPS
k8s.ns.ing -> k8s.ns.svc
k8s.ns.svc -> k8s.ns.deploy.pod1
k8s.ns.svc -> k8s.ns.deploy.pod2
k8s.ns.svc -> k8s.ns.deploy.pod3
```

## CI/CD Pipeline

```d2
direction: right

git: Git Push {
  icon: https://icons.terrastruct.com/dev%2Fgit.svg
}

ci: CI Pipeline {
  build: Build
  test: Test
  scan: Security Scan

  build -> test -> scan
}

registry: Container Registry {
  shape: cylinder
}

cd: CD Pipeline {
  staging: Deploy Staging
  prod: Deploy Production

  staging -> prod
}

git -> ci.build
ci.scan -> registry: Push image
registry -> cd.staging: Pull image
```

---

## How to Use D2

D2 is already configured via `astro-d2` in the Astro config. Simply use fenced code blocks with the `d2` language:

````markdown
```d2
server -> database
```
````

The diagrams are rendered at build time and output as SVGs.

### Resources

- [D2 Documentation](https://d2lang.com)
- [D2 Playground](https://play.d2lang.com)
- [astro-d2 Plugin](https://github.com/fabiospampinato/astro-d2)
