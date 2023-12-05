FROM openjdk:11
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} backend-0.0.1-SNAPSHOT.jar
EXPOSE 8082
ENTRYPOINT ["java","-jar","/backend-0.0.1-SNAPSHOT.jar"]
