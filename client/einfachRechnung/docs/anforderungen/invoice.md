
### Quick Invoice

- User startet "Schnelle Rechnung"
- User wählt Kunde aus
- Falls Kunde existiert → weiter zu Positionen
- Falls Kunde nicht existiert → Kunde erstellen
- Danach Positionen erfassen
- Rechnungssumme berechnen
- Zahlungsziel festlegen
- Rechnung speichern
- Rechnung erhält Status "draft"
- User kann Rechnung senden
- Nach Versand erhält Rechnung Status "sent"


### Create Invoice

- User startet "Neue Rechnung"
- User erfasst Kundendaten
- Verkäuferdaten werden geladen
- User erfasst Positionen
- Steuern werden berechnet
- Nettosumme wird berechnet
- Bruttosumme wird berechnet
- Rechnungsdatum wird gesetzt
- Zahlungsziel wird gesetzt
- Rechnungsnummer wird erzeugt
- Rechnung speichern
- Rechnung erhält Status "draft"
- User kann Rechnung senden
- Nach Versand erhält Rechnung Status "sent"


### Send Invoice

- User öffnet Rechnung
- User wählt "Rechnung senden"
- PDF wird erzeugt
- Email wird vorbereitet
- Rechnung wird versendet
- Versanddatum speichern
- Rechnung erhält Status "sent"


### Send Reminder

- User öffnet offene Rechnung
- System prüft Fälligkeitsdatum
- User wählt "Mahnung senden"
- Mahnungsstufe bestimmen
- Mahnungsdatum setzen
- Mahnung erzeugen
- Mahnung versenden
- Rechnung erhält Mahnstatus


### Cancel Invoice

- User öffnet Rechnung
- User wählt "Rechnung stornieren"
- System prüft ob Rechnung bezahlt wurde
- Falls bezahlt:
    - Stornierung nicht erlaubt
- Falls nicht bezahlt:
    - Rechnung erhält Status "cancelled"


### Invoice List Management

- User öffnet Rechnungsliste
- System lädt Rechnungen
- User filtert nach Status
- User filtert nach Zahlungsstatus
- User sucht nach Kunde
- User sortiert Rechnungen
- User öffnet Rechnungsdetails


### Recurring Customer Invoice

- User öffnet bestehenden Kunden
- User startet neue Rechnung
- Kundendaten werden übernommen
- User ergänzt Positionen
- Rechnungssumme berechnen
- Rechnung speichern
- Rechnung senden


### Export Invoice PDF

- User öffnet Rechnung
- User wählt "PDF exportieren"
- PDF wird erzeugt
- PDF wird heruntergeladen