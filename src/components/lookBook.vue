<template>
<div>
    <header-top v-bind:title="titleName"></header-top>
    <div class="wrap">
    <iframe :src="pSrc" width="100%" height="100%"></iframe>
    </div>
</div>
</template>
 
<script>
import headerTop from './header.vue'
 export default {
  name: "pdf",
  data() {
   return {
    pSrc:'',
    titleName:this.$route.params.name,
   };
  },
  methods: {
   loadPDF () {
    this.pSrc=this.$route.params.url;
   },
  },
 
  mounted: function() {
   this.loadPDF();
  },
  components:{ 
    headerTop
  }
 
 };
</script>
 
<style scoped>
.wrap{
 position: fixed;
 top: 7.5vh;
 left: 0;
 width: 100%;
 bottom: 0;
}
</style>