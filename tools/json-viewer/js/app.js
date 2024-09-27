// JSON Viewer Logic

// Function to display input screen
function showInput() {
    document.getElementById("input-screen").style.display = "block";
    document.getElementById("output-screen").style.display = "none";
    document.getElementById("error-message").textContent = "";
  }
  
  // Function to display output screen and parse JSON
  function showOutput() {
    const input = document.getElementById('json-input').value;
    const viewer = document.getElementById('json-viewer');
    const errorMessage = document.getElementById('error-message');
  
    try {
      const parsedJSON = JSON.parse(input);
      viewer.innerHTML = ''; // Clear previous content
      createJSONViewer(parsedJSON, viewer);
      errorMessage.textContent = ''; // Clear error message
      document.getElementById("input-screen").style.display = "none";
      document.getElementById("output-screen").style.display = "block";
    } catch (error) {
      errorMessage.textContent = "Dude, you messed up with the JSON!!";
      viewer.innerHTML = ''; // Clear any previous JSON output
    }
  }
  
  // Function to create the interactive JSON viewer
  function createJSONViewer(json, container) {
    for (const key in json) {
      const keyElement = document.createElement('div');
      keyElement.classList.add('json-key');
  
      const contentElement = document.createElement('div');
      contentElement.classList.add('json-content');
  
      if (Array.isArray(json[key])) {
        keyElement.classList.add('json-array');
        createJSONViewer(json[key], contentElement);
      } else if (typeof json[key] === 'object' && json[key] !== null) {
        keyElement.classList.add('json-object');
        createJSONViewer(json[key], contentElement);
      } else {
        const valueElement = document.createElement('span');
        valueElement.classList.add('json-value');
        
        if (typeof json[key] === 'string') {
          valueElement.classList.add('json-string');
          valueElement.textContent = `"${json[key]}"`;
        } else if (typeof json[key] === 'number') {
          valueElement.classList.add('json-number');
          valueElement.textContent = json[key];
        } else if (typeof json[key] === 'boolean') {
          valueElement.classList.add('json-boolean');
          valueElement.textContent = json[key];
        } else if (json[key] === null) {
          valueElement.classList.add('json-null');
          valueElement.textContent = 'null';
        }
  
        contentElement.appendChild(valueElement);
      }
  
      keyElement.textContent = key;
      container.appendChild(keyElement);
      container.appendChild(contentElement);
  
      keyElement.addEventListener('click', () => {
        contentElement.classList.toggle('json-content-open');
        keyElement.classList.toggle('open');
      });
    }
  }
  
  // Set default to show the input screen
  showInput();
  