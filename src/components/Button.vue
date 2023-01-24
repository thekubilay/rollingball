<template>
  <button class="button flex align-center justify-center">
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
import {PropType} from "vue";

const props = defineProps({
  text: {type: String as PropType<string>, default: ""}
})
</script>

<style scoped>
button.button {
  outline: 0;
  margin: auto;
  border: none;
  width: 200px;
  font-size: .8rem;
  padding: 5px 15px;
  background-color: #f1c40f;
  font-weight: 500;
  color: #1a1a1a;
}

</style>