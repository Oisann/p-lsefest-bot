FROM node:6.2.2-slim

MAINTAINER Jonas Myhr Refseth "jonas@oisann.net"

# Update aptitude with new repo
RUN apt-get update

# Install software 
RUN apt-get install -y git

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN git clone https://github.com/Oisann/polsefest-bot.git .

RUN npm install pm2@latest -g

# Install app dependencies
RUN npm install

EXPOSE 80
CMD [ "npm", "start" ]