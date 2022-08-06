FROM openjdk:8-jre-alpine AS builder
COPY gradlew .gradle
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew bootJar

FROM openjdk:8-jre-alpine
EXPOSE 8080
ARG JAR_FILE=build/libs/backend-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
