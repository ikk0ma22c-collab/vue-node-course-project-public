import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      redirect: '/home/dashboard',
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'course',
          name: 'course',
          component: () => import('@/components/topMain.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'course/video_manage/:courseId',
          name: 'courseVideoManage',
          component: () => import('@/components/CourseVideoManage.vue'),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/home/dashboard',
    },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  if (to.matched.some((item) => item.meta.requiresAuth) && !token) {
    ElMessage.error('请先登录')
    return '/login'
  }

  if ((to.path === '/login' || to.path === '/register') && token) {
    return '/home/dashboard'
  }

  return true
})

export default router
