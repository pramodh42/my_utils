const htmlInput = document.getElementById('htmlInput');
const htmlPreview = document.getElementById('htmlPreview');
const divider = document.getElementById('divider');

htmlInput.addEventListener('input', updatePreview);
divider.addEventListener('mousedown', initResize);

function updatePreview() {
    const htmlContent = htmlInput.value;
    htmlPreview.srcdoc = htmlContent; // Update the iframe with the new HTML content
}

let isResizing = false;

function initResize(e) {
    isResizing = true;

    // Attach mousemove and mouseup events to the window
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResize);
}

function resize(e) {
    if (isResizing) {
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        
        // Calculate new width based on mouse position
        const newWidth = e.clientX - containerRect.left;

        // Set minimum width for editor and preview
        const minWidth = 100; // 100 pixels minimum width

        if (newWidth > minWidth && (containerRect.width - newWidth) > minWidth) {
            document.querySelector('.editor').style.width = `${newWidth}px`;
            document.querySelector('.preview').style.width = `${containerRect.width - newWidth}px`;
        }
    }
}

function stopResize() {
    isResizing = false;

    // Remove mousemove and mouseup events from the window
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
}
