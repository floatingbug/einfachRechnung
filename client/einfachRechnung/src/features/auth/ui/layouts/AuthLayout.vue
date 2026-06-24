<script setup>
import Card from "primevue/card";
import {Logo} from "@/shared/components";

</script>


<template>
	<div class="auth-layout">
		<div class="auth-content">
			<Card>
				<template #title>
					<Logo />
					<slot name="header" />
				</template>

				<template #content>
					<div class="form">
						<slot name="form" />
					</div>
				</template>
			</Card>
		</div>
	</div>
</template>


<style scoped lang="scss">
.auth-layout {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.auth-content {
	width: 90%;
	max-width: 800px;
}

.form {
	margin-top: var(--space-xl2);
}
</style>
