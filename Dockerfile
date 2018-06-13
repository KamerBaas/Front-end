FROM node:alpine

# Create app directory
WORKDIR /src/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY /src/* /src/

RUN npm install gulp -g && npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]

# Extra comment so I can actually push namechange of file to Github
