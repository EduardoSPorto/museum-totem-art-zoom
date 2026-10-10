#!/bin/bash

# Painting Pigment Explorer - Easy Launcher for macOS
# This script starts a local web server and opens the launcher interface

set -e

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Port configuration
PORT=8000
MAX_ATTEMPTS=10
ATTEMPT=1

# Function to check if port is available
check_port() {
    if command -v lsof &> /dev/null; then
        ! lsof -i :$1 &> /dev/null
    else
        ! nc -z localhost $1 2> /dev/null
    fi
}

# Find an available port
while ! check_port $PORT && [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
    PORT=$((PORT + 1))
    ATTEMPT=$((ATTEMPT + 1))
done

if [ $ATTEMPT -gt $MAX_ATTEMPTS ]; then
    echo "Error: Could not find an available port after $MAX_ATTEMPTS attempts"
    exit 1
fi

echo "Starting Painting Pigment Explorer"
echo ""
echo "Launcher URL: http://localhost:$PORT/launcher.html"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Check which HTTP server is available
if command -v python3 &> /dev/null; then
    cd "$SCRIPT_DIR"
    python3 -m http.server "$PORT" --directory . &
    SERVER_PID=$!
elif command -v python &> /dev/null; then
    cd "$SCRIPT_DIR"
    python -m SimpleHTTPServer "$PORT" &
    SERVER_PID=$!
elif command -v php &> /dev/null; then
    cd "$SCRIPT_DIR"
    php -S "localhost:$PORT" &
    SERVER_PID=$!
else
    echo "Error: No suitable HTTP server found (python3, python, or php required)"
    exit 1
fi

trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT INT TERM

# Camera access is allowed on localhost, but commonly blocked when the HTML
# file is opened directly from disk. Always open the served URL instead.
if command -v open &> /dev/null; then
    open "http://localhost:$PORT/launcher.html" >/dev/null 2>&1 &
fi

wait "$SERVER_PID"
