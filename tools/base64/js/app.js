document.addEventListener('DOMContentLoaded', function () {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const processBtn = document.getElementById('processBtn');
    const copyIcon = document.getElementById('copyIcon');
    let mode = 'encode'; 

    document.querySelectorAll('input[name="mode"]').forEach((radio) => {
        radio.addEventListener('change', (event) => {
            mode = event.target.value;
            clearText(); 
        });
    });

    processBtn.addEventListener('click', () => {
        if (mode === 'encode') {
            outputText.value = base64Encode(inputText.value);
        } else {
            try {
                outputText.value = base64Decode(inputText.value);
            } catch (error) {
                alert('Invalid Base64 string for decoding.');
                outputText.value = '';
            }
        }
    });

    
    function base64Encode(input) {
        return btoa(input); 
    }

    
    function base64Decode(input) {
        return atob(input); 
    }

    
    function clearText() {
        inputText.value = '';
        outputText.value = '';
    }

    
    copyIcon.addEventListener('click', () => {
        if (outputText.value !== '') {
            outputText.select(); 
            document.execCommand('copy'); 
            alert('Copied to clipboard!');
        } else {
            alert('Nothing to copy!');
        }
    });
});
