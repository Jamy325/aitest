import * as THREE from 'three';

export function initRaycastInput(renderer, camera, targets, onPress) {
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function handleEvent(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(targets);
    if (hits.length > 0) {
      const mesh = hits[0].object;
      if (typeof onPress === 'function') {
        onPress(mesh.userData.note, mesh);
      }
    }
  }

  renderer.domElement.addEventListener('click', handleEvent);
}
