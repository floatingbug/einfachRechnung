import { createRouter, createWebHistory } from 'vue-router'
import invoiceRoutes from "@/features/invoice/router";
import dashboardRoutes from "@/features/dashboard/router";
import authRoutes from "@/features/auth/router";
import customerRoutes from "@/features/customer/router";
import settingRoutes from "@/features/settings/router";
import offerRoutes from "@/features/offer/router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
	  ...invoiceRoutes,
	  ...dashboardRoutes,
	  ...authRoutes,
	  ...customerRoutes,
	  ...settingRoutes,
	  ...offerRoutes,
  ],
})

export default router
