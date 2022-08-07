FROM node:16-alpine as builder

# 작업 폴더를 만들고 npm 설치
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --silent
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]