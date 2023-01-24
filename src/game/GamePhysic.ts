import * as CANNON from "cannon-es";
import CannonDebugger from "cannon-es-debugger";
import GameScene from "./GameScene";

export class GamePhysic {
  game: GameScene
  world = new CANNON.World()
  ball_body: CANNON.Body | null = null
  ball_material = new CANNON.Material()
  wall_material = new CANNON.Material()
  point_material = new CANNON.Material()
  debugger: any = null
  threshold: number = 10;
  x: number = 0;
  z: number = 0;
  point: string | null = null
  point1 = false
  point2 = false
  point3 = false
  point4 = false
  point5 = false
  goal = false

  constructor(game: GameScene) {
    this.game = game;
    this.world.gravity.set(0, 0, 0);

    // this.world.addEventListener('postStep', () => {
    //   this.contacted = false;
    //   this.world.contacts.forEach(contact => {
    //     this.contacted = contact.bi === this.ball_body;
    //   });
    // });

    this.world.addEventListener("beginContact", (e: any) => {
      // console.log(e.bodyB?.collisionFilterGroup)
      if (e.bodyA === this.ball_body && e.bodyB.collisionFilterGroup === 1) {
        // const impactVelocity = e.contactEquations[0].getImpactVelocity();
        // if(impactVelocity > this.threshold){
        //   let impulse = e.contactEquations[0].ni;
        //   impulse.negate(impulse);
        //   this.ball_body!.applyImpulse(impulse, e.contactEquations[0].ri);
        // }
      } else if (e.bodyA === this.ball_body && e.bodyB.collisionFilterGroup === 2) {
        if (!this.point1) {
          this.point = "Project1"
          this.point1 = true
          setTimeout(() => {
            this.point = null
          }, 30)
        }
      } else if (e.bodyA === this.ball_body && e.bodyB.collisionFilterGroup === 3) {
        if (!this.point2) {
          this.point = "Project2"
          this.point2 = true
          setTimeout(() => {
            this.point = null
          }, 30)
        }
      } else if (e.bodyA === this.ball_body && e.bodyB.collisionFilterGroup === 4) {
        if (!this.point3) {
          this.point = "Project3"
          this.point3 = true
          setTimeout(() => {
            this.point = null
          }, 30)
        }
      } else if (e.bodyA === this.ball_body && e.bodyB.collisionFilterGroup === 5) {
        if (!this.point4) {
          this.point = "Project4"
          this.point4 = true
          setTimeout(() => {
            this.point = null
          }, 30)
        }
      } else if (e.bodyA === this.ball_body && e.bodyB.collisionFilterGroup === 6) {
        if (!this.point5) {
          this.point = "Project5"
          this.point5 = true
          setTimeout(() => {
            this.point = null
          }, 30)
        }
      } else if (e.bodyA === this.ball_body && e.bodyB.collisionFilterGroup === 7) {
        if (!this.goal) {
          this.point = "Goal"
          this.goal = true
        }
      }
    });


    this.ball_material.restitution = 0.01;
    this.wall_material.restitution = 0.01;
    this.ball_material.friction = 0.5;
    this.wall_material.friction = 0.5;

    const ballWallMaterial = new CANNON.ContactMaterial(this.ball_material, this.wall_material, {restitution: .3});
    const ballPointMaterial = new CANNON.ContactMaterial(this.ball_material, this.point_material, {restitution: .3});

    this.world.addContactMaterial(ballWallMaterial);
    this.world.addContactMaterial(ballPointMaterial);

    this.create_ball_body()
    this.create_walls()
    this.create_checkpoints()

    window.addEventListener("deviceorientation", this.setDeviceOrient.bind(this));

    //@ts-ignore
    this.debugger = new CannonDebugger(this.game.scene, this.world, {color: "#FF0000", scale: 1})

  }

  setDeviceOrient(event: DeviceOrientationEvent): void {
    this.x = event.gamma || 0;
    this.z = event.beta || 0;
  }

  create_checkpoints(): void {
    const checkpoints = [
      {position: new CANNON.Vec3(-10, 2, -12.5), size: new CANNON.Vec3(1.3, 1.3, 1.3), collisionFilterGroup: 2},
      {position: new CANNON.Vec3(-7, 2, -22.5), size: new CANNON.Vec3(1.3, 1.3, 1.3), collisionFilterGroup: 3},
      {position: new CANNON.Vec3(-8, 2, 17.5), size: new CANNON.Vec3(1.3, 1.3, 1.3), collisionFilterGroup: 4},
      {position: new CANNON.Vec3(12.5, 2, 22.5), size: new CANNON.Vec3(1.3, 1.3, 1.3), collisionFilterGroup: 5},
      {position: new CANNON.Vec3(7.5, 2, -7.5), size: new CANNON.Vec3(1.3, 1.3, 1.3), collisionFilterGroup: 6},
      {position: new CANNON.Vec3(2.5, 2, -10.5), size: new CANNON.Vec3(1.3, 1.3, 1.3), collisionFilterGroup: 7},
    ]

    checkpoints.forEach(cp => {
      this.createBox(cp.position, cp.size, cp.collisionFilterGroup);
    })
  }

  create_walls(): void {
    const walls = [
      {position: new CANNON.Vec3(30, 2, 0), size: new CANNON.Vec3(.2, 2, 25), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-30, 2, 0), size: new CANNON.Vec3(.2, 2, 25), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(0, 2, 25), size: new CANNON.Vec3(30, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(0, 2, -25), size: new CANNON.Vec3(30, 2, .2), collisionFilterGroup: 1},

      // vertical left
      {position: new CANNON.Vec3(-15, 2, -15), size: new CANNON.Vec3(.2, 2, 5), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-20, 2, -12.5), size: new CANNON.Vec3(.2, 2, 7.5), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-25, 2, -12.5), size: new CANNON.Vec3(.2, 2, 2.5), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-10, 2, -2.5), size: new CANNON.Vec3(.2, 2, 2.5), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-15, 2, 7.5), size: new CANNON.Vec3(.2, 2, 2.5), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-20, 2, 5), size: new CANNON.Vec3(.2, 2, 5), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-25, 2, 5), size: new CANNON.Vec3(.2, 2, 5), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-15, 2, 20), size: new CANNON.Vec3(.2, 2, 5), collisionFilterGroup: 1},
      // vertical right
      {position: new CANNON.Vec3(25, 2, -17.5), size: new CANNON.Vec3(.2, 2, 2.5), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(15, 2, -10), size: new CANNON.Vec3(.2, 2, 5), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(10, 2, -10), size: new CANNON.Vec3(.2, 2, 10), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(5, 2, -10), size: new CANNON.Vec3(.2, 2, 5), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(0, 2, -2.5), size: new CANNON.Vec3(.2, 2, 22.5), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(20, 2, 2.5), size: new CANNON.Vec3(.2, 2, 2.5), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(25, 2, 5), size: new CANNON.Vec3(.2, 2, 5), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(25, 2, 20), size: new CANNON.Vec3(.2, 2, 5), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(15, 2, 12.5), size: new CANNON.Vec3(.2, 2, 7.5), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(10, 2, 15), size: new CANNON.Vec3(.2, 2, 5), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(5, 2, 20), size: new CANNON.Vec3(.2, 2, 5), collisionFilterGroup: 1},

      // horizontal left
      {position: new CANNON.Vec3(-27.5, 2, -20), size: new CANNON.Vec3(2.5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-22.5, 2, -15), size: new CANNON.Vec3(2.5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-27.5, 2, -5), size: new CANNON.Vec3(2.5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-27.5, 2, 10), size: new CANNON.Vec3(2.5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-25, 2, 20), size: new CANNON.Vec3(5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-15, 2, 15), size: new CANNON.Vec3(10, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-5, 2, 20), size: new CANNON.Vec3(5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-7.5, 2, 10), size: new CANNON.Vec3(7.5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-10, 2, 5), size: new CANNON.Vec3(5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-17.5, 2, 0), size: new CANNON.Vec3(7.5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-12.5, 2, -5), size: new CANNON.Vec3(7.5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-7.5, 2, -10), size: new CANNON.Vec3(7.5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-5, 2, -15), size: new CANNON.Vec3(5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-10, 2, -20), size: new CANNON.Vec3(5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(-2.5, 2, 0), size: new CANNON.Vec3(2.5, 2, .2), collisionFilterGroup: 1},

      // horizontal right
      {position: new CANNON.Vec3(2.5, 2, -15), size: new CANNON.Vec3(2.5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(15, 2, -20), size: new CANNON.Vec3(10, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(10, 2, 0), size: new CANNON.Vec3(10, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(20, 2, -5), size: new CANNON.Vec3(5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(20, 2, -15), size: new CANNON.Vec3(5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(25, 2, -10), size: new CANNON.Vec3(5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(27.5, 2, 0), size: new CANNON.Vec3(2.5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(5, 2, 10), size: new CANNON.Vec3(5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(10, 2, 5), size: new CANNON.Vec3(5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(20, 2, 10), size: new CANNON.Vec3(5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(22.5, 2, 15), size: new CANNON.Vec3(2.5, 2, .2), collisionFilterGroup: 1},
      {position: new CANNON.Vec3(17.5, 2, 20), size: new CANNON.Vec3(2.5, 2, .2), collisionFilterGroup: 1},

    ];

    walls.forEach(wall => {
      this.createWall(wall.position, wall.size, wall.collisionFilterGroup);
    });
  }

  createWall(position: CANNON.Vec3, size: CANNON.Vec3, collisionFilterGroup: number) {
    const shape = new CANNON.Box(size);
    const body = new CANNON.Body({
      mass: 0,
      shape: shape,
      type: CANNON.Body.STATIC,
      material: this.wall_material,
    });

    body.position.set(position.x, position.y, position.z);
    body.collisionFilterGroup = collisionFilterGroup;
    this.world.addBody(body);
  }

  createBox(position: CANNON.Vec3, size: CANNON.Vec3, collisionFilterGroup: number) {
    const shape = new CANNON.Box(size);
    const body = new CANNON.Body({
      mass: 1,
      shape: shape,
      material: this.point_material,
      collisionResponse: false
    });

    body.position.set(position.x, position.y, position.z);
    body.collisionFilterGroup = collisionFilterGroup;
    this.world.addBody(body);
  }

  create_ball_body() {
    const shape = new CANNON.Sphere(1);
    this.ball_body = new CANNON.Body({
      mass: 1,
      shape: shape,
      material: this.ball_material,
      position: new CANNON.Vec3(-2.5, 1, -12.5),
      linearDamping: .5, // add some damping to slow down the ball over time
      angularDamping: .5 // add some damping to slow down the ball's rotation over time
    });
    this.world.addBody(this.ball_body);
  }

  update() {
    this.world.step(1 / 60);

    // this.ball_body!.position.y = 0
    this.ball_body!.applyForce(new CANNON.Vec3(this.x, 0, this.z), this.ball_body!.position);
    this.ball_body!.angularVelocity.set(this.x * 0.01, 0, this.z * 0.01);

    this.game.ball.position.copy(this.ball_body?.position as any);
    this.game.ball.quaternion.copy(this.ball_body?.quaternion as any);

    // this.debugger.update();
  }
}
