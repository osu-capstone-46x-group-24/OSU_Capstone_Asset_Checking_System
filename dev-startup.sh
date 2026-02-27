#!/bin/bash

BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
PIDS=() # process IDs
CLOSE_ATTEMPTED=false

cleanup() {
  if [ "$CLOSE_ATTEMPTED" = false ]; then
    CLOSE_ATTEMPTED=true

    echo ""
    echo "Caught terminal close or ctrl+c - shutting down node processes..."

    for pid in "${PIDS[@]}"; do
        taskkill /F /PID "$pid" > /dev/null 2>&1
        echo "Killed PID $pid"
    done

    echo "All node services stopped. Press close or ctrl+c to exit..."
    echo ""

    return
  fi

  echo ""
  echo "Exiting, goodbye!"
  exit 0
}

# Trap signals
trap cleanup SIGINT

# Start Frontend
echo "Starting *frontend* at localhost:5173..."
(cd "$BASE_DIR/frontend" && npm run dev) &
PIDS+=($!)

# Start Backend
echo "Starting *backend* at localhost:3001..."
(cd "$BASE_DIR/backend" && npm run dev) &
PIDS+=($!)

# Start Scanner
echo "Starting *scanner* at localhost:3003 + index.html..."
(cd "$BASE_DIR/scanner" && node server.js) &
PIDS+=($!)

echo "Services running with PIDs: ${PIDS[*]}"
echo "Close terminal or press ctrl+c to stop them..."

wait

read -rp "Press Enter to exit..."
