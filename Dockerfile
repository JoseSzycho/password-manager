FROM node:18.16

RUN mkdir -p /home/app

ENV NODE_ENV=production

COPY . /home/app

RUN npm install

EXPOSE 3000

CMD ["node", "/home/app/dist/app.js"]