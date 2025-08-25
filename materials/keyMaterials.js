import * as THREE from 'three';

export function createKeyMaterials() {
  const whiteMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
  const blackMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
  return { whiteMaterial, blackMaterial };
}
