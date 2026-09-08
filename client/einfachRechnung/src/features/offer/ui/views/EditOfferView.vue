<script setup>
import {ref, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
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
const totals = ref();


onMounted(async () => {
	const offerNumber = route.params.offerNumber;

	await offerStore.getOfferByOfferNumber({
		offerNumber,
	});
})

async function updateOffer(){
	try {
		const result = await offerStore.updateOffer();

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

		router.push(`/offer/details/${offerStore.offer.offerNumber}`)
	}
	catch {
		toast.add({severity: "error", summary: "Fehler", detail: "Angebot konnte nicht geändert werden.", life: 5000});
	}
}

async function undueChanges(){
	const offerNumber = route.params.offerNumber;

	await offerStore.getOfferByOfferNumber({
		offerNumber,
	})
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
	<div class="edit-offer view" v-if="offerStore.offer">
		<form>
			<section>
				<h2>Kunde</h2>

				<div class="input-group"
					v-if="offerStore.offer.customerSnapshot.customerType === 'private'"
				>
					<div class="input">
						<label for="customerName">Name</label>

						<InputText
							v-model="offerStore.offer.customerName"
						/>
					</div>
				</div>

				<div class="input-group"
					v-if="offerStore.offer.customerSnapshot.customerType === 'company'"
				>
					<div class="input">
						<label for="companyName">Firma</label>

						<InputText
							v-model="offerStore.offer.customerName"
						/>
					</div>

					<div class="input">
						<label for="contactPerson">Ansprechpartner</label>

						<InputText
							v-model="offerStore.offer.contactPerson"
						/>
					</div>
				</div>
			</section>

			<Divider />

			<section>
				<h2>Angebotsdaten</h2>

				<div class="input-group">
					<div class="input">
						<label for="offerStore.offerDate">Angebotsdatum</label>

						<DatePicker
							v-model="offerStore.offer.offerDate"
						/>
					</div>

					<div class="input">
						<label for="validUntil">Gültig bis</label>

						<DatePicker
							v-model="offerStore.offer.validUntil"
						/>
					</div>
				</div>

				<div class="input">
					<label for="project">Project</label>

					<Textarea
						v-model="offerStore.offer.project"
					/>
				</div>
			</section>

			<Divider />

			<section>
				<h2>Positionen</h2>

				<LineItems
					v-model="offerStore.offer.items"
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
							v-model="offerStore.offer.introduction"
							rows="4"
						/>
					</div>

					<div class="input">
						<label for="closing">Schlussbemerkung</label>

						<Textarea
							v-model="offerStore.offer.closing"
							rows="4"
						/>
					</div>
				</div>
			</section>

			<Divider />

			<section>
				<h2>Preisübersicht</h2>

				<TotalsList v-if="totals"
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
						@click="undueChanges"
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
