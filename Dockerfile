FROM node:20-alpine
WORKDIR ./ChatAPP
COPY ./ChatAPP/ ./ 
RUN npm install
EXPOSE 8080
CMD ["node", "index.js"]
