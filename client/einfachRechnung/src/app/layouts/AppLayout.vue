<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { Sidebar, Topbar, Modal } from "../../shared/components";

const isDesktop = ref(false);
const desktopSidebarCollapsed = ref(false);
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
		desktopSidebarCollapsed.value = !desktopSidebarCollapsed.value;
		return;
	}

	mobileSidebarOpen.value = !mobileSidebarOpen.value;
}

onMounted(() => {
	desktopMediaQuery = window.matchMedia("(min-width: 1024px)");

	updateViewport(desktopMediaQuery);

	desktopMediaQuery.addEventListener("change", updateViewport);
});

onBeforeUnmount(() => {
	desktopMediaQuery?.removeEventListener("change", updateViewport);
});

function onModalAction(event){
	if(event.action === "modalClicked"){
		mobileSidebarOpen.value = false;
	}
}

function onSidebarAction(event){
	if(event.action === "linkClicked"){
		mobileSidebarOpen.value = false;
	}

	if(event.action === "collapseSidebar"){
		toggleSidebar();
	}
}

</script>

<template>
	<div class="app-layout"
		:class="{ 'is-sidebar-collapsed': desktopSidebarCollapsed }"
	>
		<Topbar class="topbar"
			:sidebar-open="isDesktop ? !desktopSidebarCollapsed : mobileSidebarOpen"
			@sidebar-toggle="toggleSidebar"
		/>

		<Sidebar
			class="sidebar"
			:class="{
				'mobile-sidebar-open': mobileSidebarOpen,
				'is-mobile': !isDesktop,
			}"
			:desktop="isDesktop"
			:collapsed="desktopSidebarCollapsed"
			@toggle-collapse="toggleSidebar"
			@action="onSidebarAction"
		/>

		<main class="main">
			<RouterView />
		</main>

		<div class="plus-space-bottom"></div>

		<Teleport to="body" v-if="mobileSidebarOpen">
			<Modal
				@action="onModalAction"
			/>
		</Teleport>
	</div>
</template>

<style scoped lang="scss">
@use "@/shared/styles/breakpoints" as bp;
@use "@/shared/styles/media" as media;

.app-layout {
	display: grid;
	grid-template-rows: auto 1fr;
	grid-template-areas:
		"topbar"
		"main";

	.topbar {
		grid-area: topbar;
		width: 100%;
		position: sticky;
		top: 0;
		z-index: 20;
	}

	.sidebar {
		grid-area: sidebar;
	}

	.main {
		min-height: calc(100dvh - 65px);
		grid-area: main;
		height: 100%;
		width: 100%;
		min-width: 0;
	}

	@include media.up(bp.$bp-lg) {
		grid-template-columns: auto minmax(0, 1fr);
		grid-template-rows: auto 1fr;
		grid-template-areas:
			"sidebar topbar"
			"sidebar main";
		transition: grid-template-columns 220ms ease;
	}
}

.sidebar {
	width: 100%;
	height: 100dvh;
	position: sticky;
	top: 0;
	z-index: var(--z-modal);

	&.is-mobile {
		width: 50%;
		min-width: 280px;
		max-width: 580px;
		position: fixed;
		z-index: calc(var(--z-modal) + 1);
		transition: 250ms;
		transform: translateX(-100%);

		&.mobile-sidebar-open {
			transform: translateX(0);
		}
	}
}

.plus-space-bottom {
	height: 12rem;
}
</style>
