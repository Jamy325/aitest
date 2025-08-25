import * as THREE from 'three';
import { setupScene } from './scene/setupScene.js';
import { createKeyMaterials } from './materials/keyMaterials.js';
import { addLights } from './lighting/addLights.js';
import { createKeys } from './keys/createKeys.js';
import { initRaycastInput } from './interaction/raycastInput.js';
import { playNote } from './audio/playNotes.js';

const { scene, camera, renderer } = setupScene();
addLights(scene);
const { whiteMaterial, blackMaterial } = createKeyMaterials();

const keyDepthWhite = 4;
const keyDepthBlack = 2;

const keyMeta = createKeys();
const keyMeshes = keyMeta.map(meta => {
  const depth = meta.color === 'black' ? keyDepthBlack : keyDepthWhite;
  const geometry = new THREE.BoxGeometry(meta.width, 1, depth);
  const material = meta.color === 'black' ? blackMaterial : whiteMaterial;
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(
    meta.position.x,
    meta.position.y,
    meta.color === 'black' ? -1 : 0
  );
  mesh.userData.note = meta.note;
  scene.add(mesh);
  return mesh;
});

initRaycastInput(renderer, camera, keyMeshes, (note, mesh) => {
  playNote(note);
  const originalY = mesh.position.y;
  mesh.position.y = originalY - 0.5;
  setTimeout(() => {
    mesh.position.y = originalY;
  }, 100);
});
