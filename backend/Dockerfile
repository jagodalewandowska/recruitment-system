FROM openjdk:17-jdk
VOLUME /tmp
#ADD target/backend-0.0.1-SNAPSHOT.jar
COPY ./target/backend-0.0.1-SNAPSHOT.jar .
#EXPOSE 8082
#CMD java -jar backend-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","backend-0.0.1-SNAPSHOT.jar"]
