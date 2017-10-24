import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ChapterDetails from '@/components/ChapterDetails'
import ViewBorda from '@/components/ViewBorda'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/borda/:borda_index',
      name: 'ViewBorda',
      component: ViewBorda
    },
    {
      path: '/borda/:borda_index/chapter/:chapter_index',
      name: 'ChapterDetails',
      component: ChapterDetails
    }
  ]
})
