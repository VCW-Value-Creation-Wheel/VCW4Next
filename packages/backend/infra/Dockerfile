#################################
### stage 1 - generate build ###
#################################
FROM --platform=linux/amd64 ghcr.io/graalvm/native-image:ol9-java17-22 as builder

WORKDIR /home/app/

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN chmod +x mvnw \
    && ./mvnw -Pnative native:compile -DskipTests

######################################
### stage 2 - package application  ###
######################################
FROM --platform=linux/amd64 alpine:3.17
LABEL maintainer="ScrumTroopers Team"

WORKDIR /home/app

RUN apk add --no-cache libstdc++ gcompat libc6-compat
COPY --from=builder /home/app/target/vcwApi /home/app/

EXPOSE 8080

ENTRYPOINT [ "./vcwApi" ]