const licenseText = document.getElementById('license-text').innerText;
const copyBtn = document.getElementById('copy-btn');
const downloadBtn = document.getElementById('download-btn');

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(licenseText).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied!';
        copyBtn.style.backgroundColor = '#4ade80';
        copyBtn.style.color = '#064e3b';
        
        setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.style.backgroundColor = '';
            copyBtn.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

downloadBtn.addEventListener('click', () => {
    const blob = new Blob([licenseText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LICENSE';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
