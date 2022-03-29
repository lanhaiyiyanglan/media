import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:()=>import('@/components/index')
    },
    {
      path:'/movie',
      name:'movie',
      component:()=>import('@/components/movie')
    },
    {
      path:'/music',
      name:'music',
      component:()=>import('@/components/music')
    },
    {
      path:'/ebook',
      name:'ebook',
      component:()=>import('@/components/ebook')
    },
    {
      path:'/playMovie',
      name:'playMovie',
      component:()=>import('@/components/playMovie')
    },
    {
      path:'/playMusic',
      name:'playMusic',
      component:()=>import('@/components/playMusic')
    },
    {
      path:'/lookBook',
      name:'lookBook',
      component:()=>import('@/components/lookBook')
    },
    {
      path:'/audio',
      name:'audio',
      component:()=>import('@/components/audio')
    }
  ]
})

// 解决报错
const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
// push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
Router.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}