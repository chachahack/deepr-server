FROM node:6.2

ADD . /home/server

RUN npm i

CMD npm run start
