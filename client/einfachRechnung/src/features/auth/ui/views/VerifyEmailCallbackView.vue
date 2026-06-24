<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import authServices from '../../services'
import InputText from "primevue/inputtext";
import ProgressSpinner from "primevue/progressspinner";
import Message from "primevue/message";

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const isSuccess = ref(false)
const errorMessage = ref('')

const resendLoading = ref(false)
const resendSuccess = ref(false)
const email = ref('')

onMounted(async () => {
	const token = route.query.token

	if (!token) {
		errorMessage.value = 'Invalid or missing verification token.'
		isLoading.value = false
		return
	}

	try {
		await authServices.verifyEmail({ token })
		isSuccess.value = true

		setTimeout(() => {
			router.push('/auth/sign-in')
		}, 3000)
	} catch (err) {
		errorMessage.value =
			err?.response?.data?.message ||
			'Email verification failed. Please request a new verification email.'
	} finally {
		isLoading.value = false
	}
})

async function resendEmail() {
	if (!email.value) {
		errorMessage.value = 'Please enter an e-mail.'
		return
	}

	resendLoading.value = true

	try {
		await authServices.resendVerificationEmail({ email: email.value })
		resendSuccess.value = true
	} catch {
		errorMessage.value = 'Failed to resend verification email.'
	} finally {
		resendLoading.value = false
		email.value = ''
	}
}
</script>

<template>
	<div class="verify-email-callback">
		<div v-if="isLoading" class="verify-email">
			<ProgressSpinner aria-label="Verifying email" />
			<p class="verify-text">Verifying your email address…</p>
		</div>

		<Message v-else-if="isSuccess" severity="success" :closable="false">
			Your email address has been successfully verified.
			<br />
			You will be redirected to the sign-in page shortly.
		</Message>

		<div v-else class="verify-error">
			<Message severity="error" :closable="false">
				{{ errorMessage }}
			</Message>

			<div class="resend-email-form">
				<div class="form-field">
					<label for="email">E-Mail</label>
					<InputText type="email" v-model="email" />
				</div>
				<Button
					label="Resend verification email"
					class="resend-button"
					:loading="resendLoading"
					@click="resendEmail"
				/>
			</div>

			<Message v-if="resendSuccess" severity="success" :closable="false">
				A new verification email has been sent.
			</Message>
		</div>
	</div>
</template>

<style scoped>
.verify-email-callback {
	min-height: 100vh;
	display: grid;
	place-items: center;
	text-align: center;
}

.verify-email {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--space-md);
}

.verify-error {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--space-md);
}

.verify-text {
	color: var(--color-text);
}

.resend-email-form {
	display: flex;
	flex-direction: column;
	margin-top: var(--space-md);
}

.form-field {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: var(--space-2xs);
}

.resend-button {
	margin-top: var(--space-sm);
}
</style>
