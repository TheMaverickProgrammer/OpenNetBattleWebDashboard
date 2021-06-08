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
import EconomyPage from '@/pages/EconomyPage'
import KeyItemListPage from '@/pages/KeyItemListPage'
import PasswordResetPage from '@/pages/PasswordResetPage'
import Landing from '@/pages/Landing'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/login',
        name: 'Login',
        component: Landing
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true,
            breadcrumb: [
                { name: 'Home'}
            ]
        }
    },
    {
        path: '/reset-pass',
        name: 'Password Reset',
        component: PasswordResetPage,
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
            requiresAuth: true,
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
            requiresAuth: true,
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
            requiresAuth: true,
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
            requiresAuth: true,
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
            requiresAuth: true,
            breadcrumb: [
                { name: 'Home', link: '/'},
                { name: 'My Chip Pool'}
            ]
        }
    },
    {
        path: '/cards/:id/edit/script',
        name: 'CodeEditPage',
        component: CodeEditPage, 
        meta: {
            requiresAuth: true,
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
            requiresAuth: true,
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
            requiresAuth: true,
            breadcrumb: [
                { name: 'Home', link: '/'},
                { name: 'Combos' }
            ]
        }
    },
    {
        path: '/economy',
        name: 'EconomyPage',
        component: EconomyPage,
        meta: {
            requiresAdminAuth: true,
            breadcrumb: [
                { name: 'Home', link: '/'},
                { name: 'Economy' }
            ]
        }
    }
  ]
})