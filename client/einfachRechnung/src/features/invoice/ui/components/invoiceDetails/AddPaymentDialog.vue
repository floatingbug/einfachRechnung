<script setup>
import {computed, ref, watch} from "vue";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import DatePicker from "primevue/datepicker";
import {SelectPaymentMethod} from "@/shared/components";
import {validatePayment} from "../../../domainRules/payment.rules.js";


const props = defineProps({
	visible: {
		type: Boolean,
		default: false,
	},
	invoice: {
		type: Object,
		required: true,
	},
});


const emit = defineEmits(["submit", "close"]);


const form = ref(createPaymentForm());
const error = ref("");

const openAmount = computed(() => {
	return Number(props.invoice?.payment?.openAmount ?? 0);
});


watch(() => props.visible, (visible) => {
	if(visible){
		form.value = createPaymentForm();
	}
});


function createPaymentForm(){
	return {
		amount: null,
		paidAt: new Date(),
		method: "",
		reference: "",
	};
}


function toIsoDate(value){
	if(value instanceof Date){
		const year = value.getFullYear();
		const month = String(value.getMonth() + 1).padStart(2, "0");
		const day = String(value.getDate()).padStart(2, "0");

		return `${year}-${month}-${day}`;
	}

	return value;
}


function onSubmit(){
	const payment = {
		amount: Number(form.value.amount),
		paidAt: toIsoDate(form.value.paidAt),
		method: form.value.method || "",
		reference: form.value.reference?.trim() ?? "",
	};

	const result = validatePayment(payment, openAmount.value);

	if(!result.valid){
		error.value = result.error;
		return;
	}

	error.value = "";
	emit("submit", payment);
}
</script>


<template>
	<Dialog
		header="Zahlung erfassen"
		:visible="visible"
		@update:visible="emit('close')"
		modal
		:pt="{
			root: {
				style: {
					width: '90%',
					'max-width': '520px',
				},
			},
		}"
	>
		<form @submit.prevent="onSubmit">
			<div class="item-group-1-column">
				<div class="input">
					<label for="paymentAmount">Betrag</label>

					<InputNumber
						id="paymentAmount"
						v-model="form.amount"
						mode="currency"
						currency="EUR"
						:minFractionDigits="2"
						:maxFractionDigits="2"
					/>
				</div>

				<div class="input">
					<label for="paymentDate">Zahlungsdatum</label>

					<DatePicker
						id="paymentDate"
						v-model="form.paidAt"
						dateFormat="dd.mm.yy"
					/>
				</div>

				<div class="input">
					<label for="paymentMethod">Zahlungsart (Optional)</label>

					<SelectPaymentMethod v-model="form.method" />
				</div>

				<div class="input">
					<label for="paymentReference">Referenz (Optional)</label>

					<InputText
						id="paymentReference"
						v-model="form.reference"
						maxlength="100"
					/>
				</div>
			</div>

			<p v-if="error" class="error">
				{{ error }}
			</p>

			<div class="action-buttons">
				<Button
					type="submit"
					label="Zahlung speichern"
				/>
			</div>
		</form>
	</Dialog>
</template>


<style lang="scss" scoped>
.error {
	margin-top: var(--space-md);
	color: var(--red-500);
}

.action-buttons {
	display: flex;
	justify-content: flex-end;
	margin-top: var(--space-xl2);
}
</style>
