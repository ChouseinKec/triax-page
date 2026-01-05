##############################
## Stage 1: Build static site
##############################
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
# With `output: 'export'`, `next build` writes static files to `out/`
RUN npm run build

##############################
## Stage 2: Apache static serve
##############################
FROM httpd:2.4-alpine AS runner

# Copy exported site to Apache's document root
COPY --from=builder /app/out/ /usr/local/apache2/htdocs/

EXPOSE 80
CMD ["httpd-foreground"]