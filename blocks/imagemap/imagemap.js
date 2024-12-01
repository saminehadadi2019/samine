import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  try {
    // Extract text content and sanitize
    const text = block.textContent.trim();
    block.textContent = ''; // Clear block for rendering new elements

    // Regex patterns for extracting map configuration
    const srcRegex = /src=\s*([^;]+);/;
    const altRegex = /alt=\s*([^;]+);/;
    const shapeRegex = /shape=\s*([^;]+);/g;
    const coordRegex = /coord=\s*([^;]+);/g;
    const alertRegex = /alert=\s*([^;]+);/g;
    const urlRegex = /url=\s*([^;]+);/g;

    // Parse text content
    const srcMatch = text.match(srcRegex);
    const altMatch = text.match(altRegex);
    const shapeMatches = [...text.matchAll(shapeRegex)].map((m) => m[1].trim());
    const coordMatches = [...text.matchAll(coordRegex)].map((m) => m[1].trim());
    const alertMatches = [...text.matchAll(alertRegex)].map((m) => m[1].trim());
    const urlMatches = [...text.matchAll(urlRegex)].map((m) => m[1].trim());

    // Extract values
    const src = srcMatch ? srcMatch[1].trim() : '';
    const alt = altMatch ? altMatch[1].trim() : '';

    // Debug parsed data
    console.log("Source:", src);
    console.log("Alt Text:", alt);
    console.log("Shapes:", shapeMatches);
    console.log("Coordinates:", coordMatches);
    console.log("Alerts:", alertMatches);
    console.log("URLs:", urlMatches);

    // Validate required fields
    if (!src) {
      console.error('Error: Image source (src) is missing.');
      return;
    }

    // Create map and image elements
    const map = document.createElement('map');
    map.name = 'myMap';

    const image = document.createElement('img');
    image.src = src;
    image.alt = alt;
    image.useMap = '#myMap';

    // Dynamically create and append <area> elements
    for (let i = 0; i < shapeMatches.length; i++) {
      const area = document.createElement('area');
      area.shape = shapeMatches[i];
      area.coords = coordMatches[i] || ''; // Fallback if no coords provided
      area.href = urlMatches[i] || 'javascript:void(0)'; // Prevent navigation if no URL
      area.target = '_blank'; // Open links in a new tab
      area.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default behavior
        if (alertMatches[i]) {
          alert(alertMatches[i]);
        }
      });
      map.appendChild(area);
    }

    // Append elements to the block
    block.appendChild(image);
    block.appendChild(map);

    console.log('Interactive map created successfully.');
  } catch (error) {
    console.error('An error occurred while creating the interactive map:', error);
  }
}
