import './app.css'
import Vue from 'vue'
import App from './App.vue'
import { Router } from 'vue-router'
import { createSSRApp } from 'vue'
import { createRouter } from './router'
import injections from './services/injections'

export function createApp(): { app: Vue.App, router: Router} {

  const app = createSSRApp(App)
  const router = createRouter()

  app.use(router)

  Object.getOwnPropertySymbols(injections)
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    .forEach((s: symbol) => app.provide(s, (injections as any)[s]))

  return { app, router }
}
