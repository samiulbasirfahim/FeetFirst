import { useLanguageStore } from "@/store/language";
import { ScrollView, StyleSheet, View } from "react-native";
import Markdown from "react-native-markdown-display";

const policy = {
  de: `# Datenschutzhinweis – Nutzung der FeetF1rst App
  
  # Stand: 29. Juli 2025
  
  
  
  Die FeetF1rst App verarbeitet personenbezogene Daten, einschließlich biometrischer Fußdaten, ausschließlich im Einklang mit der Datenschutz-Grundverordnung (DSGVO) und anderen geltenden Datenschutzgesetzen. Wir legen großen Wert auf Transparenz und informieren Sie hier umfassend über die Verarbeitung Ihrer Daten.
  
  
  
  ## 1. Zweck und Rechtsgrundlage der Datenverarbeitung
  
  Wir verarbeiten Ihre personenbezogenen Daten ausschließlich für folgende Zwecke:
  
  * Erstellung und Speicherung Ihres 3D-Fußscans (biometrische Daten) zur Ermittlung passgenauer Schuhempfehlungen
  
  * Nutzung dieser Daten für die Bestellung von Maßschuhen und maßgefertigten Einlagen
  
  * Bereitstellung personalisierter Produktempfehlungen auf Basis Ihrer Scan-Ergebnisse
  
  
  
  Die Verarbeitung erfolgt auf folgenden Rechtsgrundlagen:
  
  * Art. 6 Abs. 1 lit. a DSGVO: Ihre Einwilligung für personenbezogene Daten
  
  * Art. 9 Abs. 2 lit. a DSGVO: Ihre ausdrückliche Einwilligung für biometrische Daten (3D-Fußscan)
  
  * Art. 6 Abs. 1 lit. b DSGVO: Vertragserfüllung bei Bestellungen
  
  * Art. 6 Abs. 1 lit. c DSGVO: Erfüllung gesetzlicher Pflichten (z. B. steuerrechtliche Aufbewahrung)
  
  
  
  ## 2. Datenweitergabe an Dritte
  
  Ihre Daten werden nur in folgenden Fällen weitergegeben:
  
  * **Bestellungen:** Relevante Daten (z. B. 3D-Scan, Bestelldetails, Lieferadresse) werden ausschließlich an den Händler oder Partner übermittelt, bei dem Sie den Scan erstellt oder den Artikel bestellt haben.
  
  * **Technische Dienstleister/IT-Hosting:** Wir setzen für Betrieb und Speicherung DSGVO-konforme Hosting-Dienstleister innerhalb der EU ein. Sofern Cloud-Dienste außerhalb der EU genutzt werden, erfolgt die Übermittlung ausschließlich unter geeigneten Garantien (Standardvertragsklauseln/EU-US Data Privacy Framework).
  
  * **Zahlungsdienstleister:** Bei Bestellungen werden Zahlungsdaten direkt an den von Ihnen gewählten Zahlungsdienstleister (z. B. PayPal, Klarna) übermittelt; FeetF1rst speichert selbst keine Zahlungsinformationen.
  
  * **Gesetzliche Verpflichtungen:** Wenn wir gesetzlich zur Herausgabe verpflichtet sind.
  
  
  
  Es erfolgt keine kommerzielle Weitergabe oder der Verkauf Ihrer Daten.
  
  
  
  ## 3. Datenübermittlung in Drittländer
  
  Ihre Daten werden grundsätzlich innerhalb der EU/des EWR verarbeitet. Sollte in Ausnahmefällen eine Übertragung in ein Drittland erforderlich sein (z. B. für Cloud-Services), erfolgt diese ausschließlich unter Einhaltung der Vorgaben der Art. 44 ff. DSGVO, z. B. durch EU-Standardvertragsklauseln oder das EU-US Data Privacy Framework.
  
  
  
  ## 4. Speicherung und Löschung
  
  Ihre Daten und Ihr 3D-Scan bleiben in Ihrem Konto gespeichert, bis Sie diese löschen oder Ihr Konto schließen. Sie können jederzeit über die App-Einstellungen unter „Account löschen" Ihr Konto und alle gespeicherten Daten löschen. Nach Löschung werden alle personenbezogenen und biometrischen Daten entfernt, außer gesetzlich vorgeschriebene Aufbewahrungen (z. B. Rechnungsdaten bis 10 Jahre gem. §§ 147 AO, 257 HGB).
  
  
  
  ## 5. Datensicherheit
  
  Wir setzen umfassende technische und organisatorische Maßnahmen ein, um Ihre Daten zu schützen, darunter:
  
  * TLS/SSL-verschlüsselte Datenübertragung
  
  * AES-verschlüsselte Speicherung biometrischer Daten
  
  * rollenbasierte Zugriffskontrollen
  
  * regelmäßige Sicherheitsprüfungen und Backups nach dem Stand der Technik
  
  
  
  ## 6. Rechte der betroffenen Personen (DSGVO)
  
  Sie haben jederzeit das Recht auf:
  
  * Auskunft (Art. 15 DSGVO)
  
  * Berichtigung (Art. 16 DSGVO)
  
  * Löschung („Recht auf Vergessenwerden") (Art. 17 DSGVO)
  
  * Einschränkung der Verarbeitung (Art. 18 DSGVO)
  
  * Datenübertragbarkeit (Art. 20 DSGVO)
  
  * Widerspruch (Art. 21 DSGVO)
  
  * Widerruf einer Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)
  
  * Beschwerderecht bei der zuständigen Aufsichtsbehörde (Art. 77 DSGVO)
  
  
  
  Diese Rechte können Sie direkt in der App oder per E-Mail an info@feetf1rst.com ausüben.
  
  
  
  ## 7. Freiwilligkeit der Bereitstellung
  
  Die Angabe Ihrer personenbezogenen Daten und Ihres 3D-Fußscans ist freiwillig, jedoch notwendig, um die Kernfunktionen der App (Schuhauswahl, Maßanfertigungen) zu nutzen. Ohne Einwilligung ist die Nutzung dieser Funktionen nicht möglich.
  
  
  
  ## 8. Einwilligung zur Verarbeitung biometrischer Daten
  
  Die Verarbeitung Ihres 3D-Fußscans (biometrische Daten) erfolgt ausschließlich nach Ihrer ausdrücklichen Einwilligung:
  
  
  
  *„Hiermit willige ich ausdrücklich in die Verarbeitung meines 3D-Fußscans (biometrische Daten, besondere Kategorie personenbezogener Daten) sowie meiner personenbezogenen Daten gemäß der Datenschutzerklärung ein."*
  
  
  
  Diese Einwilligung ist freiwillig, kann jederzeit in der App oder per E-Mail widerrufen werden und ist Voraussetzung für die Nutzung der App-Funktionen.
  
  
  
  ## 9. Keine automatisierte Entscheidungsfindung
  
  Es findet keine automatisierte Entscheidungsfindung im Sinne von Art. 22 DSGVO statt. Schuh-Empfehlungen basieren zwar auf Ihrem Scan, dienen aber ausschließlich der Beratung und haben keine rechtliche Wirkung.
  
  
  
  ## 11. Verantwortlicher und Kontakt
  
  **FeetF1rst S.R.L.S.**  
  
  Via Pipen 5  
  
  39031 San Giorgio (BZ), Italien  
  
  E-Mail: info@feetf1rst.com  
  
  Telefon: +39 366 508 7742`,

  it: `# Informativa sulla privacy – Utilizzo dell'app FeetF1rst
  
  *Aggiornato al: 29 luglio 2025*
  
  
  
  L'app FeetF1rst elabora **dati personali**, inclusi dati biometrici del piede, esclusivamente in conformità con il **Regolamento Generale sulla Protezione dei Dati (GDPR)** e altre leggi applicabili sulla protezione dei dati. Diamo grande importanza alla trasparenza e vi informiamo qui in modo completo sul trattamento dei vostri dati.
  
  
  
  ## 1. Scopo e base giuridica del trattamento dei dati
  
  Trattiamo i vostri dati personali esclusivamente per i seguenti scopi:
  
  * Creazione e memorizzazione della scansione 3D del piede (dati biometrici) per determinare raccomandazioni di calzature su misura
  
  * Utilizzo di questi dati per l'ordine di scarpe su misura e plantari personalizzati
  
  * Fornitura di raccomandazioni sui prodotti personalizzate basate sui risultati della scansione
  
  
  
  Il trattamento avviene sulle seguenti basi giuridiche:
  
  * Art. 6 co. 1 lett. a GDPR: Il vostro consenso ai dati personali
  
  * Art. 9 co. 2 lett. a GDPR: Il vostro consenso esplicito ai dati biometrici (scansione 3D del piede)
  
  * Art. 6 co. 1 lett. b GDPR: Adempimento del contratto per gli ordini
  
  * Art. 6 co. 1 lett. c GDPR: Adempimento di obblighi legali (es. conservazione fiscale)
  
  
  
  ## 2. Trasferimento dei dati a terzi
  
  I vostri dati vengono trasferiti solo nei seguenti casi:
  
  * **Ordini:** I dati rilevanti (es. scansione 3D, dettagli dell'ordine, indirizzo di consegna) vengono trasmessi esclusivamente al rivenditore o partner presso cui è stata effettuata la scansione o l'ordine.
  
  * **Fornitori tecnici/hosting IT:** Utilizziamo fornitori di hosting conformi al GDPR all'interno dell'UE per il funzionamento e la memorizzazione. Se vengono utilizzati servizi cloud al di fuori dell'UE, la trasmissione avviene esclusivamente con garanzie appropriate (clausole contrattuali standard/EU-US Data Privacy Framework).
  
  * **Fornitori di servizi di pagamento:** Per gli ordini, i dati di pagamento vengono trasmessi direttamente al fornitore di servizi di pagamento scelto (es. PayPal, Klarna); FeetF1rst non memorizza informazioni di pagamento.
  
  * **Obblighi legali:** Quando siamo legalmente obbligati alla divulgazione.
  
  
  
  Non avviene alcuna cessione commerciale o vendita dei vostri dati.
  
  
  
  ## 3. Trasferimento dei dati in paesi terzi
  
  I vostri dati vengono trattati principalmente all'interno dell'UE/SEE. Qualora fosse necessario un trasferimento in un paese terzo in casi eccezionali (es. per servizi cloud), questo avviene esclusivamente nel rispetto delle disposizioni degli artt. 44 ss. GDPR, ad esempio attraverso clausole contrattuali standard UE o l'EU-US Data Privacy Framework.
  
  
  
  ## 4. Conservazione e cancellazione
  
  I vostri dati e la vostra scansione 3D rimangono memorizzati nel vostro account fino a quando non li cancellate o chiudete il vostro account. Potete cancellare in qualsiasi momento il vostro account e tutti i dati memorizzati tramite le impostazioni dell'app sotto "Elimina account". Dopo la cancellazione, tutti i dati personali e biometrici vengono rimossi, eccetto le conservazioni legalmente prescritte (es. dati di fatturazione fino a 10 anni secondo §§ 147 AO, 257 HGB).
  
  
  
  ## 5. Sicurezza dei dati
  
  Implementiamo misure tecniche e organizzative complete per proteggere i vostri dati, tra cui:
  
  * Trasmissione dati crittografata TLS/SSL
  
  * Memorizzazione crittografata AES dei dati biometrici
  
  * controlli di accesso basati sui ruoli
  
  * controlli di sicurezza regolari e backup secondo lo stato dell'arte
  
  
  
  ## 6. Diritti degli interessati (GDPR)
  
  Avete sempre il diritto di:
  
  * Accesso (Art. 15 GDPR)
  
  * Rettifica (Art. 16 GDPR)
  
  * Cancellazione ("diritto all'oblio") (Art. 17 GDPR)
  
  * Limitazione del trattamento (Art. 18 GDPR)
  
  * Portabilità dei dati (Art. 20 GDPR)
  
  * Opposizione (Art. 21 GDPR)
  
  * Revoca del consenso con effetto per il futuro (Art. 7 co. 3 GDPR)
  
  * Diritto di reclamo presso l'autorità di controllo competente (Art. 77 GDPR)
  
  
  
  Potete esercitare questi diritti direttamente nell'app o via e-mail a info@feetf1rst.com.
  
  
  
  ## 7. Volontarietà della fornitura
  
  La fornitura dei vostri dati personali e della vostra scansione 3D del piede è volontaria, ma necessaria per utilizzare le funzioni principali dell'app (selezione scarpe, produzioni su misura). Senza consenso, l'utilizzo di queste funzioni non è possibile.
  
  
  
  ## 8. Consenso al trattamento dei dati biometrici
  
  Il trattamento della vostra scansione 3D del piede (dati biometrici) avviene esclusivamente dopo il vostro consenso esplicito:
  
  
  
  *"Con la presente acconsento espressamente al trattamento della mia scansione 3D del piede (dati biometrici, categoria speciale di dati personali) nonché dei miei dati personali secondo l'informativa sulla privacy."*
  
  
  
  Questo consenso è volontario, può essere revocato in qualsiasi momento nell'app o via e-mail ed è prerequisito per l'utilizzo delle funzioni dell'app.
  
  
  
  ## 9. Nessun processo decisionale automatizzato
  
  Non avviene alcun processo decisionale automatizzato ai sensi dell'art. 22 GDPR. Le raccomandazioni di scarpe si basano sulla vostra scansione, ma servono esclusivamente per la consulenza e non hanno effetti legali.
  
  
  
  ## 11. Responsabile e contatto
  
  **FeetF1rst S.R.L.S.**  
  
  Via Pipen 5  
  
  39031 San Giorgio (BZ), Italia  
  
  E-Mail: info@feetf1rst.com  
  
  Telefono: +39 366 508 7742`,
};

// 2. Define your styles using StyleSheet
const styles = StyleSheet.create({
  body: {
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 40,
  },
  heading1: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  heading2: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  strong: {
    color: "#fff",
    fontWeight: "bold",
  },
  list_item: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 5,
    lineHeight: 22,
  },
  bullet_list: {
    marginLeft: 0,
  },

  date: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 15,
  },
});

export default function Screen() {
  const { isGerman } = useLanguageStore();

  const markdownStyles = {
    heading1: styles.heading1,
    heading2: styles.heading2,
    body: styles.paragraph,
    strong: styles.strong,
    list_item: styles.list_item,
    bullet_list: styles.bullet_list,
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Markdown style={markdownStyles}>
          {isGerman() ? policy.de : policy.it}
        </Markdown>
      </ScrollView>
    </View>
  );
}
