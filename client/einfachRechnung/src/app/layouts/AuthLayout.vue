<script setup>
import { Sidebar, Topbar } from "../../shared/components";

</script>


<template>
	<div class="auth-layout">
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
}
.main {
	width: 100%;
	height: 100%;
	min-width: 0;
	display: flex;
	justify-content: center;
}
</style>
