// Composables
import { createRouter, createWebHistory } from 'vue-router'
import BaseNavigation from '@/layouts/base/BaseNavigation.vue';
import Home from '@/views/Home.vue';
import Blogs from '@/views/Blogs.vue';
import PostDetail from '@/views/PostDetail.vue';
import About from '@/views/About.vue';
import NotFound from '@/views/NotFound.vue';
import Tutorials from '@/views/Tutorials.vue'
import store from '@/stores';
import { getMetadata } from '@/api';

const routes = [
  {
    path: '/',
    redirect: { name: 'Home' },
    component: BaseNavigation,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },
      {
        path: '/blogs/:id',
        name: 'PostDetail',
        component: PostDetail,
        props: true,
        beforeEnter: (_to, _from) => {
          store.commit('setRawGithubMarkdown', "# Please wait \n---");
          return true;
        }
      },
      {
        path: '/blogs',
        name: 'Blogs',
        component: Blogs,
      },
      {
        path: '/tutorials',
        name: 'Tutorials',
        component: Tutorials,
      },
      {
        path: '/about-me',
        name: 'About',
        component: About,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
