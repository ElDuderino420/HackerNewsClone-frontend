FROM node:boron

ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV=production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm config set registry http://registry.npmjs.org/ && npm install

# Bundle app source
COPY . /usr/src/app
RUN npm install webpack -g
RUN npm run build

RUN npm install serve -g
CMD ["serve", "-s", "/usr/src/app/publsic/"]

EXPOSE 5000