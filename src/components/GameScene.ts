import * as THREE from "three";
import {BALL} from "../helpers";
import {GamePhysic} from "./GamePhysic";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';



class GameScene {
  physic: GamePhysic;
  canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true})
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  orbitControls: OrbitControls;
  spotLight = new THREE.SpotLight(0xffffff, 1);
  ambientLight = new THREE.AmbientLight()
  ball = BALL()

  constructor(ww: number = window.innerWidth, wh: number = window.innerHeight) {
    this.physic = new GamePhysic(this)

    this.renderer.setSize(ww, wh)
    this.renderer.shadowMap.enabled = true

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix()

    // this.camera.position.z = 10;
    this.camera.position.y = 20;
    this.camera.lookAt(new THREE.Vector3(this.ball.position.x, 0, this.ball.position.z));

    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);

    this.spotLight.castShadow = true;

    this.scene.add(this.ball)
    this.scene.add(this.spotLight);
    this.scene.add(this.ambientLight);
    this.scene.add(new THREE.AxesHelper(5));

  }

  render(): void {
    this.physic.update()
    this.orbitControls.update()
    this.renderer.render(this.scene, this.camera)
    this.camera.position.x = this.ball.position.x;
    this.camera.position.z = this.ball.position.z;
    this.camera.position.y = 20;
    this.camera.lookAt(new THREE.Vector3(this.ball.position.x, 0, this.ball.position.z));
    this.renderer.render(this.scene, this.camera)
  }

  animate(): void {
    requestAnimationFrame(this.animate.bind(this))
    this.render()
  }
}

export default GameScene