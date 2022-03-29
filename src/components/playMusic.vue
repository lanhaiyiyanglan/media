<template>
<div>
  <header-top v-bind:title="titleName"></header-top>
  <div class="play-container">
    <div class="musicInfo">{{songName}}</div>
    <div class="cd"  ref="cd">
      <img :src="require('./../assets/img/record.png')" width="60%">
    </div>
    <!-- 下方控件 -->
    <div class="bottom-progress">
        <div class="curTime">{{curTime}}</div>
        <div class="progress" @click="clickProgress($event)" ref="progress">
          <div class="line" :style="{width: `${precent}`}"></div>
          <div class="dot" :style="{left: `${precent}`}" @touchstart='dotStart' @touchmove='dotMove' @touchend='dotEnd'></div>
        </div>
        <div class="allTime">{{allTime}}</div>
      </div>
      <div class="bottom-controls">
        <div class="prev" @click="prevSong"><img :src="require('./../assets/img/music_icon_syq.png')"></div>
        <div class="pause" v-show="isPlaying" @click="pauseSong"><img :src="require('./../assets/img/music_icon_bf.png')"></div>
        <div class="play" ref="play" v-show="!isPlaying" @click="playSong"><img :src="require('./../assets/img/music_icon_zt.png')"></div>
        <div class="next"  @click="nextSong"><img :src="require('./../assets/img/music_icon_xyq.png')"></div>
      </div>
    <!-- autio标签 -->
    <audio @timeupdate="updateTime" @canplay="getDuration" @ended="ended" id="audio" ref="audio" autoplay="autoplay">
      <source :src="musicUrl" />
    </audio>
  </div>
</div>
</template>
<script>
import headerTop from './header.vue'
export default {
  data () {
    return {
      titleName:'音乐',
      songName:'',
      flag:'',
      playingSong: {}, // 正在播放的歌曲信息
      isPlaying: false, // 播放和暂停状态
      musicUrl: '', // 音乐地址
      curTime: '00:00', // 当前播放时间，格式化之后的
      allTime: '00:00', // 当前音频总时长，格式化之后的
      duration: 0, // 音频总时长，单位秒
      currentTime: 0, // 音频当前播放时间， 单位秒
      precent: '0%', // 当前播放进度百分比
      touchInfo: {}, // 原点滑动时的位置信息
      curMsTime: '', // 当前音频播放的时分毫秒,
    }
  },
  created () {
    let songList=JSON.parse(this.$store.state.songPlayList);
    this.playingSong =songList[sessionStorage.curSongPlayIndex]
    this.loadMusic();
    
  },
  mounted () {
    if(this.flag==1){
      this.autoPlaySong();
    }else{
      this.pauseSong();
    }
  },
  methods: {
    getMusicUrl () { // 获取音乐url
      let that=this;
      this.$http.get(`https://www.xzw999.com/music/song/url?id=${this.playingSong.id}`).then(res => {
        if (res.data.code === 200) {
          if (res.data.data[0].url === null) {
            console.log('没有当前歌曲资源，3s后将自动播放下一首歌曲')
            setTimeout(() => {
              that.nextSong()
            }, 3000)
            return
          }
          if(that.playingSong.id==1841002409){
            that.musicUrl = "https://osvaldas.info/examples/audio-player-responsive-and-touch-friendly/audio.wav"
          }else{
            that.musicUrl = res.data.data[0].url;
          }
          that.songName=that.playingSong.name;
          that.$refs.audio.load();
        }
      })
    },  
    loadMusic () {
      this.getMusicUrl();
    },
    playSong () { // 手动点击播放歌曲
      this.$refs.audio.load();
      this.isPlaying = !this.isPlaying
      this.$refs.audio.play();
      this.$refs.cd.classList.add('rotate')
      if (this.$refs.cd.classList.contains('rotatePause')) this.$refs.cd.classList.remove('rotatePause')
    },
    autoPlaySong () { // 自动播放歌曲 
      let that=this;
      that.$refs.audio.autoplay = true;
      that.isPlaying = true;
      that.$refs.cd.classList.add('rotate')
      if (that.$refs.cd.classList.contains('rotatePause')) that.$refs.cd.classList.remove('rotatePause')
    },
    nextSong () { // 播放下一首歌曲
      sessionStorage.curSongPlayIndex++
      if (sessionStorage.curSongPlayIndex > this.$store.state.songPlayList.length) sessionStorage.curSongPlayIndex = 0
      this.playingSong = JSON.parse(this.$store.state.songPlayList)[sessionStorage.curSongPlayIndex]
      this.loadMusic()
      this.autoPlaySong()
    },
    prevSong () { // 播放上一首歌曲
      sessionStorage.curSongPlayIndex--
      if (sessionStorage.curSongPlayIndex < 0) sessionStorage.curSongPlayIndex = this.$store.state.songPlayList.length - 1
      this.playingSong =JSON.parse(this.$store.state.songPlayList)[sessionStorage.curSongPlayIndex]
      this.loadMusic()
      this.autoPlaySong()
    },
    pauseSong () { // 暂停歌曲
      this.isPlaying =false
      this.$refs.audio.pause()
      this.$refs.cd.classList.add('rotatePause')
    },
    getDuration () { // canplay时获取音频总时长
      this.duration = this.$refs.audio.duration
      this.allTime = this.formatTime(this.$refs.audio.duration)
    },
    updateTime (e) { // timeupdate时获取当前播放时间
      const { currentTime } = e.target
      this.currentTime = currentTime
      this.curTime = this.formatTime(currentTime) === 'undefined' ? '00:00' : this.formatTime(currentTime)
      this.updateProgress(currentTime, this.duration)
    },
    formatTime (time) {
      if (time === 0) {
        this.curTime = '00:00'
        return
      }
      const mins = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60)
      const sec = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60)
      return `${mins}:${sec}`
    },
    ended () {
      this.$refs.cd.classList.remove('rotate')
      this.$refs.audio.currentTime = 0
      this.isPlaying = false
      if ((JSON.parse(sessionStorage.curSongPlayIndex) >= this.$store.state.songPlayList.length - 1)) {
        return
      }
      this.nextSong()
      console.log('播放完毕')
    },
    updateProgress (currentTime, duration) { // 更新进度条
      const precent = `${((currentTime / duration) * 100).toFixed(5)}%`
      this.precent = precent
    },
    clickProgress (event) { // 点击进度条时 更新音频时间和进度条
      const e = event || window.event
      const position = e.clientX - e.currentTarget.offsetLeft // 当前点击的位置
      const progressWidth = this.$refs.progress.offsetWidth // 进度条总宽度
      this.$refs.audio.currentTime = ((position / progressWidth) * this.duration)
      this.updateProgress(((position / progressWidth) * this.duration), this.duration)
    },
    dotStart (e) {
      // 点击的初始位置
      this.touchInfo.startX = e.touches[0].pageX - 83
    },
    dotMove (e) {
      // 移动的距离
      let moveX = e.touches[0].pageX - 83
      // 进度条的宽度
      const progressWidth = this.$refs.progress.offsetWidth
      if (moveX >= progressWidth) moveX = progressWidth
      this.$refs.audio.currentTime = ((moveX / progressWidth) * this.duration)
      this.updateProgress(((moveX / progressWidth) * this.duration), this.duration)
    },
    dotEnd (e) {
      this.playSong()
      this.isPlaying = true
    },
  },
  beforeRouteEnter (to, from, next) {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    if(from.name!="music"){
      next(vm=>{
        vm.flag=0;
      })
    }else{
      next(vm=>{
        vm.flag=1;
      })
    }
    next();
  },
  beforeRouteLeave (to, from, next) {
    if (this.isPlaying) { // 播放状态 false为暂停 true为播放
      this.pauseSong()
      setTimeout(() => {
        next()
      }, 20)
    } else {
      next()
    }
  },
  components:{ 
    headerTop
  },
}
</script>
<style scoped>
.play-container{height:92.5vh;width:100%;position: fixed;top: 7.5vh;}
.musicInfo{text-align:center;font-size:0.4rem;font-weight: 600;padding-top:3vh;}
.cd{padding:10vh 0;}
.cd img{
  width:4.5rem;height:4.5rem;border-radius: 50%;display: block;margin:0 auto;
}
.cd.rotate img{
  animation: rotateIMG 15s linear infinite;
}
.cd.rotatePause img{
 animation-play-state:paused;
  -webkit-animation-play-state:paused; /* Safari 和 Chrome */
}
@keyframes rotateIMG{
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.bottom-progress{
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:80%;margin:0 auto;
}
.progress{
position: relative;height: 20px;width:100%;background-color: rgb(229, 229, 229);height: 4px;
}
.line{
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 4px;
    height: 4px;background:rgb(255, 179, 167);
}
.allTime,.curTime{
    width:35px;font-size:0.2rem;
}
.curTime{padding-right: 5px;}
.allTime{padding-left:5px;}
.dot{
    position: absolute;
    left: -2px;
    top: -2px;
    border-radius: 50%;
    background:rgb(255, 179, 167);
    width:8px;height:8px;
}
.bottom-controls{display:flex;justify-content: space-between;width:70%;left:15%;align-items: center;height:1.2rem;position: absolute;bottom:8vh;}
.prev img,.next img{width:0.8rem;height:0.8rem;}
.pause img,.play img{width:1.2rem;height:1.2rem;}
</style>