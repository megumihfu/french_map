FROM openjdk:21

COPY serveur/map/target/map-0.0.1-SNAPSHOT.jar map-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java", "-jar", "/map-0.0.1-SNAPSHOT.jar"]