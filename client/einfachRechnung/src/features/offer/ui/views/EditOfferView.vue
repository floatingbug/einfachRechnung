<script setup>
import {ref, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {createOfferEntity} from "../../entities";
import {useOfferStore} from "../../store";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import DatePicker from "primevue/datepicker";
import {LineItems, TotalsList} from "@/shared/components";
import { useToast } from 'primevue/usetoast';


const route = useRoute();
const router = useRouter();
const offerStore = useOfferStore();
const toast = useToast();
const offerToEdit = ref();
const totals = ref();


onMounted(async () => {
	const offerNumber = route.params.offerNumber;

	const offer =  await offerStore.getOfferByOfferNumber({
		offerNumber,
	});

	offerToEdit.value = createOfferEntity(
		structuredClone(offer)
	);
})

async function updateOffer(){
	try {
		const result = await offerStore.updateOffer({
			offer: offerToEdit.value,
		})

		if(!result.success){
			return toast.add(
				{
					severity: "error",
					summary: 'Keine Änderung',
					detail: result.message,
					life: 5000
				}
			);
		}

		toast.add(
			{
				summary: 'Angebot geändert',
				detail: result.message,
				life: 5000
			}
		);

		router.push(`/offer/details/${offerToEdit.value.offerNumber}`)
	}
	catch (error) {
		console.log(error);
	}
}

function onLineItemsAction(event){
	switch(event.action){
		case "totalsRefreshed" :
			totals.value = event.totals;
		break;
	}
}

</script>


<template>
	<div class="edit-offer view" v-if="offerToEdit">
		<form>
			<section>
				<h2>Kunde</h2>

				<div class="input-group"
					v-if="offerToEdit.customerSnapshot.customerType === 'private'"
				>
					<div class="input">
						<label for="customerName">Name</label>

						<InputText
							v-model="offerToEdit.customerName"
						/>
					</div>
				</div>

				<div class="input-group"
					v-if="offerToEdit.customerSnapshot.customerType === 'company'"
				>
					<div class="input">
						<label for="companyName">Firma</label>

						<InputText
							v-model="offerToEdit.customerName"
						/>
					</div>

					<div class="input">
						<label for="contactPerson">Ansprechpartner</label>

						<InputText
							v-model="offerToEdit.contactPerson"
						/>
					</div>
				</div>
			</section>

			<Divider />

			<section>
				<h2>Angebotsdaten</h2>

				<div class="input-group">
					<div class="input">
						<label for="offerDate">Angebotsdatum</label>

						<DatePicker
							v-model="offerToEdit.offerDate"
						/>
					</div>

					<div class="input">
						<label for="validUntil">Gültig bis</label>

						<DatePicker
							v-model="offerToEdit.validUntil"
						/>
					</div>
				</div>

				<div class="input">
					<label for="project">Project</label>

					<Textarea
						v-model="offerToEdit.project"
					/>
				</div>
			</section>

			<Divider />

			<section>
				<h2>Positionen</h2>

				<LineItems
					v-model="offerToEdit.items"
					@action="onLineItemsAction"
				/>
			</section>

			<Divider />

			<section>
				<h2>Texte</h2>

				<div class="input-group input-texts">
					<div class="input">
						<label for="introduction">Einleitung</label>

						<Textarea
							v-model="offerToEdit.introduction"
							rows="4"
						/>
					</div>

					<div class="input">
						<label for="closing">Schlussbemerkung</label>

						<Textarea
							v-model="offerToEdit.closing"
							rows="4"
						/>
					</div>
				</div>
			</section>

			<Divider />

			<section>
				<h2>Preisübersicht</h2>

				<TotalsList
					:totals="totals"
				/>
			</section>

			<Divider />

			<section>
				<div class="action-buttons">
					<Button
						label="Speichern"
						@click="updateOffer"
					/>

					<Button
						label="Abbrechen"
						severity="secondary"
					/>
				</div>
			</section>
		</form>
	</div>
</template>


<style lang="scss" scoped>
@use "@/shared/styles/media" as media;
@use "@/shared/styles/breakpoints" as bp;

.input-date {
	display: grid;
	gap: var(--space-xl);

	@include media.up(bp.$bp_md) {
		grid-template-columns: 1fr 1fr;
	}
}

.input-texts {
	display: grid;

	@include media.up(bp.$bp_md) {
		grid-template-columns: 1fr 1fr;
	}
}

.action-buttons {
	display: flex;
	justify-content: flex-end;
	gap: var(--space-md);
}
</style>
