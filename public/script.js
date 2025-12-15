document.addEventListener('DOMContentLoaded', async () => {
    const btn = document.getElementById('getTokenBtn');
    const display = document.getElementById('token-display');
    let siteKey = null;
    let recaptchaLoaded = false;

    function log(message) {
        display.value = message;
        console.log(message);
    }

    // 1. Fetch configuration
    try {
        const response = await fetch('/config');
        const data = await response.json();
        siteKey = data.siteKey;
        console.log('Config fetched. Site Key exists:', !!siteKey);
    } catch (error) {
        log('Error fetching configuration: ' + error.message);
        return;
    }

    if (!siteKey || siteKey === 'YOUR_SITE_KEY_HERE') {
        log('Error: RECAPTCHA_SITE_KEY is not set in .env file.');
        return;
    }

    // 2. Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
        console.log('reCAPTCHA script loaded successfully.');
        recaptchaLoaded = true;
    };

    script.onerror = (e) => {
        console.error('Script load error:', e);
        log('Error: Failed to load reCAPTCHA script. Check your internet connection or Site Key.');
    };

    document.head.appendChild(script);

    // 3. Handle Button Click
    btn.addEventListener('click', () => {
        if (!siteKey) {
            log('Error: Site Key missing.');
            return;
        }

        if (!recaptchaLoaded || typeof grecaptcha === 'undefined') {
            log('Error: reCAPTCHA script not yet loaded. Please wait or check console for errors.');
            return;
        }

        log('Generating token...');

        try {
            grecaptcha.ready(() => {
                grecaptcha.execute(siteKey, { action: 'submit' })
                    .then((token) => {
                        log(token);
                    })
                    .catch((err) => {
                        console.error('Execution error:', err);
                        log('Error generating token: ' + err.message);
                    });
            });
        } catch (e) {
            console.error('Exception:', e);
            log('Exception during execution: ' + e.message);
        }
    });
});
