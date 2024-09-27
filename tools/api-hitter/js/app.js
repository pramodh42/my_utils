document.getElementById('apiForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const method = document.getElementById('method').value.trim() || 'GET';
    let url = document.getElementById('url').value.trim();
    const headers = document.getElementById('headers').value.trim();
    const body = document.getElementById('body').value.trim();

    if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }

    const requestOptions = {
        method: method,
        headers: headers ? JSON.parse(headers) : {},
        body: body ? JSON.stringify(JSON.parse(body)) : null,
    };

    try {
        const response = await fetch(url, requestOptions);

        const responseData = await response.text(); 
        document.getElementById('response').textContent = responseData;
    } catch (error) {
        document.getElementById('response').textContent = `Error: ${error.message}`;
    }
});


function parseCurl(curl) {
    const result = {};
    const curlParts = curl.match(/'([^']+)'|"([^"]+)"|([^'"\s]+)/g) || [];

    const url = curlParts.find(part => /^https?:\/\//i.test(part));
    if (url) {
        result.url = url.replace(/['"]/g, ''); 
    }

    if (curl.includes('-X')) {
        const methodIndex = curlParts.indexOf('-X') + 1;
        result.method = curlParts[methodIndex];
    } else {
        result.method = 'GET';
    }

    result.headers = {};
    curlParts.forEach((part, index) => {
        if (part.startsWith('-H')) {
            const header = curlParts[index + 1].split(':');
            if (header.length === 2) {
                result.headers[header[0].trim()] = header[1].trim();
            }
        }
    });

    const dataIndex = curlParts.indexOf('--data') !== -1 ? curlParts.indexOf('--data') : curlParts.indexOf('--data-binary');
    if (dataIndex !== -1) {
        result.body = curlParts[dataIndex + 1];
    }

    return result;
}


document.getElementById('curlInput').addEventListener('input', function () {
    const curlInput = this.value.trim();
    if (curlInput) {
        const parsed = parseCurl(curlInput);
        document.getElementById('method').value = parsed.method || 'GET';
        document.getElementById('url').value = parsed.url || ''; // Populate URL correctly
        document.getElementById('headers').value = Object.keys(parsed.headers).length > 0 ? JSON.stringify(parsed.headers, null, 2) : ''; 
        document.getElementById('body').value = parsed.body || ''; // Populate body if present
    } else {
        document.getElementById('method').value = 'GET';
        document.getElementById('url').value = '';
        document.getElementById('headers').value = '';
        document.getElementById('body').value = '';
    }
});
