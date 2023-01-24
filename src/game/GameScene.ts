import * as THREE from "three";
import {GamePhysic} from "./GamePhysic";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import Util from "./Util";


class GameScene {
  physic: GamePhysic;
  util = new Util()
  canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true, alpha: true})
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  orbitControls: OrbitControls;
  spotLight = new THREE.SpotLight(0xffffff, 1);
  ambientLight = new THREE.AmbientLight("#ececec", 1)
  ball = this.util.BALL()

  constructor(ww: number = window.innerWidth, wh: number = window.innerHeight) {
    this.physic = new GamePhysic(this)

    this.renderer.setSize(ww, wh)
    this.renderer.shadowMap.enabled = true

    this.camera = new THREE.PerspectiveCamera(75, ww / ww, 0.1, 1000)
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix()

    // this.camera.position.z = 10;
    this.camera.position.y = 50;
    this.camera.lookAt(new THREE.Vector3(this.ball.position.x, 0, this.ball.position.z));

    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);

    this.spotLight.castShadow = true;

    this.scene.add(this.ball)
    // this.scene.add(this.spotLight);
    this.scene.add(this.ambientLight);
    // this.scene.add(new THREE.AxesHelper(5));

  }

}

export default GameScene