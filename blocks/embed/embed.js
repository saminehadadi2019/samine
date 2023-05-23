import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default function decorate(block) {
  const iframe = document.createElement('iframe');
  iframe.width = '100%';
  iframe.height = '600';
  iframe.src = `https://www.youtube.com/embed/JkWWjpULpjU`;
  block.append(iframe);
  //block.append(iframe);
}
