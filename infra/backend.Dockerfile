#################################
### stage 1 - generate build ###
#################################
FROM ghcr.io/graalvm/native-image:ol9-java17-22 as builder

WORKDIR /home/app/

COPY packages/backend/mvnw .
COPY packages/backend/.mvn .mvn
COPY packages/backend/pom.xml .
COPY packages/backend/src src

RUN chmod +x mvnw \
    && ./mvnw clean -Pnative -DskipTests package

######################################
### stage 2 - package application  ###
######################################
FROM alpine:3.17

WORKDIR /home/app

RUN apk add gcompat
COPY --from=builder /home/app/target/vcwApi /home/app/

EXPOSE 8080

ENTRYPOINT [ "./vcwApi" ]