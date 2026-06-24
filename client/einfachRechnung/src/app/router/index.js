import { createRouter, createWebHistory } from "vue-router";
import invoiceRoutes from "@/features/invoice/router";
import dashboardRoutes from "@/features/dashboard/router";
import authRoutes from "@/features/auth/router";
import customerRoutes from "@/features/customer/router";
import settingRoutes from "@/features/settings/router";
import offerRoutes from "@/features/offer/router";
import { useAuthStore } from "@/features/auth/store";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...invoiceRoutes,
        ...dashboardRoutes,
        ...authRoutes,
        ...customerRoutes,
        ...settingRoutes,
        ...offerRoutes
    ]
});

router.beforeEach(async (to) => {
    if (!to.meta.requiresAuth) {
        return true;
    }

    const authStore = useAuthStore();

    if (authStore.accessToken) {
        return true;
    }

    try {
        await authStore.refresh();

        return true;
    }
    catch (error) {
        authStore.signOut();

        return {
            path: "/auth/sign-in"
        };
    }
});

export default router;
