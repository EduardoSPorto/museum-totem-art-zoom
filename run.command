#!/bin/bash

# Painting Pigment Explorer - Easy Launcher for macOS
# This script starts a local web server and opens the launcher interface

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Port configuration
PORT=8000

# Find an available port
while lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; do
    PORT=$((PORT + 1))
done

echo "🎨 Starting Painting Pigment Explorer..."
echo ""
echo "📍 Local server running at: http://localhost:$PORT"
echo "🌐 Launcher URL:          http://localhost:$PORT/launcher.html"
echo ""
echo "Opening launcher in your default browser..."
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start server in background and open browser
cd "$SCRIPT_DIR"

# Try to open in browser
open "http://localhost:$PORT/launcher.html" 2>/dev/null || echo "Please open http://localhost:$PORT/launcher.html in your browser"

# Start Python HTTP server
python3 -m http.server $PORT --directory .
