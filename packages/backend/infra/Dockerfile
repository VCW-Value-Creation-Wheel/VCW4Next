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
FROM gcr.io/distroless/base
LABEL maintainer="ScrumTroopers Team"

WORKDIR /home/app

COPY --from=builder /home/app/target/vcwApi /home/app/

EXPOSE 8080

ENTRYPOINT [ "./vcwApi" ]