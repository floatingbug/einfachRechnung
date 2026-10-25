<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Paginator from "primevue/paginator";

import useInvoiceStore from "../../store/useInvoiceStore.js";
import { InvoiceList } from "../components";
import { PageContainer, Filter, ListEmptyState, ListErrorState } from "@/shared/components";
import { createTableItems, filterItems } from "../items/";


const router = useRouter();
const invoiceStore = useInvoiceStore();

const tableItems = ref([]);
const isLoading = ref(true);
const error = ref(null);

const currLimit = ref(10);
const currPage = ref(0);
const activeFilters = ref([]);

const hasItems = computed(() => tableItems.value.length > 0);


onMounted(() => {
    loadInvoices();
});


async function loadInvoices() {
    isLoading.value = true;
    error.value = null;

    try {
        await invoiceStore.getInvoices({
            limit: currLimit.value,
            page: currPage.value,
            filter: activeFilters.value,
        });

        tableItems.value = createTableItems(invoiceStore.invoices);
    } catch (err) {
        invoiceStore.invoices = [];
        tableItems.value = [];
        error.value = err?.message ?? null;
    } finally {
        isLoading.value = false;
    }
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

// Filter.vue already cleared the inputs, reload without any filter.
async function onResetFilter() {
    activeFilters.value = [];
    currPage.value = 0;

    await loadInvoices();
}

function openCreateInvoice() {
    router.push("/invoice/create");
}
</script>

<template>
    <PageContainer :is-loading="isLoading && !hasItems && !error">
        <ListErrorState
            v-if="error"
            :message="error"
            @retry="loadInvoices"
        />

        <template v-else>
            <Filter
                :items="filterItems"
                @update:filter="onUpdateFilter"
                @reset="onResetFilter"
            />

            <ListEmptyState
                v-if="!isLoading && !hasItems"
                class="invoice-list-empty"
                title="Keine Rechnungen gefunden"
                message="Erstellen Sie eine neue Rechnung oder passen Sie die Filter an."
                action-label="Neue Rechnung"
                @action="openCreateInvoice"
            />

            <InvoiceList
                v-else
                class="invoice-list"
                :items="tableItems"
                :loading="isLoading"
                @action="onInvoiceListActions"
            />
        </template>

        <template #paginator>
            <Paginator
                v-if="!error && invoiceStore.pagination?.total > 0"
                :first="currPage * currLimit"
                :rows="currLimit"
                :totalRecords="invoiceStore.pagination.total"
                :rowsPerPageOptions="[10, 20, 50, 100]"
                @page="onPaginationAction"
            />
        </template>
    </PageContainer>
</template>


<style scoped lang="scss">
.invoice-list,
.invoice-list-empty {
    margin-top: var(--space-xl);
}
</style>
