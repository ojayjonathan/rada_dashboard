FROM node:16-alpine3.11 as builder

WORKDIR /

COPY package*.json ./

RUN npm install 

RUN npm install react-scripts@4.0.3 -g 

COPY . ./

RUN npm run build

#production env 

FROM nginx:stable-alpine

COPY --from=builder /build/ /usr/share/nginx/html/dashboard

COPY --from=builder /build/*.html /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
