<template>
  <div class="container">
    <img class="header" src="./assets/images/header.png" alt="header">
    <div class="wrap relative flex align-center justify-center">
      <div ref="scene" class="scene-wrap">
        <canvas id="canvas"></canvas>
      </div>
    </div>
    <div class="footer"></div>


    <Dialog v-model="dialog" :closable="closable">
      <component v-model="dialog" :is="component"/>
    </Dialog>

  </div>
</template>

<script lang="ts" setup>
import * as THREE from "three";
import {nextTick, onMounted, ref, shallowRef, watch} from "vue";
import GameScene from "./game/GameScene";
import Dialog from "./components/Dialog.vue";

const scene = ref<HTMLDivElement>()
const component = shallowRef()
const dialog = ref<boolean>(false)
const closable = ref<boolean>(false)
const stop = ref<boolean>(false)

onMounted((): void => {

  import("./components/Guide.vue").then((res) => {
    closable.value = false
    component.value = res?.default;
  })

  dialog.value = true

  nextTick(() => {
    setTimeout(() => {
      const game = new GameScene(scene.value?.clientWidth, scene.value?.clientHeight)

      const ground = game.util.GROUND()
      const pointer1 = game.util.PROJECT1()
      const pointer2 = game.util.PROJECT2()
      const pointer3 = game.util.PROJECT3()
      const pointer4 = game.util.PROJECT4()
      const pointer5 = game.util.PROJECT5()
      const goal = game.util.GOAL()

      game.scene.add(ground)
      game.scene.add(pointer1)
      game.scene.add(pointer2)
      game.scene.add(pointer3)
      game.scene.add(pointer4)
      game.scene.add(pointer5)
      game.scene.add(goal)

      game.util.create_walls(game.scene)

      function render(): void {
        if (dialog.value) return;

        pointer1.rotation.z += .005
        pointer1.rotation.y += .003
        pointer1.rotation.x += .002

        pointer2.rotation.z += .005
        pointer2.rotation.y += .003
        pointer2.rotation.x += .002

        pointer3.rotation.z += .005
        pointer3.rotation.y += .003
        pointer3.rotation.x += .002

        pointer4.rotation.z += .005
        pointer4.rotation.y += .003
        pointer4.rotation.x += .002

        pointer5.rotation.z += .005
        pointer5.rotation.y += .003
        pointer5.rotation.x += .002

        if (stop.value) return;

        if (game.physic.point) {
          import(`./components/${game.physic.point}.vue`).then((res) => {
            component.value = res?.default;
            if (game.physic.point1)
              pointer1.removeFromParent()
            if (game.physic.point2)
              pointer2.removeFromParent()
            if (game.physic.point3)
              pointer3.removeFromParent()
            if (game.physic.point4)
              pointer4.removeFromParent()
            if (game.physic.point5)
              pointer5.removeFromParent()

            dialog.value = closable.value = true
          })
        }

        if (stop.value) return;

        game.physic.update()
        // game.orbitControls.update()

        game.camera.position.x = game.ball.position.x;
        game.camera.position.z = game.ball.position.z;
        game.camera.position.y = 30;
        game.camera.lookAt(new THREE.Vector3(game.ball.position.x, 0, game.ball.position.z));
        game.renderer.render(game.scene, game.camera)
      }

      function animate(): void {
        requestAnimationFrame(animate)
        render()
      }

      animate()

    }, 1000)
  })

})

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@100;300;400;500;700&family=Noto+Sans&family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap');

.container {
  height: 100vh;
}

.container canvas {
  width: 300px;
  height: 400px;
}

.container img.header {
  display: block;
  width: 100%;
}

.container .wrap {
  width: calc(100% - 20px);
  height: 400px;
  background-size: cover;
  object-fit: cover;
  background-position: center;
  background-image: url("./assets/images/maze-bg.png");
  padding: 10px;
}

.container .scene-wrap {
  width: 100%;
  height: 100%;
}

</style>
