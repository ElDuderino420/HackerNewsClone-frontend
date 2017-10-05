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

RUN npm install serve -g
CMD ["npm", "start"]

EXPOSE 5000