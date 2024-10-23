import { createMemoryHistory, createRouter } from 'vue-router'

import StartView from './StartView.vue'
import LocationView from './LocationView.vue'
import LocationViewNew from './LocationViewNew.vue'

const routes = [
  { path: '/', name: 'start', component: StartView },
  { path: '/location/:green_play/:preference/:location', name: 'location', component: LocationView, props: true },
  // { path: '/location/:green_play/:preference/:location', name: 'location', component: LocationViewNew, props: true },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
