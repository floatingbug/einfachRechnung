<script setup>
import {useCustumerStore} from "../../store";

const {customerStore} = useCustumerStore();

customerStore.findCustomers();

</script>


<template>

</template>


<style scoped lang="scss">

</style>
