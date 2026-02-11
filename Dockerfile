FROM node:22.21.1-bookworm-slim AS builder
ENV NODE_OPTIONS="--max-old-space-size=6144"

RUN corepack enable && corepack prepare pnpm@latest --activate

# RUN apt-get update && apt-get install --no-install-recommends curl make ca-certificates -y
#
# RUN curl -fsSL https://d2lang.com/install.sh -o /tmp/d2install.sh && \
#     sh /tmp/d2install.sh && \
#     rm /tmp/d2install.sh
#
WORKDIR /app

ARG NODE_OPTIONS="--max-old-space-size=6144"
ENV NODE_OPTIONS=$NODE_OPTIONS

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

RUN find /app/dist -type f -name "*.svg" -exec chmod 644 {} \;

FROM nginx:1.29-bookworm AS production
COPY infra/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
