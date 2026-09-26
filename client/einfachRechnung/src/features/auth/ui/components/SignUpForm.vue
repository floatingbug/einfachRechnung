<script setup>
import {ref} from "vue";
import InputText from "primevue/inputtext";


const emit = defineEmits(["submit"]);


const credentials = ref({
	name: "",
	email: "",
	password: "",
});


function onSubmit(){
	emit("submit", {
		...credentials.value,
	});
}

</script>


<template>
	<form @submit.prevent="onSubmit">
		<div class="input">
			<label for="name">Name</label>
			<InputText id="name"
				v-model="credentials.name"
			/>
		</div>

		<div class="input">
			<label for="email">E-Mail</label>
			<InputText id="email"
				v-model="credentials.email"
			/>
		</div>

		<div class="input">
			<label for="password">Password</label>
			<InputText type="password" id="password"
				v-model="credentials.password"
			/>
		</div>

		<div class="allready-has-account">
			Already have an account? click on <router-link to="/auth/sign-in">Sign-in</router-link>
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
	margin-top: var(--space-lg);
}
</style>
