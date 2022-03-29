<template>
    <div class="wapper">
         <header-top v-bind:title="titleName"></header-top>
         <slide-load :page="page" :totalpage="totalPage" @update="updeList">
        　　<ul class="music">
                    <li v-for="(item,index) in list" :key="index" @click="playMusic(item,index)">
                        <div><img :src="item.al.picUrl"><span>{{item.al.name}}</span></div>
                        <p>{{index}}</p>
                    </li>
            </ul>
        </slide-load>
    </div>
</template>
<script>
import headerTop from './header.vue'
import slideLoad from './sliderLoad.vue'
export default {
    data() {
        return{
            titleName:'音乐',
            list: [],
            page:1,
            totalPage:3
        }
    },
    components:{ //注册组件
      slideLoad,headerTop
    },    
    created() {
      this.getData();
    },
    methods: {
      //获取数据
      getData() {
          this.$http.get("https://www.xzw999.com/music/playlist/detail?id=19723756").then(res=>{
             this.list=res.data.playlist.tracks;
            // https://osvaldas.info/examples/audio-player-responsive-and-touch-friendly/audio.wav
             this.$store.commit('songList',this.list)
             
          })
          // this.page+=1;
          // this.list = this.list.concat(data);
      },
      updeList() { // 上拉执行
        this.getData();
　　  },
      playMusic(item,index){
        this.$router.push({path: '/playMusic'});
        sessionStorage.setItem("curSongPlayIndex",index);
      }
    }
  }
</script>
<style scoped>
.music li{
  padding:0.2rem 0.3rem;background:#ffffff;margin-bottom:0.05rem;display:flex;justify-content: space-between;
  align-items: center;width:100%;box-sizing: border-box;
}
.music li>div{width:80%;height:0.8rem;line-height: 0.8rem;display:flex;justify-content: start;}
.music li>div img{width:0.8rem;height:0.8rem;display:inline-block;margin-right:0.2rem;border-radius: 0.05rem;}
.music li>div span{flex:1;font-size:0.2rem;font-weight: 600;color:#000000;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;word-break: break-all;vertical-align: top;}
.music li p{width:20%;font-size:0.14rem;color: #b1b1b1;text-align: right;}
</style>