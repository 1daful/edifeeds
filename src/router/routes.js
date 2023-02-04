import { authGuard } from '../api/auth/authGuard';
import SignIn from "../pages/SignIn.vue";
const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/IndexPage.vue') },
            {
                path: '/about',
                name: 'About',
                component: () => import('../pages/About.vue'),
                meta: {
                    navigational: true
                },
                props: true
            },
            {
                path: '/media/:id',
                name: 'SingleMedia',
                component: () => import('../pages/SingleMediaPage.vue'),
                props: (route) => ({ mediaType: route.query.mediaType }),
            },
            {
                path: '/profile',
                name: 'Profile',
                component: () => import('../pages/Profile.vue'),
                props: true,
                beforeEnter: authGuard,
                children: [
                    {
                        path: 'collection',
                        name: 'Collection',
                        component: () => import('../pages/Collection.vue'),
                        props: true,
                        meta: {
                            navigational: true
                        },
                        children: [
                            {
                                path: 'media/:type',
                                name: 'Media',
                                component: () => import('../pages/Media.vue')
                            }
                        ]
                    },
                    {
                        path: 'details',
                        name: 'Details',
                        component: () => import('../pages/UserDetails.vue'),
                        props: true
                    }
                ]
            },
            {
                path: '/upload',
                name: 'Upload',
                component: () => import('../pages/UploadFile.vue'),
                props: true
            },
            {
                path: '/auth*',
                component: () => import('../pages/Authview.vue'),
            },
            {
                path: '/access_token=:url',
                component: () => import('../pages/Verification.vue'),
            },
            {
                props: (route) => ({ myUrl: route.params.myUrl }),
                path: '/error=:myUrl',
                component: () => import('../pages/Error.vue'),
            },
            {
                path: '/:catchAll(.*)*',
                component: () => import('pages/ErrorNotFound.vue'),
            }
        ]
    },
    {
        path: '/verification',
        name: 'Verification',
        component: () => import('../pages/Verification.vue'),
        props: true
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../pages/SERP.vue'),
        children: [
            {
                path: '/:type',
                name: 'SERPView',
                component: () => import('../pages/SERPView.vue'),
                props: true
            },
        ],
    },
    {
        path: '/reset/:param',
        name: 'Reset',
        component: () => import('../pages/Reset.vue'),
        props: true
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn,
        props: (route) => ({ myUrl: route.query.myUrl }),
        meta: {
            noHeader: true
        }
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: () => import('../pages/SignUp.vue'),
        props: (route) => ({ myUrl: route.query.myUrl }),
        meta: {
            noHeader: true
        }
    }
];
export default routes;
//# sourceMappingURL=routes.js.map