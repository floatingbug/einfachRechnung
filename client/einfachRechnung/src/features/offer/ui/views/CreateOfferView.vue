<script setup>
import {ref, onMounted} from "vue";
import CreateOfferForm from "../components/createOfferForm/CreateOfferForm.vue";
import {useOfferStore} from "../../store/useOfferStore.js";
import {createOfferEntity} from "../../entities";


const offerStore = useOfferStore();
offerStore.createDraftOffer()

</script>


<template>
	<CreateOfferForm />
</template>


<style scoped lang="scss">

</style>
