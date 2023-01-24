<template>
  <div class="guide relative flex-column align-center">
    <div class="header flex align-center justify-center">GOAL!!</div>
    <div class="body">
      <img @click="open()" class="ticket" src="../assets/images/ticket.png" alt="ticket">
      <p>クリア日時</p>
      <h3 class="time flex justify-center">
        {{new Date().toISOString().substring(0, 10).replaceAll("-", "/") }}
        {{time }}
      </h3>
      <p class="summary">こちらの画面をスクリーンショットで保存し <br>ご来場時に定員へお見せしてください。</p>
      <Button @click="open()" style="margin: auto" class="flex justify-center" text="来場予約はこちら"/>
      <p class="summary2">
        《プレゼントについて》<br>
        ＊電話・ネットで事前ご予約の上、はじめてご来場いただき、アンケートにご記入いただいた方に限ります。＊未成年・学生の方ならびにお一人での
        ご来場は対象外とさせていただきます。＊１家族様（１組様）１回限りとさせて頂きます。＊その他プレゼントキャンペーンとの併用はできません。
        数に限りがあります。あらかじめご了承ください。ギフト券には有効期限がございます。詳しくは係員までお問合せください。<br>
        「プレゼント有効期限」2022年12月末日まで
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, PropType, ref} from "vue";
import Button from "./Button.vue";

const props = defineProps({
  time: String as PropType<string>,
})

const open = () => {
  window.open("https://www.wadakohsan.info/suma22/reservation.html")
}
</script>

<style>
.guide {
  position: relative;
  z-index: 1;
  padding: 0 0 0 0;
}

.guide .header {
  background-color: #f1c40f;
  color: darkred;
  width: 100%;
  height: 40px;
}

.guide .body {
  color: darkred;
}

.guide .body img.ticket {
  display: block;
  margin: 20px auto;
  height: 70px;
}

.guide .body p {
  text-align: center;
  color: #1a1a1a;
  font-weight: 500;
}

.guide .body h3.time {
  text-align: center;
  color: #1a1a1a;
  font-size: 1.2rem;
  width: 200px;
  margin: 20px auto;
  position: relative;
}
.guide .body h3.time::after {
  content: "";
  position: absolute;
  background-color: #f1c40f;
  height: 2px;
  width: 100%;
  bottom: -2px;
}

.guide .body p.summary {
  text-align: center;
  color: #1a1a1a;
  margin-bottom: 20px;
  font-size: .8rem;
}

.guide .body p.summary2 {
  margin-top: 30px;
  text-align: left;
  background-color: #f1c40f;
  padding: 15px 10px;
  color: #1a1a1a;
  font-size: .7rem;
}
</style>