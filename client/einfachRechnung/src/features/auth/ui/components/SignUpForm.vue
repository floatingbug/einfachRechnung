<script setup>
import InputText from "primevue/inputtext";

function onSubmit(){
	console.log("hallo");
}

</script>


<template>
	<form @submit.prevent="onSubmit">
		<div class="input">
			<label for="name">Name</label>
			<InputText id="name" />
		</div>

		<div class="input">
			<label for="email">E-Mail</label>
			<InputText id="email" />
		</div>

		<div class="input">
			<label for="password">Password</label>
			<InputText type="password" id="password" />
		</div>

		<div class="form-actions">
			<Button
				type="submit"
				label="Registrieren"
			/>
		</div>
	</form>
</template>


<style scoped lang="scss">
form {
	display: grid;
	row-gap: var(--space-xl);
}

.input {
	display: flex;
	flex-direction: column;
	gap: var(--space-xs);
}

.form-actions {
	width: 100%;
	display: flex;
	justify-content: flex-end;
}
</style>
