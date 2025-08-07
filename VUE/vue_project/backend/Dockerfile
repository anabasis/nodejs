FROM amazoncorretto:17-alpine
#FROM 173198374979.dkr.ecr.ap-northeast-2.amazonaws.com/eclipse-temurin:17-jre-alpine
#FROM eclipse-temurin:17-jdk-alpine

RUN apk add --no-cache tzdata bash curl

ENV TZ=Asia/Seoul
ENV LANG=ko_KR.UTF-8
ENV LANGUAGE=ko_KR:ko;en_US:en
ENV LC_ALL=ko_KR.UTF-8

EXPOSE 8080

COPY ./build/libs/*.jar app.jar
#ARG PROFILE=dev
#ENV PROFILE=${PROFILE}

#RUN cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime

# opentelemetry-javaagent

RUN mkdir -p /app/bin

COPY ./opentelemetry-javaagent.jar /app/bin/opentelemetry-javaagent.jar

ENV JAVA_TOOL_OPTIONS "${JAVA_TOOL_OPTIONS} \
  -javaagent:/app/bin/opentelemetry-javaagent.jar \
  -Djava.security.egd=file:/dev/./urandom \
  -Duser.timezone=Asia/Seoul"


EXPOSE 8080


ENTRYPOINT ["java","-jar","/app.jar"]