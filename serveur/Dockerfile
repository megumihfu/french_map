FROM openjdk:21

COPY map/target/map-0.0.1-SNAPSHOT.jar map-0.0.1-SNAPSHOT.jar

COPY init_db.sh /init_db.sh 

ENTRYPOINT ["java", "-jar", "/map-0.0.1-SNAPSHOT.jar"]
