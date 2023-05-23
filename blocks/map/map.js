import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {

  const map = document.createElement('map');
  map.name = 'myMap'
  const image = document.createElement('img');
  image.src = 'https://i.ibb.co/zrHVB4x/Screenshot-2023-05-22-at-11-49-29-PM.png';
  image.alt = 'Image Description';
  image.useMap = '#myMap';
  
  const area1 = document.createElement('area');
  area1.shape = 'rect';
  area1.coords = '0,0,100,200';
  area1.addEventListener('click', () => {
    console.log('Clicked on Area 1');
  });
  area1.style.borderBlockColor = 'red';
  area1.href="#"
  
  const area2 = document.createElement('area');
  area2.shape = 'circle';
  area2.coords = '0,0,200';
  area2.addEventListener('click', () => {
    console.log('Clicked on Area 2');
  });
  area2.style.backgroundColor = 'blue';
  
  // image.addEventListener('click', () => {
  //   console.log("I'm he")
  // });
  map.append(area1);
  map.append(area2);
  
  // Append the image and map to the document
  block.appendChild(image);
  block.appendChild(map);
  
  
  //block.append(image);
  //block.append(map);
  //block.append(map);
}


// https://i.ibb.co/zrHVB4x/Screenshot-2023-05-22-at-11-49-29-PM.png
// https://i.ibb.co/dPDsnL9/Design-for-all.png