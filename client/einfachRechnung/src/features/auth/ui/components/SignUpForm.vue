<script setup>
import {ref} from "vue";
import {
	InputText,
	Message,
} from "primevue";


defineProps({
	errors: {
		type: Object,
		default: {},
	}
});


const emit = defineEmits(["submit", "clearError"]);


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
				@update:modelValue="emit('clearError', 'name')"
			/>

			<Message v-if="errors.name?.length > 0"
				severity="error"
			>
				<div class="error"
					v-for="error in errors.name"
					:key="error"
				>
					{{error}}
				</div>
			</Message>
		</div>

		<div class="input">
			<label for="email">E-Mail</label>

			<InputText id="email"
				v-model="credentials.email"
				@update:modelValue="emit('clearError', 'email')"
			/>

			<Message v-if="errors.email?.length > 0"
				severity="error"
			>
				<div class="error"
					v-for="error in errors.email"
					:key="error"
				>
					{{error}}
				</div>
			</Message>
		</div>

		<div class="input">
			<label for="password">Password</label>

			<InputText type="password" id="password"
				v-model="credentials.password"
				@update:modelValue="emit('clearError', 'password')"
			/>

			<Message v-if="errors.password?.length > 0"
				severity="error"
			>
				<div class="error"
					v-for="error in errors.password"
					:key="error"
				>
					{{error}}
				</div>
			</Message>
		</div>

		<div class="allready-has-account">
			Already have an account? click on <router-link to="/auth/sign-in">Sign-in</router-link>
		</div>

		<Message v-if="errors.otherError"
			severity="error"
		>
			{{errors.otherError}}
		</Message>

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
