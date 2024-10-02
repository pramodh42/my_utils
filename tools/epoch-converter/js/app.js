document.getElementById('convertBtn').addEventListener('click', function() {
    const epochInput = document.getElementById('epochInput').value;
    const resultsDiv = document.getElementById('results');

    if (!epochInput) {
        resultsDiv.innerHTML = '<p>Please enter a valid epoch time.</p>';
        return;
    }

    const epochTime = parseInt(epochInput, 10);
    if (isNaN(epochTime)) {
        resultsDiv.innerHTML = '<p>Please enter a valid number.</p>';
        return;
    }

    const utcDate = new Date(epochTime * 1000).toUTCString();
    const istDate = new Date(epochTime * 1000 ).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata'
    });

    resultsDiv.innerHTML = `
        <div class="result-item"><strong>UTC Time:</strong> ${utcDate}</div>
        <div class="result-item"><strong>IST Time:</strong> ${istDate}</div>
    `;
});
