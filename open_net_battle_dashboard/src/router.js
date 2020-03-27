import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import FolderCardList from '@/components/FolderCardList'
import PublicFolderCardList from '@/components/PublicFolderCardList'
import GameCardTableList from '@/components/GameCardTableList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: {isAdmin:true}
    },
    {
      path: '/folders',
      name: 'FolderListPage',
      component: FolderCardList
    },
    {
        path: '/cards',
        name: 'GameCardsListPage',
        component: GameCardTableList,
    },
    {
      path: '/public-folders',
      name: 'PublicFolderListPage',
      component: PublicFolderCardList
    }
  ]
})