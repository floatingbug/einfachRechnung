FROM node:22.23.3-alpine3.24

USER node

WORKDIR /home/node

COPY --chown=node:node --chmod=755 . /home/node

RUN npm install

CMD ["node", "main.js"]
