
const Home = () => import('../pages/Home.vue');
const About = () => import('../pages/About.vue');

const PublicRepos = () => import('../pages/PublicRepository.vue')
const Profile = () => import('../pages/Profile.vue')

const routes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },
    {
        path: '/about',
        component: About,
        name: 'about'
    },
    {
        path: '/user/:name/repos',
        component: PublicRepos,
        name: 'pubrepos'
    },
    {
        path: '/user/profile',
        component: Profile,
        name: 'profile'
    },

]

export default routes;