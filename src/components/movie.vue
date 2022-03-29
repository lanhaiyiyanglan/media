<template>
<div>
  <header-top v-bind:title="titleName"></header-top>
  <slide-load :page="page" :totalpage="totalPage" @update="updeList">
  　　<ul class="item">
              <li v-for="(item,index) in list" :key="index" @click="playMovie(item)">
                  <img :src="item.img">
                  <div>{{item.info}}--{{index}}</div>
                  <p>{{item.time}}</p>
              </li>
      </ul>
  </slide-load>
</div>
</template>
<script>
import headerTop from './header.vue'
import slideLoad from './sliderLoad.vue'
export default {
    data(){
        return{
            titleName:'电影',
            list: [],
            page:1,
            totalPage:3
        }
    },
    components:{
      slideLoad,headerTop
    },
    mounted() {
      this.getData();
    },
    methods: {
      //获取数据
      getData() {
          let data=[
              {
                img:'https://image14.m1905.cn/uploadfile/2021/ss/0607/thumb_1_320_174_20210607021501740376.png',
                info:'dds.mp4',
                time:'1:30:29',
                url:'http://vjs.zencdn.net/v/oceans.mp4'
              },
              {
                img:'https://image11.m1905.cn/uploadfile/2021/ss/0607/thumb_1_320_174_20210607020003364725.png',
                info:'aab.mp4',
                time:'1:30:29',
                url:'http://vjs.zencdn.net/v/oceans.mp4'
              },
              {
                img:'https://image11.m1905.cn/uploadfile/2021/ss/0607/thumb_1_320_174_20210607124502159310.jpeg',
                info:'dds.mp4',
                time:'1:30:29',
                url:'http://vjs.zencdn.net/v/oceans.mp4'
              },
              {
                  img:'https://image14.m1905.cn/uploadfile/2021/ss/0607/thumb_1_320_174_20210607123001578890.png',
                  info:'aab.mp4',
                  time:'1:30:29',
                  url:'http://vjs.zencdn.net/v/oceans.mp4'
              },
              {
                  img:'https://image14.m1905.cn/uploadfile/2021/ss/0607/thumb_1_320_174_20210607123001578890.png',
                  info:'aab.mp4',
                  time:'1:30:29',
                  url:'http://vjs.zencdn.net/v/oceans.mp4'
              },
              {
                  img:'https://image14.m1905.cn/uploadfile/2021/ss/0607/thumb_1_320_174_20210607123001578890.png',
                  info:'aab.mp4',
                  time:'1:30:29',
                  url:'http://vjs.zencdn.net/v/oceans.mp4'
              },
              {
                  img:'https://image14.m1905.cn/uploadfile/2021/ss/0607/thumb_1_320_174_20210607123001578890.png',
                  info:'aab.mp4',
                  time:'1:30:29',
                  url:'http://vjs.zencdn.net/v/oceans.mp4'
              }
          ]
          this.page+=1;
          this.list = this.list.concat(data);
      },
      updeList() { // 上拉执行
        this.getData();
　　  },
      playMovie(item){
        this.$router.push({name:'playMovie',params:{url:item.url,img:item.img}});
      }
    }
  }

</script>
<style  scoped>
.item{display:flex;justify-content: space-between;flex-wrap: wrap;width:96%;padding:2% 2%;}
.item li{width:49%;margin-bottom:0.2rem;padding-bottom: 0.1rem;background: #ffffff;text-indent: 0.1rem;}
.item li img{display:block;width:100%;height:25vh;border-top-right-radius: 0.1rem;border-top-left-radius: 0.1rem;}
.item li div{font-size:0.2rem;color:#2B191d;padding: 0.1rem 0 0.05rem 0;}
.item li p{font-size:0.14rem;color:#dddddd;}
</style>