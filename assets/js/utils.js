
// Utility functions for the Art&You platform
// This helps handle common operations safely

// Safe element getter to avoid null reference errors
window.getElement = function(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element with selector "${selector}" not found`);
  }
  return element;
};

// Safe property setter to avoid errors when setting properties on null elements
window.safeSetProperty = function(element, property, value) {
  if (!element) {
    console.warn(`Cannot set ${property} on null element`);
    return;
  }
  
  try {
    if (property.includes('.')) {
      const props = property.split('.');
      let obj = element;
      for (let i = 0; i < props.length - 1; i++) {
        if (!obj[props[i]]) return;
        obj = obj[props[i]];
      }
      obj[props[props.length - 1]] = value;
    } else {
      element[property] = value;
    }
  } catch (error) {
    console.error(`Error setting property ${property}:`, error);
  }
};

// Safe event handler attachments
window.addSafeEventListener = function(element, event, handler) {
  if (!element) {
    console.warn(`Cannot add ${event} listener to null element`);
    return;
  }
  
  try {
    element.addEventListener(event, handler);
  } catch (error) {
    console.error(`Error adding ${event} listener:`, error);
  }
};

// Null-safe DOM operations
window.domUtils = {
  setText: function(selector, text) {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  },
  
  setHtml: function(selector, html) {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = html;
  },
  
  setAttr: function(selector, attr, value) {
    const element = document.querySelector(selector);
    if (element) element.setAttribute(attr, value);
  },
  
  addClass: function(selector, className) {
    const element = document.querySelector(selector);
    if (element) element.classList.add(className);
  },
  
  removeClass: function(selector, className) {
    const element = document.querySelector(selector);
    if (element) element.classList.remove(className);
  }
};
// Utility functions for Art&You marketplace

// Safe event handler attachment - prevents null reference errors
function safeAddEventListener(elementId, eventType, callback) {
  const element = document.getElementById(elementId);
  if (element) {
    element.addEventListener(eventType, callback);
    return true;
  }
  return false;
}

// Safe query selector with event attachment
function safeQuerySelector(selector, eventType, callback) {
  const element = document.querySelector(selector);
  if (element) {
    element.addEventListener(eventType, callback);
    return element;
  }
  return null;
}

// Check if an element exists in the DOM
function elementExists(selector) {
  return document.querySelector(selector) !== null;
}

// Function to safely access nested object properties
function safeGet(obj, path, defaultValue = null) {
  if (!obj) return defaultValue;
  
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === undefined || result === null) {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result !== undefined ? result : defaultValue;
}

// Function to safely handle JSON data
function safeParseJSON(str, defaultValue = {}) {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.warn('Error parsing JSON:', e);
    return defaultValue;
  }
}
