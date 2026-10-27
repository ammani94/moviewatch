 FROM --platform=linux/amd64 node:22-alpine


 RUN addgroup -g 1001 -S nodejs && \
     adduser -S -u 1001 -G nodejs nodejs && \
     mkdir -p /app && \
     chown nodejs:nodejs /app

 WORKDIR /app
 USER root
 COPY --chown=nodejs:nodejs package*.json ./
 RUN npm install -g nodemon && \
     npm install --no-optional

 USER nodejs
 COPY --chown=nodejs:nodejs . .

 EXPOSE 3000
 CMD ["npm", "run", "dev"]

