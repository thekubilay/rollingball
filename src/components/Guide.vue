<template>
  <div class="guide relative">
    <h3>ゲームの遊び方</h3>

    <div v-if="slideType===1" class="slide flex">
      <div class="center">
        <p class="flex-column justify-center">
          <span class="flex justify-center">迷路の中の <span class="ball"></span><span>チェックポイントを</span></span>
          <span>全て通過しよう</span>
          <span class="flex justify-center"><span class="selected">５箇所のチェックポイント</span> <span>を</span></span>
          <span>全て通過できた方には</span>
          <span>プレゼントをご用意！</span>
        </p>
        <Button @click="slideType=2" text="次へ"/>
      </div>
    </div>

    <div v-if="slideType===2" class="slide flex">
      <div class="center">
        <p class="flex-column justify-center">
          <span>ゴール後に日時表示されます</span>
          <span>スクリーンショットで保存して</span>
          <span>ご来場時に定員にお店ください。</span>
        </p>

        <div class="card">
          <div class="header flex align-center justify-center">GOAL!!</div>
          <div class="body">
            <img class="ticket" src="../assets/images/ticket.png" alt="ticket">
            <p>クリア日時</p>
            <h3>2022/00/00 00:00:00</h3>
            <p class="summary">こちらの画面をスクリーンショットで保存し <br>ご来場時に定員へお見せしてください。</p>
            <Button text="来場予約はこちら"/>
          </div>
        </div>

        <Button text="ゲームスタート" @click="setMotionDetection()"/>
        <Button class="return" text="戻る" @click="slideType=1"/>

      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {PropType, ref} from "vue";
import Button from "./Button.vue";

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'update:modelValue', modelValue: boolean): void
}>()

const props = defineProps({
  modelValue: Boolean as PropType<boolean>,
})

const slideType = ref(1)

const setMotionDetection = (): void => {
  (DeviceMotionEvent as any).requestPermission().then((response: NotificationPermission) => {
    if (response == "granted") {
      emits("update:modelValue", false)
    } else {
      window.location.reload();
    }
  });

};

</script>

<style>
.guide {
  position: relative;
  z-index: 1;
  padding: 20px 0 40px 0;
}

.guide h3 {
  margin-top: 10px;
  text-align: center;
  margin-bottom: 20px;
}

.guide .slide {

}

.guide .slide .center {
  text-align: center;
  width: 100%;
}

.guide .slide .center p {
  line-height: 1.7;
}

.guide .slide .center p span.ball {
  display: block;
  min-width: 25px;
  height: 25px;
  background-color: #f1c40f;
  border-radius: 50%;
}

.guide .slide .center p span.selected {
  background-color: #f1c40f;
}

.guide .slide .center button.button {
  font-weight: 600;
  padding: 7px 30px;
  margin-top: 20px;
  font-size: 1rem;
}


.guide .slide .center .card {
  width: 90%;
  margin: 20px auto -150px auto;
  height: 400px;
  border: 2px solid gray;
  transform: scale(.6);
  transform-origin: center top;
}

.guide .slide .center .card .header {
  background-color: #f1c40f;
  color: darkred;
  height: 40px;
}

.guide .slide .center .card .body {
  color: darkred;
}

.guide .slide .center .card .body img.ticket {
  display: block;
  margin: 20px auto;
  height: 50px;
}

.guide .slide .center .card .body p {
  color: #1a1a1a;
  font-weight: 500;
}

.guide .slide .center .card .body h3 {
  color: #1a1a1a;
  font-size: 1.2rem;
  display: inline-block;
  border-bottom: 2px solid #f1c40f;
}

.guide .slide .center .card .body p.summary {
  color: #1a1a1a;
  font-size: .8rem;
}

.guide .slide button.return {
  background-color: grey;
}
</style>