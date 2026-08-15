<script setup>
import {ref} from "vue";
import {itemTemplates} from "../../../../options";;
import Select from "primevue/select";


const emit = defineEmits([ "action" ]);


const selectedTemplate = ref(null);

</script>


<template>
	<div>
		<Select
			v-model="selectedTemplate"
			:options="itemTemplates"
			optionLabel="label"
			optionValue="template"
			placeholder="Vorlage"
			@update:modelValue="emit('action',
				{
					action: 'templateSelected',
					template: $event,
				}
			)"
		/>
	</div>
</template>


<style lang="scss" scoped>

</style>
