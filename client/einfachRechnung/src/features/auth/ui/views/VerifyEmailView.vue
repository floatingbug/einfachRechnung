<script setup>
</script>

<template>
	<div class="verify-email">
		<i class="pi pi-envelope verify-icon" />

		<h1>E-Mail bestätigen</h1>

		<p>
			Wir haben Ihnen einen Bestätigungslink an Ihre E-Mail-Adresse geschickt. Bitte klicken
			Sie auf den Link, um Ihr Konto zu bestätigen.
		</p>

		<p class="hint">Falls Sie die E-Mail nicht sehen, prüfen Sie bitte den Spam-Ordner.</p>
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
