export default [
    {
        path: '/:id',
        name: 'level',
        component: () => import('./Level')
    },
]