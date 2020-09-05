<template>
  <div class="container_loader">
    <div class="lds-dual-ring"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("object");
  },
};
</script>

<style lang="scss">
.container_loader {
  width: 100%;
  text-align: center;
  margin-top: 2rem;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid red;
  border-color: #463535 transparent #ff1f1f;
  animation: lds-dual-ring .5s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>