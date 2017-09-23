FROM node:boron

# Install and configure `serve`.
RUN npm install -g serve
CMD serve -s build
EXPOSE 5000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install all dependencies of the current project.
COPY package.json /usr/src/app/
COPY npm-shrinkwrap.json /usr/src/app/
RUN npm install

# Copy all local files into the image.
COPY . /usr/src/app/

# Build for production.
RUN npm run build --production

