<template>
    <div class="wapper">
         <header-top v-bind:title="titleName"></header-top>
         <slide-load :page="page" :totalpage="totalPage" @update="updeList">
           <div class="books">
          　　<ul>
                      <li v-for="(item,index) in list" :key="index" @click="lookBook(item,index)">
                          <img :src="item.pic">
                          <p>{{item.typeTitle}}</p>
                      </li>
              </ul>
           </div>
        </slide-load>
    </div>
</template>
<script>
import headerTop from './header.vue'
import slideLoad from './sliderLoad.vue'
export default {
    data() {
        return{
            titleName:'有声书',
            list: [],
            page:1,
            totalPage:3
        }
    },  
    components:{ //注册组件
      slideLoad,headerTop
    },    
    mounted() {
      this.getData();
    },
    methods: {
      //获取数据
      getData() {
          this.$http.get("https://www.xzw999.com/music/banner?type=1").then(res=>{
            this.list=res.data.banners;
          })
          // this.page+=1;
          // this.list = this.list.concat(data);
      },
      updeList() { // 上拉执行
        this.getData();
　　  },
      lookBook(item,index){
        // let url="http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf";
        // this.$router.push({name:'lookBook',params:{url:url,name:item.typeTitle}});
        this.$http.get('http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf', {           
            responseType: 'blob', //重要
        }).then(response => {           
            const url = window.URL.createObjectURL(new Blob([response.data]));           
            const link = document.createElement('a');           
            let fname = '系统操作手册.pdf';           
            link.href = url;           
            link.setAttribute('download', fname);           
            document.body.appendChild(link);           
            link.click();         
        });   
      }
    }
  }
</script>
<style scoped>
.books{width:98%;padding:3% 1%;}
.books ul{width:100%;margin-left:-1%;}
.books ul li{width: 30%;text-align: center;margin-left: 3%;margin-bottom: 0.1rem;display: inline-block;}
.books ul li img{width:100%;height:3rem;display: block;margin-bottom:0.1rem;}
.books li p{font-size:0.2rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;word-break: break-all;}
</style>