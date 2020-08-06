FROM node:14-alpine
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn
COPY . /app
RUN yarn build
RUN cd backend && yarn
ENTRYPOINT ["./entrypoint.sh"]