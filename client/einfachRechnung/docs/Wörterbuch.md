# Wörterbuch

### ZRE / PEPPOL

##### ZRE: 
- Senden von Rechnung an Behörden
##### PEPPOL: 
- Senden von Rechnungen an Firem (International)

**Beispiel:**
```js
function sendInvoice(invoice){
  if (invoice.receiver.type === "government"){
    return sendToZRE(invoice)
  }
  else if (invoice.receiver.type === "business"){
    return sendToPeppol(invoice)
  }
  else {
    return sendByEmail(invoice)
  }
}
```

# Umsatzsteuer (Mehrwertsteuer) / Vorsteuer

### Umsatzsteuer (Output Tax)
- Muss an das Finanzamt gezahlt werden.
- Von der Umsatzsteuer kann die Vorsteuer abgezogen werden.
### Vorsteuer (Input Tax)
- Wird dem Kaufpreis hinzugerechnet.

##### Umsatzsteuer-erklärung (monatlich oder jährlich)

- Alle gesammelten Einkommens- und gezahlte Umsatzsteuer an das Finanzamt senden, Beispiel:
	- eingenommene Umsatzsteuer (z. B. 95 €)
	- gezahlte Umsatzsteuer (z. B. 19 € → nennt man **Vorsteuer**)
- Finanzamt zieht von der eingenommenen Umsatzsteuer die Vorsteuer ab:
	- 95 € – 19 € = **76 €**
- 76 Euro müssen ans Finanzamt gezahlt werden.

**Beispiel (ohne Steuer):**
- Matierialkosten: 100 Euro (ohne Steuer).
- Verkaufte Arbeit: 500 Euro (ohne Steuer).
- Gewinn: 400 Euro.

**Beispiel (mit Steuer):
- Materialkosten: 119 Euro (inkl. 19% Steuer).
- Verkaufte Arbeit: 595 Euro (inkl. 19% Steuer).
- 95 Euro - 19 Euro = 76 Euro ans Finanzamt.

👉 Die Steuer taucht **dreimal auf auf dem Konto auf**:
1. beim Verkauf (+ 95) 
2. beim Einkauf (– 19)
3. bei der Zahlung -(95 - 19) also - 76 Euro

Nur die Differenz wird vom Konto an das Finanzamt gezahlt.
Weil man nur die Differenz zahlt, neutralisiert sich die gesamte Steuerbewegung auf dem Konto.

Daher: +95 -19 -(+95 -19) = 0


# Einkommenssteuer

- basiert auf dem **Gewinn**
- zahlt man privat ans Finanzamt
- progressiv (mehr Gewinn = mehr Steuern)

👉 das ist die „Hauptsteuer“

#  Gewerbesteuer

- fällt erst ab **24.500 € Gewinn/Jahr** an
- geht an die **Gemeinde**

👉 betrifft nur Gewerbetreibende (nicht Freiberufler)


---

