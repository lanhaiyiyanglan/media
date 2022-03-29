<template>
<div>
    <div class="top" :style="'background-image:url('+require('./../assets/img/header-bg.jpg')+')'">
      <span>浏览本地资源</span>
      <router-link :to="{path:'/'}" class="onLine">我要上网</router-link>
    </div>
    <div class="recommendPage">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item,i) in swiperData" :key="i">
              <img :src="item.pic">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="media1 media">
      <router-link :to="{path:'/movie'}" class="link1 links" :style="'background-image:url('+require('./../assets/img/home-movies.png')+')'">
        <div>
          <img src="./../assets/img/movie.png">
          <p>电影</p>
        </div>
      </router-link>
      <router-link :to="{path:'/music'}" class="link2 links" :style="'background-image:url('+require('./../assets/img/home-music.png')+')'">
        <div>
          <img src="./../assets/img/home-icon-music.png">
          <p>音乐</p>
        </div>
      </router-link>
    </div>
    <div class="media2 media">
      <router-link :to="{path:'/ebook'}" class="link3 links" :style="'background-image:url('+require('./../assets/img/home-e-books.png')+')'">
        <div>
          <img src="./../assets/img/ebook.png">
          <p>电子书</p>
        </div>
      </router-link>
      <router-link :to="{path:'/audio'}" class="link4 links" :style="'background-image:url('+require('./../assets/img/home-about.png')+')'">
        <div>
          <img src="./../assets/img/audio.png">
          <p>有声书</p>
        </div>
      </router-link>
    </div>
    <div class="footer" :style="'background-image:url('+require('./../assets/img/footer-bg.png')+')'">
       <p>车载娱乐信息</p>
       <p>copyright@2016-2020</p>
    </div>
</div>
</template>

<script>
// 引入插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: 'index',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      //swiper配置参数
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true //允许分页点击跳转
        }
      },
      //swiper数据显示
      swiperData:[]
    };
  },
  created () {
    this.getSwiper();
  },
  methods:{
    getSwiper(){
      this.$http.get("https://www.xzw999.com/music/banner?type=1").then(res=>{
        this.swiperData=res.data.banners;
      })
    }
  }
}
</script>
<style scoped>
.top{
  height:7.5vh;
  font-size:0.15rem;
  background-size:100% 7.5vh;
  display:flex;
  justify-content: center;
  align-items: center;
  color:#f7de66;
}
.onLine{right:0.2rem;color:#ffffff;text-decoration: none;position:absolute;}
.recommendPage .swiper-container{
  position: relative;
  width: 100%;
  height:35vh;
}
.recommendPage .swiper-container .swiper-slide{
  width: 100%;
  height:100%;
}
.recommendPage .swiper-container .swiper-slide img{ 
  width: 100%;
  height: 100%;
  /* object-fit:cover; */
}
.media{
  width:100%;
  display:flex;
  justify-content: space-between;
}
.media1{
  height:30vh;
}
.media2{
  height:20vh;
}
.media .links{background-position: center;border:0.05rem solid #ffffff;box-sizing: border-box;position: relative;}
.media .link1{width:55%;background-size:100% 30vh;}
.media .link2{flex:1;background-size:100% 30vh;border-left:none;}
.media .link3{width:36%;background-size:100% 20vh;border-top:none;}
.media .link4{flex:1;background-size:100% 20vh;border-left:none;border-top:none;}
.media .links>div{position: absolute;bottom:5%;left:5%;text-align:center;}
.media .links>div img{width:0.6rem;height:0.6rem;display:block;}
.media .links>div p{font-size:0.16rem;color:#ffffff;font-weight: bold;}
.footer{height:7.5vh;color:#ffffff;width:100%;text-align:center;background-size:100% 7.5vh;font-size:0.14rem;}
.footer p:first-child{padding-top:1.5vh;}
.footer p{line-height:3vh;}
</style>
