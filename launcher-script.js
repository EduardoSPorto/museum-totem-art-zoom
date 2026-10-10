// Painting Pigment Explorer - Launcher Script
// Handles configuration UI and URL generation

document.addEventListener('DOMContentLoaded', function() {
    const langRadios = document.querySelectorAll('input[name="language"]');
    const ttsCheckbox = document.getElementById('tts-enabled');
    const urlDisplay = document.getElementById('urlDisplay');
    const launchBtn = document.getElementById('launchBtn');
    const copyBtn = document.getElementById('copyBtn');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const loader = document.getElementById('loader');

    // Function to generate the application URL
    function generateUrl() {
        const language = document.querySelector('input[name="language"]:checked').value;
        const ttsEnabled = ttsCheckbox.checked;

        let url = './painting-pigment-explorer.html';
        const params = new URLSearchParams();

        params.append('lang', language);
        params.append('tts', ttsEnabled ? '1' : '0');

        if (params.toString()) {
            url += '?' + params.toString();
        }

        return url;
    }

    // Function to get the absolute URL
    function getAbsoluteUrl() {
        const relativePath = generateUrl();
        const baseUrl = window.location.origin + window.location.pathname.replace('launcher.html', '');
        return baseUrl.replace(/\/$/, '') + '/' + relativePath.replace('./', '');
    }

    // Function to update the displayed URL
    function updateUrlDisplay() {
        const url = getAbsoluteUrl();
        urlDisplay.textContent = url;
    }

    // Function to copy text to clipboard
    function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                // Show feedback
                const originalText = copyBtn.textContent;
                copyBtn.textContent = '✓ Copied!';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.classList.remove('copied');
                }, 2000);
            }).catch(() => {
                fallbackCopyToClipboard(text);
            });
        } else {
            fallbackCopyToClipboard(text);
        }
    }

    // Fallback copy to clipboard for older browsers
    function fallbackCopyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            copyBtn.textContent = '✓ Copied!';
            copyBtn.classList.add('copied');
            setTimeout(() => {
                copyBtn.textContent = 'Copy';
                copyBtn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        document.body.removeChild(textarea);
    }

    // Event listeners for configuration changes
    langRadios.forEach(radio => {
        radio.addEventListener('change', updateUrlDisplay);
    });

    ttsCheckbox.addEventListener('change', updateUrlDisplay);

    // Copy button
    copyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        copyToClipboard(getAbsoluteUrl());
    });

    // Copy link button
    copyLinkBtn.addEventListener('click', function(e) {
        e.preventDefault();
        copyToClipboard(getAbsoluteUrl());
    });

    // Launch button
    launchBtn.addEventListener('click', function() {
        loader.style.display = 'inline-block';
        launchBtn.disabled = true;

        const url = generateUrl();
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    });

    // Initial URL display
    updateUrlDisplay();

    // Auto-focus language selection (accessibility)
    const defaultLang = document.getElementById('lang-pt') || document.getElementById('lang-en');
    if (defaultLang) defaultLang.focus();
});
