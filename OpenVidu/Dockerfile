FROM node:16-alpine as builder

# 작업 폴더를 만들고 npm 설치
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --save --save-exact react-scripts@5.0.1 --silent
RUN npm install --silent
COPY . .

EXPOSE 5442

# 소스를 작업폴더로 복사하고 앱 실행
CMD ["npm", "run", "start:docker"]