#!/usr/bin/env bash
docker build -t web .
docker tag web kolenich/web
docker push kolenich/web
