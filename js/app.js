function navigateTo(path) {
    history.pushState(null, null, path);
    loadContent(path); 
}

function loadContent(path) {
    let filePath;
    if (path === '/tools/api-hitter') {
        filePath = 'tools/api-hitter/index.html';
    } else if (path === '/tools/json-viewer') {
        filePath = 'tools/json-viewer/index.html';
    } else {
        filePath = '404.html'; 
    }

    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById('body').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}

window.addEventListener('popstate', function() {
    loadContent(location.pathname);
});

document.addEventListener('DOMContentLoaded', function() {
    loadContent(location.pathname);
});
