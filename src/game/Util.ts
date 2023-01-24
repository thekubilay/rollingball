import * as THREE from "three"
import {Object3D} from "three";
import CANNON from "cannon-es";

class Util {
  BALL(): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({color: "#FFC312"})
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.set(-2.5, 1, -12.5)
    mesh.receiveShadow = true
    mesh.castShadow = true

    return mesh
  }

  GROUND(): THREE.Mesh {
    const geometry = new THREE.PlaneGeometry(70, 60);
    const material = new THREE.MeshPhongMaterial({
      color: "#f7f1e3",
      opacity: .7,
      transparent: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh
  }

  PROJECT1(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const material = new THREE.MeshBasicMaterial({
      color: "#f1c40f",
      map: new THREE.TextureLoader().load("smile.png"),
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(-10, 2, -12.5)
    mesh.castShadow = false;
    mesh.receiveShadow = false;

    return mesh;
  };

  PROJECT2(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const material = new THREE.MeshBasicMaterial({
      color: "#f1c40f",
      map: new THREE.TextureLoader().load("smile.png"),
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(-7, 2, -22.5)
    mesh.castShadow = false;
    mesh.receiveShadow = false;

    return mesh;
  };

  PROJECT3(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const material = new THREE.MeshBasicMaterial({
      color: "#f1c40f",
      map: new THREE.TextureLoader().load("smile.png"),
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(-8, 2, 17.5)
    mesh.castShadow = false;
    mesh.receiveShadow = false;

    return mesh;
  };

  PROJECT4(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const material = new THREE.MeshBasicMaterial({
      color: "#f1c40f",
      map: new THREE.TextureLoader().load("smile.png"),
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(12.5, 2, 22.5)
    mesh.castShadow = false;
    mesh.receiveShadow = false;

    return mesh;
  };

  PROJECT5(): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const material = new THREE.MeshBasicMaterial({
      color: "#f1c40f",
      map: new THREE.TextureLoader().load("smile.png"),
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(7.5, 2, -7.5)
    mesh.castShadow = false;
    mesh.receiveShadow = false;

    return mesh;
  };

  GOAL(): THREE.Mesh {
    const geometry = new THREE.PlaneGeometry(3.7, 2.5);
    const material = new THREE.MeshBasicMaterial({
      // color: "#FFFFFF",
      map: new THREE.TextureLoader().load("goal.png"),
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(2.5, .1, -10.5)
    mesh.rotation.x = -Math.PI / 2
    mesh.castShadow = false;
    mesh.receiveShadow = false;

    return mesh;
  };

  create_walls(scene: THREE.Scene): void {
    const walls = [
      {position: new THREE.Vector3(30, 2, 0), size: new THREE.Vector3(.2, 2, 20), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-30, 2, 0), size: new THREE.Vector3(.2, 2, 20), collisionFilterGroup: 1},
      {position: new THREE.Vector3(0, 2, 25), size: new THREE.Vector3(24, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(0, 2, -25), size: new THREE.Vector3(24, 2, .2), collisionFilterGroup: 1},

      // // vertical left
      {position: new THREE.Vector3(-15, 2, -15), size: new THREE.Vector3(.2, 2, 4), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-20, 2, -12.5), size: new THREE.Vector3(.2, 2, 6), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-25, 2, -12.5), size: new THREE.Vector3(.2, 2, 2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-10, 2, -2.5), size: new THREE.Vector3(.2, 2, 2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-15, 2, 7.5), size: new THREE.Vector3(.2, 2, 2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-20, 2, 5), size: new THREE.Vector3(.2, 2, 4), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-25, 2, 5), size: new THREE.Vector3(.2, 2, 4), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-15, 2, 20), size: new THREE.Vector3(.2, 2, 4), collisionFilterGroup: 1},
      // // vertical right
      {position: new THREE.Vector3(25, 2, -17.5), size: new THREE.Vector3(.2, 2, 2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(15, 2, -10), size: new THREE.Vector3(.2, 2, 4), collisionFilterGroup: 1},
      {position: new THREE.Vector3(10, 2, -10), size: new THREE.Vector3(.2, 2, 8), collisionFilterGroup: 1},
      {position: new THREE.Vector3(5, 2, -10), size: new THREE.Vector3(.2, 2, 4), collisionFilterGroup: 1},
      {position: new THREE.Vector3(0, 2, -2.5), size: new THREE.Vector3(.2, 2, 18), collisionFilterGroup: 1},
      {position: new THREE.Vector3(20, 2, 2.5), size: new THREE.Vector3(.2, 2, 2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(25, 2, 5), size: new THREE.Vector3(.2, 2, 4), collisionFilterGroup: 1},
      {position: new THREE.Vector3(25, 2, 20), size: new THREE.Vector3(.2, 2, 4), collisionFilterGroup: 1},
      {position: new THREE.Vector3(15, 2, 12.5), size: new THREE.Vector3(.2, 2, 6), collisionFilterGroup: 1},
      {position: new THREE.Vector3(10, 2, 15), size: new THREE.Vector3(.2, 2, 4), collisionFilterGroup: 1},
      {position: new THREE.Vector3(5, 2, 20), size: new THREE.Vector3(.2, 2, 4), collisionFilterGroup: 1},
      //
      // // horizontal left
      {position: new THREE.Vector3(-27.5, 2, -20), size: new THREE.Vector3(2, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-22.5, 2, -15), size: new THREE.Vector3(2, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-27.5, 2, -5), size: new THREE.Vector3(2, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-27.5, 2, 10), size: new THREE.Vector3(2, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-25, 2, 20), size: new THREE.Vector3(4, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-15, 2, 15), size: new THREE.Vector3(8, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-5, 2, 20), size: new THREE.Vector3(4, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-7.5, 2, 10), size: new THREE.Vector3(6.5, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-10, 2, 5), size: new THREE.Vector3(4, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-17.5, 2, 0), size: new THREE.Vector3(6, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-12.5, 2, -5), size: new THREE.Vector3(6, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-7.5, 2, -10), size: new THREE.Vector3(6, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-5, 2, -15), size: new THREE.Vector3(4, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-10, 2, -20), size: new THREE.Vector3(4, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(-2.5, 2, 0), size: new THREE.Vector3(2, 2, .2), collisionFilterGroup: 1},
      //
      // // horizontal right
      {position: new THREE.Vector3(2.5, 2, -15), size: new THREE.Vector3(2, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(15, 2, -20), size: new THREE.Vector3(8, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(10, 2, 0), size: new THREE.Vector3(8, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(20, 2, -5), size: new THREE.Vector3(4, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(20, 2, -15), size: new THREE.Vector3(4, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(25, 2, -10), size: new THREE.Vector3(4, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(27.5, 2, 0), size: new THREE.Vector3(2, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(5, 2, 10), size: new THREE.Vector3(4, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(10, 2, 5), size: new THREE.Vector3(4, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(20, 2, 10), size: new THREE.Vector3(4, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(22.5, 2, 15), size: new THREE.Vector3(2, 2, .2), collisionFilterGroup: 1},
      {position: new THREE.Vector3(17.5, 2, 20), size: new THREE.Vector3(2, 2, .2), collisionFilterGroup: 1},

    ];

    walls.forEach(wall => {
      scene.add(this.createWall(wall.position, wall.size));
    });
  }

  createWall(position: THREE.Vector3, size: THREE.Vector3,): THREE.Mesh {
    const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const material = new THREE.MeshBasicMaterial({
      color: "#005db2",
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.copy(position)
    mesh.scale.copy(size)
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    return mesh
  }

}


export default Util