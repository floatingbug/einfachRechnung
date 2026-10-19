import { invoiceApi } from "../api";
import { mapInvoiceDtosToEntities } from "../mappers";


export async function getInvoices({
    page,
    limit,
    customerName,
    status,
    customerId,
    filter,
} = {}) {
    const query = new URLSearchParams();

    if (limit != null) {
        query.append("limit", String(limit));
    }

    if (page != null) {
        query.append("page", String(page));
    }

    if (customerName) {
        query.append("customerName", customerName);
    }

    if (status) {
        query.append("status", status);
    }

    if (customerId) {
        query.append("customerId", customerId);
    }

    if (filter?.length) {
        const filterString = filter
            .map(({ field, value }) => `${field}:${value}`)
            .join(",");

        query.append("filter", filterString);
    }

    const result = await invoiceApi.getInvoices({ query });

    if (!result.invoices) {
        return {
            invoices: [],
            pagination: null,
        };
    }

    return {
        invoices: mapInvoiceDtosToEntities(result.invoices),
        pagination: result.pagination,
    };
}
