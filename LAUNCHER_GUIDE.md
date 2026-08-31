# 🚀 Painting Pigment Explorer - Easy Launcher Guide

## For Linux Users - No Terminal Required!

This guide explains how to easily run the Painting Pigment Explorer application without using the terminal.

---

## Quick Start (Easiest Method)

### Option 1: Using the Launcher Script

1. **Open the project folder** in your file manager
2. **Right-click on `run.sh`** and select **"Run as Program"** or **"Execute"**
3. Wait for the terminal to show the server URL (should look like `http://localhost:8000`)
4. A launcher page should open automatically in your browser
5. ✅ Configure your preferences and launch!

### Option 2: Double-Click to Run

If the above doesn't work:

1. **Right-click on `run.sh`**
2. Select **"Properties"** → **"Permissions"**
3. Check **"Allow executing file as program"**
4. Now you can **double-click** `run.sh` to run it

---

## Launcher Interface

Once the server starts, you'll see a beautiful launcher page with:

### 🌐 Language Selection
- **English** - Full English interface
- **Português** - Portuguese interface with Portuguese data

### 🔊 Text-to-Speech
- **Enable/Disable** voice narration for content descriptions

### 📍 URL Display
Shows the application URL. You can:
- **Copy** it to clipboard
- **Share** with others
- **Open** in a different browser

### Buttons
- **🚀 Launch Application** - Opens the app directly
- **📋 Copy Link** - Copies the URL to clipboard

---

## Manual Server Start (Alternative)

If `run.sh` doesn't work:

### Using Python 3 (Recommended)
```bash
cd ~/code/museum-totem-art-zoom
python3 -m http.server 8000
```

Then open in browser: `http://localhost:8000/launcher.html`

### Using Python 2 (Older Systems)
```bash
cd ~/code/museum-totem-art-zoom
python -m SimpleHTTPServer 8000
```

### Using PHP
```bash
cd ~/code/museum-totem-art-zoom
php -S localhost:8000
```

---

## Full Application URLs

After configuration, here are the possible URLs:

```
English + TTS ON:  http://localhost:8000/painting-pigment-explorer.html?lang=en&tts=1
English + TTS OFF: http://localhost:8000/painting-pigment-explorer.html?lang=en&tts=0
Portuguese + TTS ON:  http://localhost:8000/painting-pigment-explorer.html?lang=pt&tts=1
Portuguese + TTS OFF: http://localhost:8000/painting-pigment-explorer.html?lang=pt&tts=0
```

---

## Accessing from Other Devices

To access the application from another computer or device on the same network:

1. Find your computer's IP address:
   - Linux: Run `hostname -I` in terminal (look for local IP like `192.168.x.x`)
   - Or check System Settings → Network

2. Use the IP instead of `localhost`:
   ```
   http://YOUR_IP_ADDRESS:8000/launcher.html
   http://192.168.1.100:8000/launcher.html  (example)
   ```

---

## Desktop Shortcut (Optional - Advanced)

To create a desktop shortcut:

1. Create a new file on desktop called `Launch Pigment Explorer.desktop`:
   ```
   [Desktop Entry]
   Type=Application
   Name=Painting Pigment Explorer
   Exec=/home/user/code/museum-totem-art-zoom/run.sh
   Icon=applications-graphics
   Terminal=true
   Categories=Utility;
   ```

2. Make it executable:
   ```bash
   chmod +x ~/Desktop/Launch\ Pigment\ Explorer.desktop
   ```

3. Now you can double-click it from the desktop!

---

## Troubleshooting

### Problem: "Permission denied" when running run.sh
**Solution:** Run this in terminal:
```bash
chmod +x ~/code/museum-totem-art-zoom/run.sh
```

### Problem: "Port already in use" error
**Solution:** The script automatically tries the next available port. Just wait and the URL will show which port was assigned.

### Problem: Page won't open automatically
**Solution:** Check the terminal output for the URL and manually copy-paste it into your browser.

### Problem: Can't install Python/PHP
**Solution:** Most Linux distributions have Python pre-installed. Try:
```bash
python3 --version
```

### Problem: Launcher won't load
**Solution:** Make sure you're in the correct directory:
```bash
cd ~/code/museum-totem-art-zoom
python3 -m http.server 8000
```

---

## Features of the Launcher

✅ **No terminal skills required** - Visual interface for all settings
✅ **One-click launch** - Starts everything automatically
✅ **Automatic port detection** - Finds available port automatically
✅ **Configuration memory** - Settings persist during your session
✅ **Shareable URL** - Easy to share with others
✅ **Multiple languages** - English and Portuguese support
✅ **Voice narration** - Optional TTS for descriptions
✅ **Responsive design** - Works on phones, tablets, and computers

---

## Notes

- The application requires a modern web browser (Chrome, Firefox, Edge, Safari)
- WebGL support is recommended for best performance
- Webcam/gesture recognition requires a camera
- No internet connection needed - runs entirely locally

---

## Need Help?

Check the main [README.md](README.md) for more technical information about the application.

Enjoy exploring the fascinating world of painting pigments! 🎨
