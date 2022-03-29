<template>
<div class="container">
    <slot></slot>
    <div class="tips">
        <template v-if="page > totalpage">— 已经到底了 —</template>
        <template v-else><img :src="require('./../assets/img/Load.gif')"/></template>
    </div>
</div>
</template>
<script>
　　export default {
　　　　props: {　　
            page:{ // 传值 ，当前页面，总页数，上拉调用的方法
                type: Number,
                default: 1
            }, //页面
            totalpage: {
                type: Number,
                default:1
            }, //总页数
            update:null, //上拉要调用的函数
　　　　},
        created(){
            window.addEventListener('scroll', this.disposeScroll); //监听滚动条
        },
        beforeDestroy(){ //离开
            window.removeEventListener('scroll', this.disposeScroll); // 离开是后清除监听
        },
        methods: {
            disposeScroll(){ 
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var windowHeitht = document.documentElement.clientHeight || document.body.clientHeight;
                var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                if(scrollTop + windowHeitht == scrollHeight){ //如果滚动条的位置加上窗口的高度大于可见的窗口可见的高度，那么也就是滚动条到低了
                   if(this.page <= this.totalpage){
                     this.$emit('update') // 执行update方法
                   }else{
                      return; // 如果当前大于总页数，也就是最后一页，那么就不不触发了
                   }
                }
            }
        }
　　}
</script>
<style scoped>
.container{padding-top:7.5vh;width:100%;background:#fafafa;}
.tips{font-size:0.2rem;text-align:center;padding-bottom:0.5rem;color:#bbbbbb;}
.tips img{width:1.5rem;height:1.08rem;}
</style>