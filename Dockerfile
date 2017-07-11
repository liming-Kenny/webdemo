#this is a image for api tool
#author: liny
FROM registry.cn-hangzhou.aliyuncs.com/lin_yong_space/liny_typescript
MAINTAINER linyong
RUN mkdir /workspace
WORKDIR /workspace
COPY /* /workspace
RUN cnpm install 
RUN typings install
RUN tsc
VOLUME /data
