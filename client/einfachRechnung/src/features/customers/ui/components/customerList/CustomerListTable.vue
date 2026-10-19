
<script setup>
import { computed, ref } from "vue";
import {
    DataTable,
    Column,
} from "primevue";

const props = defineProps({
    customers: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits([
    "customerSelected",
    "update:sort",
]);

const sortField = ref("createdAd");
const sortOrder = ref(-1);

const customerRows = computed(() => {
    return props.customers.map((customer) => {
        const isCompany = customer.customerType === "company";

        const customerName = isCompany
            ? customer.companyName ?? ""
            : `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim();

        const customerSortName = isCompany
            ? customer.companyName ?? ""
            : customer.lastName ?? "";

        const contactName = isCompany
            ? customer.contactPerson ?? ""
            : `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim();

        return {
            ...customer,
            customerName,
            customerSortName,
            contactName,
        };
    });
});

function onSort(event) {
    sortField.value = event.sortField;
    sortOrder.value = event.sortOrder;

    emit("update:sort", {
        sortField: sortField.value,
        sortOrder: sortOrder.value,
    });
}
</script>

<template>
    <DataTable
        class="customer-list-data-table"
        :value="customerRows"
        :sortField="sortField"
        :sortOrder="sortOrder"
        lazy
        size="large"
        dataKey="id"
        rowHover
        sortMode="single"
        removableSort
        :pt="{
            bodyRow: {
                style: {
                    cursor: 'pointer',
                },
            },
        }"
        @sort="onSort"
        @row-click="emit('customerSelected', $event.data.id)"
    >
        <Column
            field="customerName"
            sortField="customerName"
            header="Kunde"
            sortable
        >
            <template #body="{ data }">
                {{ data.customerName || "-" }}
            </template>
        </Column>

        <Column
            field="contactName"
            header="Kontakt"
			sortField="contactPerson"
            sortable
        >
            <template #body="{ data }">
                {{ data.contactName || "-" }}
            </template>
        </Column>

        <Column
            field="email"
            header="E-Mail"
        >
            <template #body="{ data }">
                {{ data.email || "-" }}
            </template>
        </Column>

        <Column
            field="phone"
            header="Telefon"
        >
            <template #body="{ data }">
                {{ data.phone || "-" }}
            </template>
        </Column>

        <Column
            field="city"
            header="Ort"
            sortable
        >
            <template #body="{ data }">
                {{ data.city || "-" }}
            </template>
        </Column>
    </DataTable>
</template>

<style lang="scss" scoped>
.customer-list-data-table {
    width: 100%;
    min-width: 0;
    border: 1px solid var(--table-border-color);
}
</style>
