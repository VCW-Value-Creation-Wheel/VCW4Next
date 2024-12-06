#################################
### stage 1 - generate build ###
#################################
FROM eclipse-temurin:17-jdk-alpine as builder

WORKDIR /home/app/

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN chmod +x mvnw && \
    ./mvnw install -DskipTests && \
    cp /home/app/target/*.jar app.jar && \
    java -Djarmode=layertools -jar app.jar extract

################################
### stage 2 - package java  ###
################################
FROM eclipse-temurin:17-jre-alpine

COPY --from=builder /home/app/app.jar /app.jar

EXPOSE 8080

ENTRYPOINT [ "java",  "-Xms512m", "-Xmx512m", "-jar", "/app.jar" ]