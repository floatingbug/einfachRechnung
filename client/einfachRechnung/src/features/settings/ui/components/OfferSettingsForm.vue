<script setup>
import {ref, onMounted, computed} from "vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import {useSettingsStore} from "@/features/settings/store/useSettingsStore.js";
import {offerNumberFormatOptions} from "../../options";
import Select from "primevue/select";
import Message from "primevue/message";
import Textarea from "primevue/textarea";
import Checkbox from "primevue/checkbox";


const emit = defineEmits([ "action" ]);


const settingsStore = useSettingsStore();
const settings = ref();


onMounted(async () => {
	settings.value = await settingsStore.getOffer();
})

const offerNumberPreview = computed(() => {
	if (!settings.value) {
		return "";
	}

	const prefix = settings.value.offerPrefix ?? "";

	return settings.value.offerNumberFormat
		.replace("{prefix}", prefix)
		.replace("{year}", "2026")
		.replace("{number}", "00015");
});

function saveSettings(){
	emit("action", {
		action: "update",
		settings: settings.value,
	})
}
</script>


<template>
	<form v-if="settings">
		<h2>Angebotsnummer</h2>

		<div class="input-group">
			<div class="input">
				<label for="offerPrefix">Präfix (optional)</label>
				<InputText
					v-model="settings.offerPrefix"
					:placeholder="settings.offerPrefix"
				/>
				<p>Beispiel: A oder ANG</p>
			</div>

			<div class="input">
				<label for="offerNumberFormat">Nummernformat</label>
				<Select
					v-model="settings.offerNumberFormat"
					:options="offerNumberFormatOptions"
					optionLabel="label"
					optionValue="value"
				/>
			</div>

			<div class="offer-number-preview">
				<p>Vorschau</p>

				<Message severity="secondary">
					{{offerNumberPreview}}
				</Message>
			</div>
		</div>

		<Divider />

		<h2>Standardgültigkeit (Tage)</h2>

		<div class="input-group">
			<div class="input">
				<label for="validUntil">Gültig bis</label>
				<InputNumber
					v-model="settings.defaultValidityDays"
				/>
			</div>
		</div>

		<Divider />

		<h2>Texte</h2>

		<div class="input-group">
			<div class="input">
				<label for="introduction">Standard-Einleitung</label>
				<Textarea
					v-model="settings.introduction"
					rows="5"
				/>
			</div>

			<div class="input">
				<label for="closing">Standard-Schlussbemerkung</label>
				<Textarea
					v-model="settings.closing"
					rows="5"
				/>
			</div>
		</div>

		<Divider />

		<h2>PDF</h2>

		<div class="input-group">
			<div class="input-checkbox">
				<Checkbox
					v-model="settings.showItemNumbers"
					inputId="showItemNumbers"
					binary
				/>
				<label for="showItemNumbers">Positionsnummern anzeigen</label>
			</div>

			<div class="input-checkbox">
				<Checkbox
					v-model="settings.showTaxRatePerItem"
					inputId="showTaxRatePerItem"
					binary
				/>
				<label for="showTaxRatePerItem">Steuersatz je Position anzeigen</label>
			</div>
		</div>

		<div class="form-actions">
			<Button
				label="Speichern"
				icon="pi pi-save"
				@click="saveSettings"
			/>
		</div>
	</form>
</template>


<style lang="scss" scoped>
@use "@/shared/styles/media" as media;
@use "@/shared/styles/breakpoints" as bp;

.form-actions {
	display: flex;
	justify-content: flex-end;
}
</style>
