export default [
    {
        path: '/users/:email',
        name: 'userPage',
        component: () => import('./UserPage')
    },
]