import { createRouter, createWebHistory } from 'vue-router'
import invoiceRoutes from "@/features/invoice/router";
import dashboardRoutes from "@/features/dashboard/router";
import authRoutes from "@/features/auth/router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
	  ...invoiceRoutes,
	  ...dashboardRoutes,
	  ...authRoutes,
  ],
})

export default router
