FROM node:14-alpine
RUN addgroup -S mch && adduser -S mch -G mch
COPY .npmrc-docker /home/mch/.npmrc
COPY . /app
RUN chown -R mch:mch /home/mch/.npmrc
RUN chown -R mch:mch /app
USER mch
WORKDIR /app
RUN rm .npmrc-docker
RUN npm i
ENTRYPOINT ["npm", "start"]
EXPOSE 3000
