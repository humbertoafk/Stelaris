document.addEventListener('DOMContentLoaded', () => {
    const increaseFontButton = document.getElementById('increase-font');
    const decreaseFontButton = document.getElementById('decrease-font');
    const rootElement = document.documentElement;
    const defaultFontSize = 16;
  
    // Aplicar el tamaño de fuente guardado en localStorage
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      rootElement.style.fontSize = `${savedFontSize}px`;
    }
  
    increaseFontButton.addEventListener('click', () => {
      const currentFontSize = parseFloat(getComputedStyle(rootElement).fontSize);
      const newFontSize = currentFontSize + 1;
      rootElement.style.fontSize = `${newFontSize}px`;
      localStorage.setItem('fontSize', newFontSize);
    });
  
    decreaseFontButton.addEventListener('click', () => {
      const currentFontSize = parseFloat(getComputedStyle(rootElement).fontSize);
      if (currentFontSize > 10) { // Evitar que el tamaño de fuente sea demasiado pequeño
        const newFontSize = currentFontSize - 1;
        rootElement.style.fontSize = `${newFontSize}px`;
        localStorage.setItem('fontSize', newFontSize);
      }
    });
  
    // Restablecer el tamaño de fuente al tamaño predeterminado
    const resetFontButton = document.getElementById('reset-font');
    if (resetFontButton) {
      resetFontButton.addEventListener('click', () => {
        rootElement.style.fontSize = `${defaultFontSize}px`;
        localStorage.setItem('fontSize', defaultFontSize);
      });
    }
  });
  