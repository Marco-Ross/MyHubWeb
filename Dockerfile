### STAGE 1: Build ###
FROM node:18 AS build
WORKDIR /builder
COPY package.json package-lock.json ./
RUN npm i -g @angular/cli
    
# Install app dependencies:
RUN npm i 
    
COPY . .
RUN ng build --configuration production

### STAGE 2: Run ###
FROM nginx:latest
COPY default.conf /etc/nginx/nginx.conf
COPY --from=build /builder/dist/my-hub-web /usr/share/nginx/html

# COPY /ssl/server.crt /etc/ssl/certs/server.crt
# COPY /ssl/server.key /etc/ssl/private/server.key