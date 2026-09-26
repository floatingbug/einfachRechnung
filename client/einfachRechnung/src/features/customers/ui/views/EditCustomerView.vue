<script setup>
import {onMounted} from "vue";
import {useRoute} from "vue-router"
import { useCustomersStore } from "../../store";
import { PageContainer } from "@/shared/components";
import {
	SelectCustomerType
} from "@/shared/components";


const route = useRoute();
const customersStore = useCustomersStore();


onMounted(async () => {
	if(!customersStore.customer){
		try {
			await customersStore.getCustomerById({
				customerId: route.params.customerId,
			})
		}
		catch (error) {
			console.log(error.response.data.message);
		}
	}

	console.log(customersStore.customer);
});

</script>


<template>
	<PageContainer>
		<form v-if="customersStore.customer">
			<section>
				<div class="input-group">
					<div class="input">
						<label for="customerType">Kundentyp</label>

						<SelectCustomerType
							v-model="customersStore.customer.customerType"
						/>
					</div>
				</div>
			</section>
		</form>
	</PageContainer>
</template>


<style lang="scss" scoped>

</style>
