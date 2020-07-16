FROM balenalib/raspberrypi3-debian-node:12.16.3-buster-build

WORKDIR /root/.homebridge
RUN npm install -g --unsafe-perm homebridge homebridge-mqtt
COPY ./setup.js ./
RUN ["node", "./setup.js"]
RUN ["rm", "./setup.js"]
ENTRYPOINT [ "homebridge" ]
# ARG AVAHI
# ENV ENABLE_AVAHI="${AVAHI:-0}"
