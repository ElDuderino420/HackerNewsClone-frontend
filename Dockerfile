FROM node:boron

ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV=production

RUN npm install webpack -g
RUN npm install serve -g


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app
RUN webpack --config webpack.config.js

CMD ["serve", "-s", "/usr/src/app/public/"]

EXPOSE 5000