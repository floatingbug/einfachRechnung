<script setup>
import { useRoute } from 'vue-router'
</script>

<template>
	<div class="verify-email">
		<i class="pi pi-envelope verify-icon" />

		<h1>Check your email</h1>

		<p>
			We have sent a confirmation link to your email address. Please click the link to verify
			your account.
		</p>

		<p class="hint">If you don't see the email, check your spam folder.</p>
	</div>
</template>

<style scoped>
.verify-email {
	height: 100dvh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	max-width: 420px;
	margin: 0 auto;
}

.verify-icon {
	font-size: 3rem;
	margin-bottom: var(--space-md);
	color: var(--color-primary);
}

.hint {
	margin-top: var(--space-sm);
	opacity: 0.7;
}
</style>
