#################################
### stage 1 - generate bundle ###
#################################
# base image
FROM node:18.12.1-buster-slim as bundle

ARG CONFIGURATION=production

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json

#- ngcc: pre-compile
RUN yarn global add @angular/cli@15.0.4 && yarn && ngcc

# add app
COPY . /app

# generate bundle
RUN ng build --output-path=dist --configuration=$CONFIGURATION

################################
### stage 2 - generate image ###
################################

# base image
FROM nginx:stable-alpine

# copy artifact bundle from the 'stage 1'
COPY --from=bundle /app/dist /usr/share/nginx/html

# set nginx permission in
RUN chown nginx:nginx /usr/share/nginx/html/* && chmod -R 0755 /usr/share/nginx/html/*

# Copy custom nginx.conf
COPY ./infra/nginx-config/* /etc/nginx/

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]