export function appendSVG(element, url) {
  return fetch(url)
    .then((response) => response.text())
    .then((svgContent) => {
      const svgDocument = new DOMParser().parseFromString(
        svgContent,
        "image/svg+xml"
      );
      const svgElement = svgDocument.documentElement;
      element.append(svgElement);
    })
    .catch((error) => {
      console.error("Error loading SVG:", error);
    });
}

/**
 * update classes of a DOM element by adding or removing specific class names.
 *
 * @param {Element} element - the DOM element to update.
 * @param {string[]} [add=[]] - an array of class names to add to the element.
 * @param {string[]} [remove=[]] - an array of class names to remove from the element.
 * @returns {void}
 */
export function updateClasses(element, add = [], remove = []) {
  add.forEach((cls) => element.classList.add(cls));
  remove.forEach((cls) => element.classList.remove(cls));
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Creates and returns a debounced function that delays the execution of the provided function.
 * The debounced function will execute immediately upon its first invocation.
 * Subsequent calls within the defined wait period will be ignored.
 *
 * @param {Function} func - The function to be debounced.
 * @param {number} wait - The time, in milliseconds, to wait before allowing the function to be executed again.
 * @returns {Function} Returns the debounced function.
 */
export function debounce(func, wait) {
  let timeout;
  let isWaiting = false;

  return function (...args) {
    const context = this;

    if (!isWaiting) {
      func.apply(context, args);
      isWaiting = true;
      timeout = setTimeout(() => {
        isWaiting = false;
      }, wait);
    }
  };
}
