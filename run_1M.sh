#!/bin/bash

name_root="logs/"

for i in {1..10}; do
    log_name="${name_root}log_${i}_$(date +'%Y-%m-%d-%H-%M')"
    nohup node index.js > $log_name 2>&1 &
done
