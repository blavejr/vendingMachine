# docker container to run an express backend server

FROM node:21-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
# Bundle app source
COPY . .

# Build the app
RUN npm run build

# Expose port 3001
EXPOSE 3000

# Run the app
CMD [ "npm", "start" ]