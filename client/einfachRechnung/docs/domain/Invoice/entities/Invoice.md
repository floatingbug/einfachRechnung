# Invoice Entity

### Fields

- id: String
- invoiceNumber: String
- customer: Customer
- items: InvoiceItem[]
- invoiceDate: Date
- dueDate: Date
- currency: String

### Customer

- name: String
- street: String
- city: String
- postalCode: String
- countryCode: String
- vatId: String
- email: String

### InvoiceItem

- name: String
- description: String
- quantity: Number
- unitPrice: Number
- taxRate: Number
- netTotal: Number
- taxAmount: Number
- grossTotal: Number