<script setup>
import {AuthLayout} from "../layouts";
import {SignUpForm} from "../components";

</script>


<template>
	<AuthLayout>
		<template #header>
			Registrierung
		</template>

		<template #form>
			<SignUpForm />
		</template>
	</AuthLayout>
</template>


<style scoped lang="scss">

</style>
