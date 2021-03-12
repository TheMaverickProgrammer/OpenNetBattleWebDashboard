import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import FolderListPage from '@/pages/FolderListPage'
import FolderEditPage from '@/pages/FolderEditPage'
import FolderAddFromLibraryPage from '@/pages/FolderAddFromLibraryPage'
import PublicFolderListPage from '@/pages/PublicFolderListPage'
import ComboListPage from '@/pages/ComboListPage'
import CardLibraryViewPage from '@/pages/CardLibraryViewPage'
import CodeEditPage from '@/pages/CodeEditPage'
import ProductEditPage from '@/pages/ProductEditPage'
import KeyItemListPage from '@/pages/KeyItemListPage'

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
        component: FolderListPage,
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
        path: '/keyitems',
        name: 'KeyItemsListPage',
        component: KeyItemListPage,
        meta: {
            breadcrumb: [
                { name: 'Home', link: '/'},
                { name: 'My KeyItems'}
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
        path: '/cards/:id/edit/script',
        name: 'CodeEditPage',
        component: CodeEditPage, 
        meta: {
            breadcrumb: [
                { name: 'Home', link: '/'},
                { name: 'Edit Card'},
                { name: 'Scripting'}
            ]
        }
    },
    {
        path: '/public-folders',
        name: 'PublicFolderListPage',
        component: PublicFolderListPage,
        meta: {
        breadcrumb: [
            { name: 'Home', link: '/'},
            { name: 'Public Folders' }
            ]
        }
    },
    {
        path: '/combos',
        name: 'ComboListPage',
        component: ComboListPage,
        meta: {
        breadcrumb: [
            { name: 'Home', link: '/'},
            { name: 'Combos' }
            ]
        }
    },
    {
        path: '/economy',
        name: 'ProductEditPage',
        component: ProductEditPage,
        meta: {
        breadcrumb: [
            { name: 'Home', link: '/'},
            { name: 'Economy' }
            ]
        }
    }
  ]
})