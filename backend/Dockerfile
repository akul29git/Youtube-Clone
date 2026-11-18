FROM node:24.20.0-alpine AS base
WORKDIR /app
COPY package*.json ./

# development
FROM base AS dev
ENV NODE_ENV=development
RUN npm ci
COPY . .
RUN mkdir -p pulic/temp
CMD ["npm", "run", "dev"]

# production
FROM base AS prod
ENV NODE_ENV=production
RUN npm ci --omit=dev && npm cache clean --force
COPY --chown=node:node . .
RUN mkdir -p public/temp && chown -R node:node public
USER node
CMD ["node", "src/index.js"]