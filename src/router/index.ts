import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { ElMessageBox } from 'element-plus'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/Index.vue'),
    children: [
      {
        path: '/course',
        name: 'course',
        component: () => import('@/views/course.vue')
      },
      {
        path:'/reportGeneration',
        name:'reportGeneration',
        component:() =>import('@/views/reportGeneration.vue')
      },
      {
        path:'/dashboards',
        name:'dashboards',
        component:() =>import('@/views/dashboards.vue'),
      },{
        path:'/projectDashBoardList',
        name:'projectDashBoardList',
        component:()=>import('@/views/projectDashBoardList.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


function isLoggedIn(): boolean {
  return !!localStorage.getItem('userToken');
}

/* router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !isLoggedIn()) {
    ElMessageBox.alert('请先登录!', '提示', {
      confirmButtonText: '确定',
      type: 'warning'
    }).then(() => {
      next('/login');
    });
  } else {
    next();
  }
});
 */

export default router;
