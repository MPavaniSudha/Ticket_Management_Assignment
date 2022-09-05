import {createRouter,createWebHistory} from 'vue-router';
import CreateTicket from '../components/CreateTicket.vue';
import EditTicket from '../components/EditTicket.vue';
import HomePage from '../components/HomePage.vue';

const routes =[
    {
        name:'Home',
        component:HomePage,
        path:'/'
    },
    {
        name:'Create',
        component:CreateTicket,
        path:'/CreateTicket'
    },
    {
        name:'Edit',
        component:EditTicket,
        path:'/EditTicket/:id'
    },
];

const router=createRouter({
    history:createWebHistory(),
    routes,
});

export default router;