<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{margin:0;padding:0;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
ul li{list-style: none;}
a{text-decoration: none;}
.swiper-pagination-bullet-active{background:#ffffff!important;}
.swiper-container-horizontal > .swiper-pagination-bullets{bottom:0px!important;}
</style>
