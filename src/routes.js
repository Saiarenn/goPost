import {LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE, ADMIN_ROUTE, PROFILE_ROUTE} from "./utils/consts"
import Auth from "./page/Auth"
import Home from "./page/Home";
import PostPage from "./page/PostPage";
import AdminPage from "./page/AdminPage";
import Profile from "./page/Profile";

export const authRoutes = [
    {
        path: HOME_ROUTE,
        component: Home
    },
    {
        path: HOME_ROUTE + '/:id',
        component: PostPage
    },
    {
        path: ADMIN_ROUTE,
        component: AdminPage
    },
    {
        path: PROFILE_ROUTE,
        component: Profile
    },
]

export const publicRoutes = [

    {
        path: LOGIN_ROUTE,
        component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        component: Auth
    },
]