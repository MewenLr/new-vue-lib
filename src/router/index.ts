import {
  Router,
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/pages/Home/Home.vue'),
  },
  {
    name: 'dummy',
    path: '/dummy',
    component: () => import('@/pages/Dummy/Dummy.vue'),
    children: [
      {
        name: 'dummyChild',
        path: 'child',
        component: () => import('@/pages/Dummy/DummyChild.vue'),
      },
    ],
  },
]

export const createRouter = (): Router => {

  return _createRouter({
    /*
      @desc
      use appropriate history implementation for server/client
      import.meta.env.SSR is injected by Vite.
    */
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  })
}
