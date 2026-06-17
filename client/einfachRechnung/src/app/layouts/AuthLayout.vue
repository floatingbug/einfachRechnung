<script setup>
import { Sidebar, Topbar } from "../../shared/components";

</script>


<template>
	<div class="auth-layout">
		<Topbar class="topbar"
		/>

		<div class="main">
			<RouterView />
		</div>
	</div>
</template>


<style scoped lang="scss">
@use "@/shared/styles/breakpoints" as bp;
@use "@/shared/styles/media" as media;

.auth-layout {
	height: 100dvh;

	@include media.up(bp.$bp-lg) {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
		user-select: none;
	}
}

.topbar {
	width: 100%;
	position: sticky;
	top: 0;
	z-index: 10;
}

.main {
	width: 100%;
	height: 100%;
	min-width: 0;
	display: flex;
	justify-content: center;
}
</style>
