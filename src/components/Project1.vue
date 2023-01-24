<template>
  <div class="project-1 flex justify-center relative">
    <img class="project-1" src="../assets/images/project1.png" alt="project-1">
    <div class="bg-yellow"></div>
  </div>
</template>

<style scoped>
.project-1 img.project-1 {
  margin: auto;
  height: 270px;
  position: relative;
  z-index: 2;
}

.project-1 .bg-yellow {
  position: absolute;
  z-index: 1;
  background-color: #f1c40f;
  height: 150px;
  bottom: 0;
  width: 100%;
}
</style>