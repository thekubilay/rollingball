<template>
  <div v-if="modelValue" class="dialog flex align-center justify-center">
    <div ref="target" class="window relative">
      <button v-if="closable" @click="close()" class="close">
        <i class="fa-sharp fa-solid fa-xmark"></i>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {PropType, ref} from "vue";

interface Emit {
  (e: "update:modelValue", modelValue: boolean): void
}

const emits = defineEmits<Emit>()

const props = defineProps({
  modelValue: Boolean as PropType<boolean>,
  closable: Boolean as PropType<boolean>,
})

const target = ref<HTMLDivElement>()
const close = () => {
  emits("update:modelValue", false)
}


</script>

<style scoped>
.dialog {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99;
  top: 0;
  left: 0;
}

.dialog .window {
  border: 2px solid #1a1a1a;
  max-width: 90%;
  width: 100%;
  background-color: #ffffff;
  position: relative;
}

.dialog .window button.close {
  position: absolute;
  z-index: 9999;
  width: 40px;
  height: 40px;
  right: 0;
  top: 0;
  font-size: 1.4rem;
}
</style>