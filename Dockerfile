FROM maven:3.8.4-openjdk-17-slim AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
COPY --from=build /target/weatherfinder-0.0.1-SNAPSHOT.jar weatherfinder.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "weatherfinder.jar"]