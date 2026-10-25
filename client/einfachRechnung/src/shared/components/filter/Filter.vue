<script setup>
import { computed } from "vue";
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
	Badge,
} from "primevue";

import Times from '@primeicons/vue/times';

const props = defineProps({
	items:{
		type: Array,
		default: () => [],
	}
})


const emit = defineEmits([ "update:filter", "reset" ]);


// Number of filters that currently hold a value.
const activeFilterCount = computed(() => {
	if(!Array.isArray(props.items)) return 0;

	return props.items.filter(item => item.value !== "" && item.value != null).length;
});


function onUpdateInput({field, value}){
	emit("update:filter", {field, value});
}

// Clear every filter input and let the parent reload unfiltered data.
function onReset(){
	if(Array.isArray(props.items)){
		props.items.forEach(item => {
			item.value = "";
			item.selectedStatus = null;
		});
	}

	emit("reset");
}

</script>


<template>
	<Accordion>
		<AccordionPanel value="0">
			<AccordionHeader>
				<span class="filter-header">
					Filter

					<Badge
						v-if="activeFilterCount > 0"
						:value="activeFilterCount"
						severity="secondary"
					/>
				</span>
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

				<div
					v-if="activeFilterCount > 0"
					class="filter-actions"
				>
					<Button
						label="Zurücksetzen"
						icon="pi pi-times"
						severity="secondary"
						text
						size="small"
						@click="onReset"
					/>
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

.filter-header {
	display: inline-flex;
	align-items: center;
	gap: var(--space-xs);
}

.filter-actions {
	width: 100%;
	display: flex;
	justify-content: flex-end;
	margin-top: var(--space-md);
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
