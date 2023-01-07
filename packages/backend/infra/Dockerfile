#################################
### stage 1 - generate build ###
#################################
FROM ghcr.io/graalvm/native-image:ol9-java17-22 as builder

WORKDIR /home/app/

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN chmod +x mvnw \
    && ./mvnw clean -Pnative -DskipTests package

######################################
### stage 2 - package application  ###
######################################
FROM alpine:3.17
LABEL maintainer="ScrumTroopers Team"

WORKDIR /home/app

RUN apk add --no-cache gcompat libc6-compat
COPY --from=builder /home/app/target/vcwApi /home/app/

EXPOSE 8080

ENTRYPOINT [ "./vcwApi" ]