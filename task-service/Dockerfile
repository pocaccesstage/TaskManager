FROM java:8-jre

ADD ./target/task-service.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/task-service.jar"]

EXPOSE 6000