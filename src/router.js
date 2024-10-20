import { createMemoryHistory, createRouter } from 'vue-router'

// import RootView from './RootView.vue'
import StartView from './StartView.vue'
import MapView from './MapView.vue'
// import LocationView from './LocationView.vue'

const routes = [
  { path: '/', name: 'start', component: StartView },
  { path: '/map', name: 'map', component: MapView },
  // { path: '/location', component: LocationView },
  // path: '/',
  //   component: RootView,
  //   children: [
  //   { path: '', component: StartView },
  //   { path: 'map', component: MapView },
  //   { path: 'location', component: LocationView },
  // ],
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
