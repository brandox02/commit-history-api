ARG NODE_VERSION=18.14.1
ARG ALPINE_VERSION=3.17
ARG WORK_DIR=/usr/src/app
ARG USER=node
ARG PORT=3000

###################
# BUILD FOR PRODUCTION
###################
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS build

ARG WORK_DIR
ARG USER
ARG PORT

WORKDIR ${WORK_DIR}

COPY --chown=${USER}:${USER} package*.json ./

RUN npm ci

COPY --chown=${USER}:${USER} . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER ${USER}

###################
# PRODUCTION
###################
ARG NODE_VERSION
ARG ALPINE_VERSION
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS production

ARG WORK_DIR
ARG USER
ARG PORT
ARG OPEN_API_FOLDER=docs
ARG OPEN_API_PATH=${WORK_DIR}/${OPEN_API_FOLDER}

WORKDIR ${WORK_DIR}

ENV OPEN_API_FILE ${OEPN_API_PATH}/api-docs.json

RUN mkdir -p ${OPEN_API_PATH} && \
    touch ${OPEN_API_FILE} && \
    chown ${USER}:${USER} ${OPEN_API_FILE}

# Set ENV variable for app port
ENV PORT ${PORT}

ENV NODE_ENV production

COPY --chown=${USER}:${USER} --from=build ${WORK_DIR}/node_modules ./node_modules
COPY --chown=${USER}:${USER} --from=build ${WORK_DIR}/dist ./dist
COPY --from=build ${WORK_DIR}/package.json ./package.json
COPY --from=build ${WORK_DIR}/tsconfig.json ./tsconfig.json


EXPOSE ${PORT}

CMD [ "node", "dist/main.js" ]
