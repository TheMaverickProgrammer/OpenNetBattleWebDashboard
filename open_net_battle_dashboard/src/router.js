import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import FolderItemList from '@/components/FolderItemList'
import FolderEditPage from '@/components/FolderEditPage'
import FolderAddFromLibraryPage from '@/components/FolderAddFromLibraryPage'
import PublicFolderItemList from '@/components/PublicFolderItemList'
import CardLibraryViewPage from '@/components/CardLibraryViewPage'

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
        component: FolderItemList,
        meta: {
            breadcrumb: [
                { name: 'Home', link: '/'},
                { name: 'My Folders'}
            ]
        }
    },
    {
        path: '/folders/:id/edit',
        name: 'FolderEditPage',
        component: FolderEditPage,
        meta: {
            breadcrumb: [
                { name: 'Home', link: '/'},
                { name: 'My Folders', link: '/folders'},
                { name: 'Edit'}
            ]
        }
    },
    {
        path: '/folders/:id/add-cards-from-library',
        name: 'FolderAddFromLibraryPage',
        component: FolderAddFromLibraryPage,
        meta: {
            breadcrumb: [
                { name: 'Home', link: '/'},
                { name: 'My Folders', link: '/folders'},
                { name: 'Edit', /*link: '/folders/' + 123 + '/edit'*/}, // TODO: figure out how
                { name: 'Add Cards From Library' }
            ]
        }
    },
    {
        path: '/cards',
        name: 'GameCardsListPage',
        component: CardLibraryViewPage,
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
        component: PublicFolderItemList,
        meta: {
        breadcrumb: [
            { name: 'Home', link: '/'},
            { name: 'Public Folders' }
            ]
        }
    }
  ]
})