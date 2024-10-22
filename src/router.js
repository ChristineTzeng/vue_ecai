import { createMemoryHistory, createRouter } from 'vue-router'

// import RootView from './RootView.vue'
import StartView from './StartView.vue'
// import MapView from './MapView.vue'
import LocationView from './LocationView.vue'

const routes = [
  { path: '/', name: 'start', component: StartView },
  // { path: '/map', name: 'map', component: MapView },
  { path: '/location/:green_playing/:preference/:location', name: 'location', component: LocationView, props: true },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
