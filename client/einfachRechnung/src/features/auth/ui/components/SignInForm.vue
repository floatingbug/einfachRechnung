<script setup>
import {ref} from "vue";
import InputText from "primevue/inputtext";


const emit = defineEmits(["submit"]);


const credentials = ref({
	nameOrEmail: "",
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
			<label for="nameOrEmail">Name oder E-Mail</label>
			<InputText id="nameOrEmail"
				v-model="credentials.nameOrEmail"
			/>
		</div>

		<div class="input">
			<label for="password">Password</label>
			<InputText type="password" id="password"
				v-model="credentials.password"
			/>
		</div>

		<div class="form-actions">
			<Button
				type="submit"
				label="Anmelden"
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
