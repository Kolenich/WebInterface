#!/usr/bin/env bash
docker build -t web -f Dockerfile.web .
docker tag web kolenich/web
docker push kolenich/web
