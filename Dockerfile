FROM maven:3.9-eclipse-temurin-21 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
COPY --from=build /target/weatherfinder-0.0.1-SNAPSHOT.jar weatherfinder.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "weatherfinder.jar"]