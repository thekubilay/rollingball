import * as THREE from "three"
import {Object3D} from "three";
export const BALL = (): Object3D => {
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshBasicMaterial({color: "#FFC312"})
  const mesh = new THREE.Mesh(geometry, material)

  mesh.position.set(-2.5, 1, -12.5)

  return mesh
}