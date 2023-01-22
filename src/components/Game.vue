<template>
  <div class="container">
    <div ref="scene" class="scene">
      <canvas id="canvas"></canvas>
    </div>
    <button @click="setMotionDetection()">click</button>
  </div>
</template>

<script lang="ts" setup>

import {nextTick, onMounted, ref} from "vue";
import GameScene from "./GameScene";

const scene = ref<HTMLDivElement>()
const setMotionDetection = (): Promise<null> => {
  return new Promise(resolve => {
    (DeviceMotionEvent as any).requestPermission().then((response: NotificationPermission) => {
      if (response == "granted") {
        resolve(null)
      } else {
        window.location.reload();
      }
    });
  })
}

onMounted((): void => {
  nextTick(() => {
    const game = new GameScene(scene.value?.clientWidth, scene.value?.clientHeight)
    game.animate()
  })
})

</script>
<style>
* {
  margin: 0;
}

.container {
  height: 100%;
}

.container .scene {
  width: 100%;
  height: 400px;
}

</style>
