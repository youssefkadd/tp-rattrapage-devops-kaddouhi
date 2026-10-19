#!/bin/sh
set -eu
IMAGE="${1:-tp-devops-api:1.0.0}"
CONTAINER="tp-devops-smoke-$$"
cleanup() { docker rm -f "$CONTAINER" >/dev/null 2>&1 || true; }
trap cleanup EXIT INT TERM
docker run -d --name "$CONTAINER" -p 127.0.0.1::3000 "$IMAGE" >/dev/null
sleep 3
PORT="$(docker port "$CONTAINER" 3000/tcp | awk -F: 'NR==1 {print $NF}')"
RESPONSE="$(curl -fsS --max-time 5 "http://127.0.0.1:${PORT}/health")" || exit 1
printf '%s\n' "$RESPONSE"
printf '%s' "$RESPONSE" | grep -q 'ok' || exit 1
echo "Smoke test OK"
