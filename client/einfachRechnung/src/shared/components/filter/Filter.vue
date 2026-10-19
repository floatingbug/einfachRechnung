<script setup>
import {
	InputText,
	Accordion,
	AccordionContent,
	AccordionHeader,
	AccordionPanel,
	InputGroup,
	InputGroupAddon,
	FloatLabel,
	Select,
} from "primevue";

import Times from '@primeicons/vue/times';

defineProps({
	items:{
		type: Array,
		default: [],
	}
})


const emit = defineEmits([ "update:filter" ]);


function onUpdateInput({field, value}){
	emit("update:filter", {field, value});
}

</script>


<template>
	<Accordion>
		<AccordionPanel value="0">
			<AccordionHeader>
				Filter
			</AccordionHeader>

			<AccordionContent>
				<div class="filter-items">
					<div class="filter-item"
						v-for="(item, index) in items"
						:key="index"
					>
						<InputGroup v-if="item.type === 'text'"
						>
							<FloatLabel
								variant="on"
							>
								<InputText :id="item.field"
									:modelValue="item.value"
									@update:modelValue="onUpdateInput({field: item.field, value: $event})"
								/>

								<label :for="item.field">{{item.label}}</label>
							</FloatLabel>

							<InputGroupAddon>
								<Button
									severity="secondary"
									iconOnly
									@click="onUpdateInput({field: item.field, value: ''})"
								>
									<Times />
								</Button>
							</InputGroupAddon>
						</InputGroup>

						<Select
							v-if="item.type === 'select'"
							v-model="item.selectedStatus"
							:options="item.selectItems"
							optionLabel="label"
							optionValue="value"
							:placeholder="item.placeholder"
							@update:modelValue="onUpdateInput({field: item.field, value: $event})"
							showClear
						/>
					</div>
				</div>
			</AccordionContent>
		</AccordionPanel>
	</Accordion>
</template>


<style lang="scss" scoped>
.p-accordion {
	width: 100%;
}

.p-select {
	display: flex;
}

.filter-items {
	width: 100%;
	display: grid;
	grid-template-columns: 1fr;
	gap: var(--space-md);

	@media(width >= 580px){
		grid-template-columns: 1fr 1fr;
	}
	@media(width >= 1400px){
		grid-template-columns: 1fr 1fr 1fr;
	}
	@media(width >= 2000px){
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
}


.filter-item {
	width: 100%;
}
</style>
