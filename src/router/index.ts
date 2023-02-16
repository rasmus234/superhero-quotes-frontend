import { createRouter, createWebHistory } from 'vue-router'
import QuoteView from "@/views/QuoteView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'quoteView',
      component: QuoteView
    }
  ]
})

export default router
