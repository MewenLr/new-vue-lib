import { ComponentPublicInstance } from 'vue'
/* eslint-disable */
import {
  mount,
  VueWrapper,
  // VueClass,
  shallowMount,
  RouterLinkStub,
  // createLocalVue,
  // ShallowMountOptions,
} from '@vue/test-utils'
// import i18n from '@/config/i18n'
import mockedRouter from '@/router/Router.mock'

// import { createRouter, createWebHistory } from 'vue-router'

// export const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     {
//       name: 'home',
//       path: '/',
//       component: () => import('@/pages/Home/Home.vue'),
//     },
//     {
//       name: 'dummy',
//       path: '/dummy',
//       component: () => import('@/pages/Dummy/Dummy.vue'),
//     },
//   ],
// })

// export const localVue = createLocalVue()

// localVue(i18n)

export const prepareShallow = (
  component: any,
  options?: any, // ShallowMountOptions<Vue>
): VueWrapper<ComponentPublicInstance> => shallowMount(component, {
  // localVue,
  stubs: {
    RouterLink: RouterLinkStub,
  },
  mocks: {
    // 'vue-router': mockedRouter,
    // router: mockedRouter,
    // $router: mockedRouter,
    $t: (key: string) => key,
  },
  // global: {
  //   plugins: [router],
  // },
  // router: routeLocationKey,
  ...options,
})

export const prepare = (
  component: any,
  options?: any,
): VueWrapper<ComponentPublicInstance> => mount(component, {
  // localVue,
  stubs: {
    RouterLink: RouterLinkStub,
  },
  mocks: {
    // router: mockedRouter,
    // $router: mockedRouter,
    $t: (key: string) => key,
  },
  ...options,
})
