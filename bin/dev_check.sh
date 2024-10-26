#!/bin/bash
set -eux

docker compose run --rm lf-front sh -c 'yarn prettier_fix && yarn lint_fix'
