<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Paginator from "primevue/paginator";

import useInvoiceStore from "../../store/useInvoiceStore.js";
import { InvoiceList } from "../components";
import { PageContainer, Filter } from "@/shared/components";
import { createTableItems, filterItems } from "../items/";


const router = useRouter();
const invoiceStore = useInvoiceStore();

const tableItems = ref([]);
const isInitializing = ref(true);

const currLimit = ref(10);
const currPage = ref(0);
const activeFilters = ref([]);


onMounted(async () => {
    try {
        await invoiceStore.getInvoices({
            limit: currLimit.value,
            page: currPage.value,
        });

        tableItems.value = createTableItems(invoiceStore.invoices);
    } catch {
        invoiceStore.invoices = [];
        tableItems.value = [];
    } finally {
        isInitializing.value = false;
    }
});


async function loadInvoices() {
    await invoiceStore.getInvoices({
        limit: currLimit.value,
        page: currPage.value,
        filter: activeFilters.value,
    });

    tableItems.value = createTableItems(invoiceStore.invoices);
}

async function onPaginationAction(event) {
    currLimit.value = event.rows;
    currPage.value = event.page;

    await loadInvoices();
}

function onInvoiceListActions(event) {
    if (event.action === "openInvoice") {
        router.push({
            name: "invoice-details",
            params: {
                invoiceNumber: event.invoiceNumber,
            },
        });
    }
}

async function onUpdateFilter({ field, value }) {
    const item = filterItems.value.find(
        (item) => item.field === field
    );

    if (!item) return;

    item.value = value;

    activeFilters.value = filterItems.value
        .filter((item) => item.value !== "" && item.value != null)
        .map(({ field, value }) => ({
            field,
            value,
        }));

    currPage.value = 0;

    await loadInvoices();
}
</script>

<template>
    <PageContainer>
        <Filter
            :items="filterItems"
            @update:filter="onUpdateFilter"
        />

        <div v-if="!isInitializing" class="invoice-list">
            <InvoiceList
                :items="tableItems"
                @action="onInvoiceListActions"
            />

            <Paginator
                v-if="invoiceStore.pagination?.total > currLimit"
                :first="currPage * currLimit"
                :rows="currLimit"
                :totalRecords="invoiceStore.pagination.total"
                :rowsPerPageOptions="[10, 20, 50, 100]"
                @page="onPaginationAction"
            />
        </div>
    </PageContainer>
</template>


<style scoped lang="scss">
.invoice-list {
	width: 100%;
	min-width: 0;
	height: 100%;
	display: grid;
	row-gap: var(--space-md);
	grid-template-rows: 1fr auto;
}
</style>
