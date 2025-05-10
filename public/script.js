const qrTabBtn = document.querySelector('.tab-button[data-tab="qr"]');
const nanoTabBtn = document.querySelector('.tab-button[data-tab="nano"]');
const qrFormContainer = document.getElementById('qr-form-container');
const nanoFormContainer = document.getElementById('nano-form-container');
const qrForm = document.getElementById('qr-form');
const nanoForm = document.getElementById('nano-form');
const qrModal = document.getElementById('qr-modal');
const nanoModal = document.getElementById('nano-modal');
const qrCodeImg = document.getElementById('qr-code');
const nanolinkInput = document.getElementById('nanolink');
const qrDownloadBtn = document.getElementById('qr-download-btn');
const qrCloseBtn = document.getElementById('qr-close-btn');
const nanoCopyBtn = document.getElementById('nano-copy-btn');
const nanoCloseBtn = document.getElementById('nano-close-btn');
const qrErrorMessage = document.getElementById('qr-error-message');
const nanoErrorMessage = document.getElementById('nano-error-message');

// Tab switching
qrTabBtn.addEventListener('click', () => {
    qrTabBtn.classList.add('active');
    nanoTabBtn.classList.remove('active');
    qrFormContainer.classList.add('active');
    nanoFormContainer.classList.remove('active');
});

nanoTabBtn.addEventListener('click', () => {
    nanoTabBtn.classList.add('active');
    qrTabBtn.classList.remove('active');
    nanoFormContainer.classList.add('active');
    qrFormContainer.classList.remove('active');
});

// QR code form submission
qrForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('qr-text').value;
    qrErrorMessage.style.display = 'none';

    try {
        const response = await fetch('/qr/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (response.ok) {
            qrCodeImg.src = data.src;
            qrModal.style.display = 'flex';
            qrErrorMessage.style.display = 'none';
        } else {
            qrErrorMessage.textContent = data.error || 'Failed to generate QR code';
            qrErrorMessage.style.display = 'block';
        }
    } catch (err) {
        qrErrorMessage.textContent = 'An error occurred while generating the QR code';
        qrErrorMessage.style.display = 'block';
    }
});

// Nanolink form submission
nanoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('nano-text').value;
    nanoErrorMessage.style.display = 'none';

    try {
        const response = await fetch('/nano/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (response.ok) {
            nanolinkInput.value = data.nanolink;
            nanoModal.style.display = 'flex';
            nanoErrorMessage.style.display = 'none';
        } else {
            nanoErrorMessage.textContent = data.error || 'Failed to generate nanolink';
            nanoErrorMessage.style.display = 'block';
        }
    } catch (err) {
        nanoErrorMessage.textContent = 'An error occurred while generating the nanolink';
        nanoErrorMessage.style.display = 'block';
    }
});

// QR download button
qrDownloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = qrCodeImg.src;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// QR close button
qrCloseBtn.addEventListener('click', () => {
    qrModal.style.display = 'none';
    qrCodeImg.src = '';
});

// Nanolink copy button
nanoCopyBtn.addEventListener('click', () => {
    nanolinkInput.select();
    document.execCommand('copy');
    nanoCopyBtn.textContent = 'Copied!';
    setTimeout(() => {
        nanoCopyBtn.textContent = 'Copy';
    }, 2000);
});

// Nanolink close button
nanoCloseBtn.addEventListener('click', () => {
    nanoModal.style.display = 'none';
    nanolinkInput.value = '';
});

// Close modals on overlay click
qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) {
        qrModal.style.display = 'none';
        qrCodeImg.src = '';
    }
});

nanoModal.addEventListener('click', (e) => {
    if (e.target === nanoModal) {
        nanoModal.style.display = 'none';
        nanolinkInput.value = '';
    }
});