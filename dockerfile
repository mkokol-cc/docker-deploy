FROM openjdk:17-jdk-alpine
COPY target/sistema-stock-0.0.1-SNAPSHOT.war java-app.jar
ENTRYPOINT ["java", "-jar", "java-app.jar"]
