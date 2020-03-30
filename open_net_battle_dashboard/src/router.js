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
      meta: {
          breadcrumb: [
              { name: 'Home'}
          ]
      }
    },
    {
      path: '/folders',
      name: 'FolderListPage',
      component: FolderCardList,
      meta: {
        breadcrumb: [
            { name: 'Home', link: '/'},
            { name: 'My Folders'}
        ]
    }
    },
    {
        path: '/cards',
        name: 'GameCardsListPage',
        component: GameCardTableList,
        meta: {
            breadcrumb: [
                { name: 'Home', link: '/'},
                { name: 'All Cards'}
            ]
        }
    },
    {
      path: '/public-folders',
      name: 'PublicFolderListPage',
      component: PublicFolderCardList,
      meta: {
        breadcrumb: [
            { name: 'Home', link: '/'},
            { name: 'Public Folders' }
        ]
    }
    }
  ]
})