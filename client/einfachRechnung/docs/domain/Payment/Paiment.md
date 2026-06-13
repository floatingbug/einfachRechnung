# Payment Entity

## Fields

- id
- invoiceId
- amount
- date
- method

## Payment Logic

- Invoice is "paid" if:
  - paidAmount >= grossTotal

- Invoice is "partial" if:
  - 0 < paidAmount < grossTotal

- Invoice is "unpaid" if:
  - paidAmount = 0