document.addEventListener('DOMContentLoaded', () => {
    initializeColorCopyEngine();
});

function initializeColorCopyEngine() {
    const colorCards = document.querySelectorAll('.color-card');

    colorCards.forEach(card => {
        card.addEventListener('click', () => {
            const hexCode = card.getAttribute('data-hex');

            copyToClipboard(hexCode).then(() => {
                showToastNotification(`Copied ${hexCode} to clipboard!`);
            }).catch(err => {
                console.error('Failed to copy color code: ', err);
                showToastNotification('Unable to copy to clipboard');
            });
        });
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    }

    return new Promise((resolve, reject) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            const successful = document.execCommand('copy');
            document.body.removeChild(textarea);
            if (successful) resolve();
            else reject(new Error('execCommand failed'));
        } catch (err) {
            document.body.removeChild(textarea);
            reject(err);
        }
    });
}

function showToastNotification(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    
    // Trigger show animation
    toast.classList.add('show');
    
    // Remove show class to hide toast after delay
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}
