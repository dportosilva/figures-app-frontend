import { routes as auth } from '../auth'
import { routes as admin } from '../pages/admin'
import { routes as home } from '../pages/home'
import { routes as level } from '../pages/level'
import { routes as userPage } from '../pages/users'

export default [
    ...auth,
    ...admin,
    ...home,
    ...level,
    ...userPage
]