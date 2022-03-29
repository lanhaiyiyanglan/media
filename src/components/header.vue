<template>
<div>
    <div class="header">
       <div class="goBack" @click="goBack">
          <img :src="require('./../assets/img/back.png')" />
       </div>
       {{title}}
       <img @click="toggleShow" :src="require('./../assets/img/dot.png')" />
    </div>
    <transition 
        name="fade"
        enter-class="fade-in-enter"
        enter-active-class="fade-in-active"
        leave-class="fade-out-enter"
        leave-active-class="fade-out-active"
    >
        <div class="bottomLinks" v-show="showLink===true" @click.self="toggleShow">
            <div class="box">
                <p>操作</p>
                <ul>
                    <li>
                        <router-link :to="{path:'/'}"><p><img :src="require('./../assets/img/bt1.png')"></p><span>Home</span></router-link>
                    </li>
                    <li>
                        <router-link :to="{path:'/movie'}"><p><img :src="require('./../assets/img/bt2.png')"></p><span>Movie</span></router-link>
                    </li>
                    <li>
                        <router-link :to="{path:'/music'}"><p><img :src="require('./../assets/img/bt3.png')"></p><span>Music</span></router-link>
                    </li>
                    <li>
                        <router-link :to="{path:'/ebook'}"><p><img :src="require('./../assets/img/bt4.png')"></p><span>E-Books</span></router-link>
                    </li>
                    <li>
                        <router-link :to="{path:'/audio'}"><p><img :src="require('./../assets/img/bt5.png')"></p><span>Audio</span></router-link>
                    </li>
                </ul>
            </div>
            <div class="close" @click="toggleShow">close</div>
        </div>
    </transition>
</div>
</template>
<script>
export default {
    props: ['title'],
    data(){
        return{
           showLink:false
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        toggleShow(){
            this.showLink=!this.showLink;
        }
    }
}
</script>
<style scoped>
.header{font-size:0.36rem;display:flex;height:7.5vh;text-align:center;width:94%;padding:0 3%;background:#9d9d9d;color:#ffffff;position:fixed;top:0;justify-content: space-between;align-items: center;}
.goBack{display:inline-block;position: relative;}
.goBack>img{width:0.456rem;height:0.376rem;position: absolute;top:50%;margin-top:-0.188rem;}
.header>img{    
    display: inline-block;width:0.4rem;height:0.1rem;
}
.bottomLinks{position: fixed;top:0;width:100%;height:100vh;background:rgb(170, 170, 170,0.5);z-index:999999}
.box{position: fixed;bottom:1rem;background:#f6f6f6;min-height:2rem;width:100%;text-align: center;}
.box > p{font-size:0.2rem;color:#000000;padding:0.2rem 0;}
.box ul{width:100%;display: flex;justify-content:space-evenly;align-items: center;font-size:0.2rem;}
.box li{width:15%;padding-bottom:0.3rem;}
.box ul li p{background:#ffffff;border-radius: 0.1rem;width:100%;height:15vw;position:relative;}
.box ul li p img{width:0.546rem;height:0.553rem;position:absolute;top:50%;left:50%;margin-top:-0.273rem;margin-left:-0.2765rem;}
.box ul li span{color:#a6a6a6;display:block;padding-top:0.1rem;}
.close{position: fixed;bottom:0rem;height:1rem;line-height:1rem;width:100%;text-align: center;font-size:0.3rem;background: #ffffff;}
.fade-in-active, .fade-out-active{
    transition: all 0.5s ease 
} 
.fade-in-enter, .fade-out-active{
     opacity: 0 
}
</style>