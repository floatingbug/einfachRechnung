<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { Sidebar, Topbar } from "../../shared/components";

const isDesktop = ref(false);
const sidebarCollapsed = ref(false);
const mobileSidebarOpen = ref(false);
let desktopMediaQuery;

function updateViewport({ matches }) {
	isDesktop.value = matches;

	if (matches) {
		mobileSidebarOpen.value = false;
	}
}

function toggleSidebar() {
	if (isDesktop.value) {
		sidebarCollapsed.value = !sidebarCollapsed.value;
		return;
	}

	mobileSidebarOpen.value = !mobileSidebarOpen.value;
}

function closeMobileSidebar() {
	mobileSidebarOpen.value = false;
}

onMounted(() => {
	desktopMediaQuery = window.matchMedia("(min-width: 1024px)");

	updateViewport(desktopMediaQuery);

	desktopMediaQuery.addEventListener("change", updateViewport);
});

onBeforeUnmount(() => {
	desktopMediaQuery?.removeEventListener("change", updateViewport);
});
</script>

<template>
	<div
		class="app-layout"
		:class="{ 'is-sidebar-collapsed': sidebarCollapsed }"
	>
		<Topbar
			class="topbar"
			:sidebar-open="isDesktop ? !sidebarCollapsed : mobileSidebarOpen"
			@sidebar-toggle="toggleSidebar"
		/>

		<Sidebar
			class="sidebar"
			:desktop="isDesktop"
			:collapsed="sidebarCollapsed"
			:mobile-open="mobileSidebarOpen"
			@close="closeMobileSidebar"
			@toggle-collapse="toggleSidebar"
		/>

		<main class="main">
			<RouterView />
		</main>
	</div>
</template>

<style scoped lang="scss">
@use "@/shared/styles/breakpoints" as bp;
@use "@/shared/styles/media" as media;

.app-layout {
	min-height: 100dvh;

	@include media.up(bp.$bp-lg) {
		display: grid;
		grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
		grid-template-rows: auto 1fr;
		grid-template-areas:
			"sidebar topbar"
			"sidebar main";
		transition: grid-template-columns 220ms ease;

		.topbar {
			grid-area: topbar;
		}

		.sidebar {
			grid-area: sidebar;
		}

		.main {
			grid-area: main;
		}
	}

	&.is-sidebar-collapsed {
		@include media.up(bp.$bp-lg) {
			grid-template-columns:
				var(--sidebar-collapsed-width)
				minmax(0, 1fr);
		}
	}
}

.topbar {
	width: 100%;
	position: sticky;
	top: 0;
	z-index: 20;
}

.main {
	width: 100%;
	min-width: 0;
}
</style>
