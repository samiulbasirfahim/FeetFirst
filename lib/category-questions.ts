import { QuestionCategory, QuestionsMap } from "@/type/category-question";

const cyclingShoes: QuestionCategory = [
    {
        question: {
            eng: "cycling-shoes_welche_passform_bevorzugst_du?",
            it: "Quale vestibilità preferisci?",
            de: "Welche Passform bevorzugst du?",
        },
        why_important: {
            it: "Perché è importante? La calzata influisce su stabilità, controllo, comfort e prestazioni. Una calzata più aderente offre maggiore precisione e trasmissione di forza, una calzata equilibrata combina comfort e performance, mentre una calzata più ampia offre spazio e comfort per percorsi lunghi.",
            de: "Warum ist die Passform wichtig? Sie beeinflusst Stabilität, Kontrolle, Komfort und Leistung. Eine engere Passform ermöglicht höhere Präzision und bessere Kraftübertragung, eine ausgewogene Passform vereint Komfort und Leistung, während eine lockerere Passform Platz und Komfort für lange Läufe bietet.",
        },
        options: [
            {
                eng: "enge,_sportliche_passform_(maximale_kraftübertragung)",
                it: "Calzata aderente e sportiva (massima trasmissione della forza)",
                de: "Enge, sportliche Passform (maximale Kraftübertragung)",
            },
            {
                eng: "ausgewogene_passform_(kombination_aus_performance_und_komfort)",
                it: "Calzata equilibrata (combinazione di performance e comfort)",
                de: "Ausgewogene Passform (Kombination aus Performance und Komfort)",
            },
            {
                eng: "bequeme_passform_(mehr_platz_und_komfort_für_lange_fahrten)",
                it: "Calzata comoda (più spazio e comfort per distanze lunghe)",
                de: "Bequeme Passform (mehr Platz und Komfort für Lange Fahrten)",
            },
        ],
    },
    {
        question: {
            eng: "cycling-shoes_welche_art_von_radsport_betreibst_du?",
            it: "Che tipo di ciclismo pratichi?",
            de: "Welche Art von Radsport betreibst du?",
        },
        why_important: {
            de: `Warum wichtig?
Je nach Art des Radsports benötigt man unterschiedliche Radschuhe.
Rennradfahrer brauchen steife,          leichte Schuhe mit glatter Sohle für maximale Kraftübertragung.
Mountainbiker setzen auf griffige, robuste Schuhe mit Profilsohle für besseren Halt auf unebenem Gelände
Gravel-Fahrer benötigen eine Mischung aus beidem – steife Sohlen für Effizienz, aber mit genug Grip für verschiedene Untergründe.`,
            it: `Perché è importante? Il tipo di ciclismo determina quali scarpe sono più adatte: i ciclisti da strada richiedono scarpe rigide e leggere per una trasmissione di potenza ottimale, i mountain biker hanno bisogno di scarpe robuste con suola scolpita per maggiore aderenza sul terreno irregolare, mentre chi pratica gravel necessita di una combinazione di entrambi – suole rigide per l’efficienza e grip sufficiente per superfici variabili.`,
        },
        options: [
            {
                eng: "rennrad",
                it: "Strada",
                de: "Rennrad",
            },
            {
                eng: "mountainbike",
                it: "Mountain bike",
                de: "Mountainbike",
            },
            {
                eng: "gravel",
                it: "Gravel",
                de: "Gravel",
            },
        ],
    },
    {
        question: {
            eng: "cycling-shoes_welche_art_von_pedalen_benutzt_du?",
            it: "Che tipo di pedali utilizzi?",
            de: "Welche Art von Pedalen benutzt du?",
        },
        why_important: {
            de: `Warum wichtig?
Je nach Pedaltyp benötigt man unterschiedliche Radschuhe.
Klickpedale erfordern spezielle Schuhe mit Cleats für eine feste Verbindung und effiziente Kraftübertragung.
Plattformpedale passen zu Schuhen mit griffiger, flexibler Sohle für mehr Bewegungsfreiheit.
Hybridpedale kombinieren beide Optionen und erfordern Schuhe, die sowohl mit Cleats als auch mit normalen Sohlen komfortabel sind.
            `,
            it: `Il tipo di pedale determina quali scarpe sono necessarie: i pedali a sgancio rapido richiedono scarpe con tacchette per un trasferimento di potenza efficiente; i pedali flat si abbinano a scarpe con suole più flessibili per maggiore libertà di movimento; i pedali ibridi permettono l’uso sia con tacchette sia con suole normali.`,
        },
        options: [
            {
                eng: "klickpedale",
                it: "Pedali a sgancio rapido (Klickpedale)",
                de: "Klickpedale",
            },
            {
                eng: "plattformpedale",
                it: "Pedali flat (Plattformpedale)",
                de: "Plattformpedale",
            },
            {
                eng: "hybridpedale",
                it: "Pedali ibridi",
                de: "Hybridpedale",
            },
        ],
    },
    {
        question: {
            eng: "cycling-shoes_welcher_steifigkeitsindex_passt_zu_dir?",
            it: "Quale indice di rigidità si adatta a te?",
            de: "Welcher Steifigkeitsindex passt zu dir?",
        },
        why_important: {
            it: `La rigidità della suola determina quanta potenza trasferisci al pedale e quanto comfort hai sulle lunghe distanze. Valori più bassi (5–7) sono più morbidi e confortevoli; valori alti (11–15) offrono massima efficienza ma meno comfort; un valore medio (8–10) offre un buon equilibrio tra prestazioni e comodità.`,
            de: `Warum wichtig?
Die Steifigkeit der Sohle bestimmt, wie effizient du Kraft aufs Pedal überträgst und wie bequem der Schuh auf langen Strecken ist. 
Lange Fahrten (Index 5–7):Weiche Sohlen sind bequemer, vermeiden Druckstellen und eignen sich gut, wenn du auch mal zu Fuß unterwegs bist. 
Wettkampf & Training (Index 11–15):Steife Sohlen übertragen mehr Kraft, sind ideal für Sprints und hohe Geschwindigkeiten, aber weniger komfortabel auf langen Strecken. 
Balance (Index 8–10):Ein mittlerer Wert bietet guten Komfort und trotzdem starke Leistung – perfekt für Touren und Training. 
💡 Was ist dir wichtiger: Komfort, Effizienz oder ein guter Mix?
            `,
        },
        options: [

            {
                eng: "5–7_–_mehr_flexibilität_und_komfort,_ideal_für_lange_touren_&_gehen.",
                it: "5–7 – Maggiore flessibilità e comfort, ideale per lunghe uscite e camminate.",
                de: "5–7 – Mehr Flexibilität und Komfort, ideal für lange Touren & Gehen.",
            },
            {
                eng: "8–10_–_perfekte_balance_zwischen_komfort_&_effizienz_für_training_&_rennen.",
                it: "8–10 – Perfetto equilibrio tra comfort ed efficienza per allenamento e gare.",
                de: "8–10 – Perfekte Balance zwischen Komfort & Effizienz für Training & Rennen.",
            },
            {
                eng: "11–15_–_maximale_kraftübertragung_für_wettkämpfe_&_explosive_sprints.",
                it: "11–15 – Massimo trasferimento di potenza per sprint e prestazioni esplosive.",
                de: "11–15 – Maximale Kraftübertragung für Wettkämpfe & explosive Sprints.",
            },
        ],
    },
    {
        question: {
            eng: "cycling-shoes_möchtest_du_mit_einer_individuell_angepassten_winsole_deine_performance_auf_das_nächste_level_heben?",
            it: "Vuoi migliorare le tue prestazioni con una soletta personalizzata?",
            de: "Möchtest du mit einer individuell angepassten Winsole deine Performance auf das nächste Level heben?",
        },

        why_important: {
            it: `Una soletta personalizzata ottimizza il trasferimento di potenza, aumenta la stabilità e riduce l’affaticamento — ideale per ottenere il massimo dal tuo stile di guida.`,
            de: `Eine individuell angepasste Winsole verbessert die Kraftübertragung, stabilisiert den Fuß und reduziert Ermüdung. Dadurch kannst du effizienter fahren, bessere Kontrolle behalten und langfristig deine Leistung steigern.`,
        },

        options: [
            {
                eng: "ja,_für_optimale_kraftübertragung_und_bestleistung",
                it: "Sì, per una trasmissione di potenza ottimale e migliori prestazioni",
                de: "Ja, für optimale Kraftübertragung und Bestleistung",
            },
            {
                eng: "nein",
                it: "No",
                de: "Nein",
            },
        ],
    },
];

const casualShoes: QuestionCategory = [
    {
        question: {
            eng: "casual-sneaker_welche_alltagsschuhe_suchen_sie",
            it: "Che tipo di scarpe quotidiane sta cercando?",
            de: "Welche Alltagsschuhe suchen sie?",
        },
        options: [
            {
                eng: "sneaker",
                it: "Sneaker",
                de: "Sneaker",
            },
            {
                eng: "anzugsschuhe",
                it: "Scarpe eleganti",
                de: "Anzugsschuhe",
            },
            {
                eng: "sportschuhe",
                it: "Scarpe sportive",
                de: "Sportschuhe",
            },
            {
                eng: "sandalen",
                it: "Sandali",
                de: "Sandalen",
            },
            {
                eng: "arbeitsschuhe",
                it: "Scarpe da lavoro",
                de: "Arbeitsschuhe",
            },
            {
                eng: "bequemschuhe",
                it: "Scarpe comode",
                de: "Bequemschuhe",
            },
        ],
    },
    {
        question: {
            eng: "casual-sneaker_wie_bevorzugen_sie_ihre_schuhe_zu_tragen",
            it: "Come preferisce indossare le sue scarpe?",
            de: "Wie bevorzugen Sie Ihre Schuhe zu tragen?",
        },
        options: [
            {
                eng: "die_perfekt_empfohlene_passform_basierend_auf_meinem_3d-scan",
                it: "La calzata perfetta consigliata in base alla mia scansione 3D",
                de: "Die perfekt empfohlene Passform basierend auf meinem 3D-Scan",
            },
            {
                eng: "eher_enger_da_ich_meine_schuhe_gern_fest_am_fuß_trage",
                it: "Più aderente, perché mi piace che la scarpa stia ben ferma sul piede",
                de: "Eher enger, da ich meine Schuhe gern fest am Fuß trage",
            },
            {
                eng: "eher_weiter_da_ich_mehr_bewegungsfreiheit_bevorzuge",
                it: "Più ampia, perché preferisco maggiore libertà di movimento",
                de: "Eher weiter, da ich mehr Bewegungsfreiheit bevorzuge",
            },
        ],
    },
    {
        question: {
            eng: "casual-sneaker_sind_sie_im_besitz_einer_orthopädischen_einlage",
            it: "Possiede già un plantare ortopedico?",
            de: "Sind Sie im Besitz einer Orthopädischen Einlage?",
        },
        options: [
            {
                eng: "ja",
                it: "Sì",
                de: "Ja",
            },
            {
                eng: "nein",
                it: "No",
                de: "Nein",
            },
            {
                eng: "in_planung",
                it: "In programma",
                de: "in Planung",
            },
        ],
    },
];

const mountainTrekkingShoes: QuestionCategory = [
    {
        question: {
            eng: "mountain-trekking-shoes_wie_bevorzugen_sie_ihre_bergschuhe_zu_tragen",
            it: "Come preferisci indossare le tue scarpe da montagna?",
            de: "Wie bevorzugen Sie Ihre Bergschuhe zu tragen?",
        },
        why_important: {
            de: `Warum wichtig?
Der Untergrund, auf dem der Schuh genutzt wird, beeinflusst die Wahl des richtigen Modells.
Waldwege & befestigte Wege sind ideal für Spaziergänge und leichtes Gelände.
Felsiges & unebenes Gelände erfordert stabilen Halt für anspruchsvolle Trails und Bergtouren.
Dorf & Stadt bedeutet meist asphaltierte Straßen und Gehwege, wo Komfort und Dämpfung wichtig sind.
Kletterpassagen & Hochtouren verlangen eine besonders steife Sohle, um auf kleinen Tritten sicheren Halt zu bieten. Steigeisen-Kompatibilität, ein hoher Schaft für Knöchelstabilität und wetterfeste Materialien sind hier essenziell, um extreme Bedingungen zu meistern.++`,
            it: `Il tipo di terreno su cui utilizzi le scarpe influenza la scelta del modello giusto. Sentieri boschivi e percorsi facili si adattano a modelli leggeri e comodi. Terreni rocciosi e irregolari richiedono invece maggiore stabilità per affrontare salite e discese impegnative. In città o nei paesi l’ammortizzazione è importante per camminare su superfici dure. Passaggi tecnici o vie ferrate necessitano di una suola rigida per garantire stabilità sui piccoli appoggi. Per le alte vie servono compatibilità con i ramponi, buona protezione della caviglia e materiali resistenti alle intemperie.`,
        },

        options: [
            {
                eng: "normale_passform_ideal_für_alltag_und_leichtere_touren",
                it: "Calzata normale – Ideale per l’uso quotidiano e itinerari più semplici",
                de: "Normale Passform – Ideal für Alltag und leichtere Touren.",
            },
            {
                eng: "etwas_weiter_für_bergtouren_im_gebirge_oder_wenn_du_bewusst_mehr_platz_z_b_für_dicke_socken_wünschst",
                it: "Un po’ più ampia – Per escursioni in quota o se vuoi più spazio, ad esempio per calze spesse",
                de: "Etwas weiter – für Bergtouren im Gebirge oder wenn du bewusst mehr Platz, z. B. für dicke Socken, wünschst.",
            },
        ],
    },
    {
        question: {
            eng: "mountain-trekking-shoes_auf_welchem_untergrund_werden_sie_den_schuh_hauptsächlich_nutzen",
            it: "Su quale tipo di terreno utilizzerai principalmente la scarpa?",
            de: "Auf welchem Untergrund werden Sie den Schuh hauptsächlich nutzen?",
        },
        why_important: {
            de: `Warum wichtig?  
Die Wahl der richtigen Schafthöhe beeinflusst Komfort, Stabilität und Sicherheit.
Ein hoher Schaft schützt vor Umknicken und gibt Halt in unwegsamem Gelände, während ein niedriger Schaft mehr Bewegungsfreiheit bietet.`,
            it: `La scelta dell’altezza del gambale influenza comfort, stabilità e sicurezza. Un gambale alto protegge meglio da distorsioni e offre più sostegno su terreni irregolari, mentre un gambale basso garantisce maggiore libertà di movimento.`,
        },

        options: [
            {
                eng: "alltag_leichte_wege_stadt_oder_einfache_spaziergänge",
                it: "Uso quotidiano & sentieri facili – Città o passeggiate leggere",
                de: "Alltag & leichte Wege – Stadt oder einfache Spaziergänge",
            },
            {
                eng: "normale_bergtouren_wald-_und_bergwege_auch_uneben",
                it: "Escursioni normali – Sentieri nel bosco o di montagna, anche irregolari",
                de: "Normale Bergtouren – Wald- und Bergwege, auch uneben",
            },
            {
                eng: "hochtouren_alpines_gelände_felsig_steil_oder_hochalpin",
                it: "Alta montagna & terreno alpino – Roccioso, ripido o d’alta quota",
                de: "Hochtouren & alpines Gelände – felsig, steil oder hochalpin",
            },
        ],
    },
    {
        question: {
            eng: "mountain-trekking-shoes_welche_schafthöhe_bevorzugen_sie",
            it: "Quale altezza del gambale preferisci?",
            de: "Welche Schafthöhe bevorzugen Sie?",
        },
        why_important: {
            de: `Warum wichtig?
Die Wahl der Wasserdichtigkeit beeinflusst den Tragekomfort und die Funktionalität.
Schuhe mit wasserdichter Membran (z. B. Gore-Tex®) halten die Füße trocken, sind aber weniger atmungsaktiv.
Atmungsaktive, nicht wasserdichte Schuhe bieten bessere Belüftung und eignen sich für trockene Bedingungen.
Wenn es keine entscheidende Rolle spielt, kommt es auf das bevorzugte Einsatzgebiet und persönliche Vorlieben an.`,
            it: `La scelta del livello di impermeabilità influisce sul comfort e sulla funzionalità della scarpa. Le scarpe con membrana impermeabile (ad es. Gore-Tex®) mantengono i piedi asciutti ma sono meno traspiranti. Le scarpe traspiranti e non impermeabili offrono una migliore ventilazione e sono adatte a condizioni asciutte. Se l’impermeabilità non è un fattore decisivo, conta soprattutto l’uso previsto e le preferenze personali.`,
        },

        options: [
            {
                eng: "high-cut_maximaler_halt_und_knöchelschutz_für_schwieriges_gelände",
                it: "High-Cut – Massima stabilità e protezione della caviglia per terreni difficili",
                de: "High-Cut – Maximaler Halt und Knöchelschutz für schwieriges Gelände.",
            },
            {
                eng: "mid-cut_gute_balance_aus_beweglichkeit_und_halt_für_vielseitige_touren",
                it: "Mid-Cut – Buon equilibrio tra mobilità e sostegno per percorsi versatili",
                de: "Mid-Cut – Gute Balance aus Beweglichkeit und Halt für vielseitige Touren.",
            },
            {
                eng: "low-cut_leicht_und_flexibel_für_schnelle_einfache_wege",
                it: "Low-Cut – Leggere e flessibili per camminate semplici e veloci",
                de: "Low-Cut – Leicht und flexibel für schnelle, einfache Wege.",
            },
        ],
    },
    {
        question: {
            eng: "mountain-trekking-shoes_soll_der_schuh_wasserdicht_sein",
            it: "La scarpa deve essere impermeabile?",
            de: "Soll der Schuh wasserdicht sein?",
        },
        why_important: {
            de: `Warum wichtig?
Das richtige Gleichgewicht zwischen Gewicht und Komfort beeinflusst Ihre Performance und Ihr Wohlbefinden.
Leichte & flexible Schuhe sind ideal für lange Touren mit hoher Beweglichkeit.
Robuste & stabile Schuhe bieten maximalen Halt und Schutz auf anspruchsvollem Gelände.
Eine ausgewogene Option kombiniert Komfort und Stabilität für vielseitige Einsätze.`,
            it: `Il giusto equilibrio tra peso e comfort influisce sulle tue prestazioni e sul benessere. Scarpe leggere e flessibili sono ideali per lunghe escursioni con molta mobilità. Scarpe robuste e stabili offrono massimo sostegno e protezione su terreni impegnativi. Un’opzione equilibrata combina comfort e stabilità per utilizzi versatili.`,
        },

        options: [
            {
                eng: "spielt_keine_entscheidende_rolle",
                it: "Non ha un ruolo decisivo",
                de: "Spielt keine entscheidende Rolle",
            },
            {
                eng: "atmungsaktive_nicht_wasserdichte_schuhe",
                it: "Scarpe traspiranti e non impermeabili",
                de: "Atmungsaktive, nicht wasserdichte Schuhe",
            },
            {
                eng: "wasserdichte_membran_z_b_gore-tex",
                it: "Membrana impermeabile (es. Gore-Tex®)",
                de: "Wasserdichte Membran (z. B. Gore-Tex®)",
            },
        ],
    },
];

const golfShoes: QuestionCategory = [
    {
        question: {
            eng: "golf-shoes_wie_bevorzugen_sie_ihre_schuhe_zu_tragen",
            it: "Wie bevorzugen Sie Ihre Schuhe zu tragen?",
            de: "Wie bevorzugen Sie Ihre Schuhe zu tragen?",
        },
        options: [
            {
                eng: "die_perfekt_empfohlene_golfschuh-passform_basierend_auf_meinem_3d-scan",
                it: "Die perfekt empfohlene Golfschuh-Passform basierend auf meinem 3D-Scan",
                de: "Die perfekt empfohlene Golfschuh-passform basierend auf meinem 3D-Scan",
            },
            {
                eng: "eher_enger_da_ich_meine_schuhe_gern_fest_am_fuß_trage",
                it: "Eher enger, da ich meine Schuhe gern fest am Fuß trage",
                de: "Eher enger, da ich meine Schuhe gern fest am Fuß trage",
            },
            {
                eng: "eher_weiter_da_ich_mehr_bewegungsfreiheit_bevorzuge",
                it: "Eher weiter, da ich mehr Bewegungsfreiheit bevorzuge",
                de: "Eher weiter, da ich mehr Bewegungsfreiheit bevorzuge",
            },
        ],
    },
    {
        question: {
            eng: "golf-shoes_spikes_oder_spikeless_welcher_sohlen-typ_benötigst_du",
            it: "Spikes o spikeless – Quale tipo di suola ti serve?",
            de: "Spikes oder Spikeless – Welcher Sohlen-Typ benötigst du?",
        },
        why_important: {
            de: `Warum wichtig?
Spikes bieten besseren Halt bei Regen oder Hanglagen, da sie sich in den Boden graben und mehr Stabilität geben. Besonders bei feuchtem oder rutschigem Untergrund sind sie vorteilhaft.
Spikeless-Schuhe hingegen sind vielseitiger, bieten mehr Flexibilität und Komfort und können auch abseits des Platzes oder im Clubhaus getragen werden, ohne gewechselt werden zu müssen.`,
            it: `Le scarpe con spikes offrono maggiore trazione sotto la pioggia o sui terreni in pendenza, perché penetrano nel terreno e garantiscono più stabilità. Le spikeless sono invece più versatili, offrono maggiore flessibilità e comfort e possono essere indossate anche fuori dal campo o in clubhouse senza doverle cambiare.`,
        },

        options: [
            {
                eng: "spikeless",
                it: "Spikeless",
                de: "Spikeless",
            },
            {
                eng: "spikes",
                it: "Spikes",
                de: "Spikes",
            },
        ],
    },
    {
        question: {
            eng: "golf-shoes_wie_wichtig_sind_wasserdichtigkeit_und_atmungsaktivität_bei_deinen_golfschuhen",
            it: "Quanto sono importanti impermeabilità e traspirabilità nelle tue scarpe da golf?",
            de: "Wie wichtig sind Wasserdichtigkeit und Atmungsaktivität bei deinen Golfschuhen?",
        },
        why_important: {
            de: `Warum wichtig?
Wasserdichte Schuhe halten deine Füße bei Regen oder Morgentau zuverlässig trocken – gerade morgens auf dem Platz ein großer Vorteil.
Allerdings verringert maximale Wasserdichtigkeit meist die Atmungsaktivität. Eine gute Balance bietet Schutz und Komfort, aber nie beides zu 100 %. Wer vor allem bei warmem, trockenem Wetter spielt, ist mit atmungsaktiven, gut belüfteten Schuhen besser beraten.
💡 Entscheidend ist, bei welchem Wetter und zu welchen Tageszeiten du am häufigsten spielst.`,
            it: `Le scarpe impermeabili mantengono i piedi asciutti sotto la pioggia o con la rugiada del mattino, un grande vantaggio soprattutto all’inizio della giornata. Tuttavia, una massima impermeabilità riduce spesso la traspirabilità. Un buon equilibrio offre protezione e comfort, ma non garantisce mai il 100%. Chi gioca soprattutto con tempo caldo e asciutto è meglio servito con scarpe molto traspiranti e ben ventilate. Fondamentale è capire con che clima e in quali momenti della giornata giochi più spesso.`,
        },

        options: [
            {
                eng: "maximale_wasserdichtigkeit_weniger_atmungsaktivität",
                it: "Massima impermeabilità, minore traspirabilità",
                de: "Maximale Wasserdichtigkeit, weniger Atmungsaktivität",
            },
            {
                eng: "gute_balance_zwischen_wasserdicht_&_atmungsaktiv",
                it: "Buon equilibrio tra impermeabilità e traspirabilità",
                de: "Gute Balance zwischen wasserdicht & atmungsaktiv",
            },
            {
                eng: "keine_wasserdichtigkeit_nötig_maximale_belüftung",
                it: "Nessuna impermeabilità necessaria, massima ventilazione",
                de: "Keine Wasserdichtigkeit nötig, maximale Belüftung",
            },
        ],
    },
    {
        question: {
            eng: "golf-shoes_was_ist_dir_wichtiger_stabilität_oder_komfort",
            it: "Cosa è più importante per te: stabilità o comfort?",
            de: "Was ist dir wichtiger – Stabilität oder Komfort?",
        },
        why_important: {
            de: `Warum wichtig?
Golfschuhe beeinflussen deine Leistung und dein Wohlbefinden auf dem Platz.
Stabilität sorgt für sicheren Halt und maximale Kontrolle beim Schwung, besonders auf unebenem Gelände.
Komfort ist entscheidend für längere Runden, um Ermüdung und Druckstellen zu vermeiden.
Die richtige Wahl hängt davon ab, welcher Aspekt dir wichtiger ist.`,
            it: `Le scarpe da golf influenzano la tua performance e il tuo benessere in campo. La stabilità garantisce presa sicura e massimo controllo durante lo swing, soprattutto su terreni irregolari. Il comfort è fondamentale per le buone sensazioni durante le lunghe sessioni, evitando affaticamento e punti di pressione. La scelta giusta dipende da quale aspetto per te conta di più.`,
        },

        options: [
            {
                eng: "stabilität_sicherer_halt_&_maximale_kontrolle_beim_schwung",
                it: "Stabilità – Maggior controllo e sostegno durante lo swing",
                de: "Stabilität – Sicherer Halt & maximale Kontrolle beim Schwung",
            },
            {
                eng: "komfort_längere_runden",
                it: "Comfort – Ideale per sessioni più lunghe",
                de: "Komfort – Längere Runden ",
            },
        ],
    },
];

const basketballShoes: QuestionCategory = [
    {
        question: {
            eng: "basketball-shoes_wie_bevorzugen_sie_ihre_schuhe_zu_tragen",
            it: "Come preferisci indossare le tue scarpe?",
            de: "Wie bevorzugen Sie Ihre Schuhe zu tragen?",
        },
        options: [
            {
                eng: "die_perfekte_baskettball-schuhpassform_basierend_auf_meinen_3d-scan",
                it: "La calzata ideale della scarpa da basket basata sulla mia scansione 3D",
                de: "Die perfekte Baskettball-schuhpassform basierend auf meinen 3D-Scan",
            },
            {
                eng: "eher_enger_da_ich_meine_schuhe_gern_fest_am_fuß_trage",
                it: "Più aderente, perché mi piace avere la scarpa ben ferma al piede",
                de: "Eher enger, da ich meine Schuhe gern fest am Fuß trage",
            },
            {
                eng: "eher_weiter_da_ich_mehr_bewegungsfreiheit_bevorzuge",
                it: "Più ampia, perché preferisco maggiore libertà di movimento",
                de: "Eher weiter, da ich mehr Bewegungsfreiheit bevorzuge",
            },
        ],
    },

    {
        question: {
            eng: "basketball-shoes_traktion_&_grip_wie_ist_der_untergrund",
            it: "Traktion & Grip – Su quale superficie giochi principalmente?",
            de: "Traktion & Grip – Wie ist der Untergrund?",
        },
        why_important: {
            de: `Warum wichtig?
Der Untergrund beeinflusst die Traktion und Haltbarkeit deiner Basketballschuhe.
Indoor-Schuhe sind für Hallenböden optimiert, bieten maximale Haftung und vermeiden übermäßigen Abrieb.
Outdoor-Schuhe haben eine robustere Sohle, die besser auf rauen Oberflächen wie Asphalt oder Beton hält und länger widerstandsfähig bleibt.
Die Wahl der richtigen Sohle verbessert deine Beweglichkeit, Kontrolle und reduziert das Verletzungsrisiko.`  ,
            it: `La superficie influisce sulla trazione e sulla durata delle scarpe da basket.
Le scarpe indoor sono ottimizzate per i campi al chiuso, offrono la massima aderenza e riducono l’abrasione eccessiva.
Le scarpe outdoor hanno una suola più robusta, ideale per superfici come asfalto o cemento, e resistono più a lungo.
La scelta della suola corretta migliora mobilità, controllo e riduce il rischio di infortuni.` },
        options: [
            {
                eng: "indoor-halle",
                it: "Indoor – Pavimento in palestra",
                de: "Indoor-Halle",
            },
            {
                eng: "outdoor",
                it: "Outdoor – Asfalto/esterno",
                de: "Outdoor",
            },
        ],
    },
    {
        question: {
            eng: "basketball-shoes_brauchst_du_mehr_knöchelschutz_oder_mehr_bewegungsfreiheit",
            it: "Hai bisogno di maggiore protezione per la caviglia o preferisci più libertà di movimento?",
            de: "Brauchst du mehr Knöchelschutz oder mehr Bewegungsfreiheit?",
        },
        why_important: {
            de: `Warum wichtig?
High-Tops bieten mehr Knöchelstabilität und Schutz vor Umknicken.
Low-Tops ermöglichen hingegen mehr Beweglichkeit und Geschwindigkeit.
Mid-Tops bieten einen Kompromiss aus beidem.
Die Wahl beeinflusst dein Verletzungsrisiko und deine Bewegungsfreiheit.`,
            it: `Il livello di protezione influisce su stabilità, prestazioni e rischio di infortuni. Le High-Tops offrono più stabilità e riducono il rischio di distorsioni. Le Low-Tops garantiscono maggiore agilità e velocità nei movimenti. Le Mid-Tops rappresentano un equilibrio tra supporto e libertà di movimento.`,
        },
        options: [
            {
                eng: "viel_schutz_high-tops",
                it: "Tanta protezione (High-Tops)",
                de: "Viel Schutz (High-Tops)",
            },
            {
                eng: "balance_mid-tops",
                it: "Equilibrio (Mid-Tops)",
                de: "Balance (Mid-Tops)",
            },
            {
                eng: "bewegungsfreiheit_low-tops",
                it: "Massima libertà di movimento (Low-Tops)",
                de: "Bewegungsfreiheit (Low-Tops)",
            },
        ],
    },
];

const tennisShoes: QuestionCategory = [
    {
        question: {
            eng: "tennis-shoes_wie_bevorzugen_sie_ihre_schuhe_zu_tragen",
            it: "Come preferisci indossare le tue scarpe?",
            de: "Wie bevorzugen Sie Ihre Schuhe zu tragen?",
        },
        options: [
            {
                eng: "die_perfekte_tennisschuh-passform_basierend_auf__meinen_3d-scan",
                it: "La calzata perfetta consigliata in base alla mia scansione 3D",
                de: "Die perfekte Tennisschuh-passform basierend auf  meinen 3D-Scan",
            },
            {
                eng: "eher_enger_da_ich_meine_schuhe_gern_fest_am_fuß_trage",
                it: "Più aderente, perché preferisco una scarpa ben salda al piede",
                de: "Eher enger, da ich meine Schuhe gern fest am Fuß trage",
            },
            {
                eng: "eher_weiter_da_ich_mehr_bewegungsfreiheit_bevorzuge",
                it: "Più ampia, perché privilegio una maggiore libertà di movimento",
                de: "Eher weiter, da ich mehr Bewegungsfreiheit bevorzuge",
            },
        ],
    },

    {
        question: {
            eng: "tennis-shoes_auf_welchem_belag_spielen_sie_hauptsächlich",
            it: "Su quale superficie giochi principalmente??",
            de: "Auf welchem Belag spielen Sie hauptsächlich??",
        },
        why_important: {
            de: "Warum wichtig? Tennisschuhe sind für verschiedene Beläge optimiert. Ein falscher Schuh kann den Grip und die Stabilität beeinträchtigen.",
            it: "La superficie influisce sul tipo di suola necessario: un modello non adatto può ridurre grip, stabilità e durata.",
        },
        options: [
            {
                eng: "sandplatz_claycourt",
                it: "Terra rossa / Claycourt",
                de: "Sandplatz/Claycourt",
            },
            {
                eng: "hartplatz_allcourt",
                it: "Cemento / Allcourt",
                de: "Hartplatz/Allcourt",
            },
            {
                eng: "rasenplatz",
                it: "Erba",
                de: "Rasenplatz",
            },
        ],
    },

    {
        question: {
            eng: "tennis-shoes_ist_dir_performance_oder_langlebigkeit_wichtiger",
            it: "Cosa è per te più importante: performance o durata?",
            de: "Ist dir Performance oder Langlebigkeit wichtiger?",
        },
        why_important: {
            de: `Warum wichtig?
Ein leichter Schuh verbessert Geschwindigkeit und Wendigkeit, nutzt sich aber schneller ab.
Robuste Schuhe halten länger, sind aber oft schwerer.
Die Wahl hängt von deinem Spielstil und der Platznutzung ab.`,
            it: "La scelta influisce su velocità, stabilità e quanto a lungo la scarpa resiste all’usura.",
        },

        options: [
            {
                eng: "maximale_performance_leichter_agiler_schuh_für_schnelle_bewegungen",
                it: "Performance massima (Scarpa più leggera e agile per movimenti rapidi)",
                de: "Maximale Performance  (Leichter, agiler Schuh für schnelle Bewegungen)",
            },
            {
                eng: "langlebigkeit_&_strapazierfähigkeit_robustere_materialien_für_längere_haltbarkeit",
                it: "Durata & resistenza (Materiali più robusti per una maggiore longevità)",
                de: "Langlebigkeit & Strapazierfähigkeit (Robustere Materialien für längere Haltbarkeit)",
            },
        ],
    },
    {
        question: {
            eng: "tennis-shoes_wie_bewegst_du_dich_auf_dem_platz_am_meisten",
            it: "Come ti muovi principalmente in campo?",
            de: "Wie bewegst du dich auf dem Platz am meisten?",
        },
        why_important: {
            de: `Warum wichtig?
Die Bewegungsrichtung beeinflusst die Anforderungen an Stabilität und Dämpfung deiner Tennisschuhe.
Seitliche Bewegungen erfordern verstärkte Seitenstabilität, um Umknicken zu verhindern.
Häufige Sprints nach vorne und hinten profitieren von reaktionsfreudiger Dämpfung und Grip für schnelle Stopps.
Ein ausgewogener Mix erfordert eine Kombination aus beidem, um maximale Kontrolle und Komfort auf dem Platz zu gewährleisten.`,
            it: "La direzione dei movimenti influisce su stabilità, ammortizzazione e controllo della scarpa da tennis.",
        },
        options: [
            {
                eng: "seitlich_häufige_seitwärtsbewegungen",
                it: "Movimenti laterali frequenti",
                de: "Seitlich – Häufige Seitwärtsbewegungen",
            },
            {
                eng: "vor_&_zurück_viele_schnelle_sprints",
                it: "Scatti avanti & indietro",
                de: "Vor & zurück – Viele schnelle Sprints",
            },
            {
                eng: "beides_ein_guter_mix_aus_beiden",
                it: "Un mix equilibrato di entrambi",
                de: "Beides – Ein guter Mix aus beiden",
            },
        ],
    },
];

const skiBoots: QuestionCategory = [
    {
        question: {
            de: "Sind Sie Anfänger, Fortgeschrittener oder Experte?",
            it: "Sei principiante, intermedio o esperto?",
            eng: "ski-boots_sind_sie_anfänger_fortgeschrittener_oder_experte",

        },
        options: [
            {
                eng: "anfänger",
                it: "Principiante",
                de: "Anfänger",
            },
            {
                eng: "fortgeschrittener",
                it: "Intermedio",
                de: "Fortgeschrittener",
            },
            {
                eng: "experte",
                it: "Esperto",
                de: "Experte",
            },
        ],
    },
    {
        question: {
            de: "Möchten Sie ein Modell aus einer bestimmten Preisklasse?",
            it: "Vorrebbe un modello in una fascia di prezzo specifica?",
            eng: "ski-boots_möchten_sie_ein_modell_aus_einer_bestimmten_preisklasse",

        },
        options: [
            {
                eng: "budget_günstig_und_funktional",
                it: "Budget (economico e funzionale)",
                de: "Budget (günstig & funktional)",
            },
            {
                eng: "mittelklasse_ausgewogene_performance_und_komfort",
                it: "Fascia media (equilibrio tra prestazioni e comfort)",
                de: "Mittelklasse (ausgewogene Performance & Komfort)",
            },
            {
                eng: "premium_höchste_qualität_und_technologie",
                it: "Premium (massima qualità e tecnologia)",
                de: "Premium (höchste Qualität & Technologie)",
            },
        ],
    },
    {
        question: {
            de: "Was suchen Sie?",
            it: "Cosa sta cercando?",
            eng: "ski-boots_was_suchen_sie",

        },
        options: [
            {
                eng: "nur_skischuhe",
                it: "Solo scarponi da sci",
                de: "Nur Skischuhe",
            },
            {
                eng: "nur_ski",
                it: "Solo sci",
                de: "Nur Ski",
            },
            {
                eng: "komplettes_set_ski_und_skischuhe",
                it: "Set completo (sci e scarponi)",
                de: "Komplettes Set (Ski & Skischuhe)",
            },
        ],
    },
    {
        question: {
            de: "Wie eng soll der Skischuh sitzen?",
            it: "Quanto deve essere aderente lo scarpone da sci?",
            eng: "ski-boots_wie_eng_soll_der_skischuh_sitzen",

        },
        options: [
            {
                eng: "komfortabel_mehr_bewegungsfreiheit_wärmer",
                it: "Comodo (più libertà di movimento, più caldo)",
                de: "Komfortabel (mehr Bewegungsfreiheit, wärmer)",
            },
            {
                eng: "eng_anliegend_bessere_kontrolle_aber_weniger_bequem",
                it: "Aderente (maggior controllo, ma meno comfort)",
                de: "Eng anliegend (bessere Kontrolle, aber weniger bequem)",
            },
            {
                eng: "sehr_eng_maximale_performance_für_rennfahrer",
                it: "Molto stretto (massime prestazioni per sciatori agonisti)",
                de: "Sehr eng (maximale Performance für Rennfahrer)",
            },
        ],
    },
    {
        question: {
            de: "Welchen Flex bevorzugen Sie?",
            it: "Quale livello di flex preferisci?",
            eng: "ski-boots_welchen_flex_bevorzugen_sie",

        },
        options: [
            {
                eng: "weich_flex_60–90_komfortabel_für_einsteiger",
                it: "Morbido (Flex 60–90, confortevole per principianti)",
                de: "Weich (Flex 60–90, komfortabel für Einsteiger)",
            },
            {
                eng: "mittel_flex_90–110_ausgewogene_kontrolle",
                it: "Medio (Flex 90–110, controllo equilibrato)",
                de: "Mittel (Flex 90–110, ausgewogene Kontrolle)",
            },
            {
                eng: "hart_flex_120+_maximale_präzision_für_profis",
                it: "Rigido (Flex 120+, massima precisione per sciatori esperti)",
                de: "Hart (Flex 120+, maximale Präzision für Profis)",
            },
        ],
    },
    {
        question: {
            de: "Welche Körpergröße haben Sie?",
            it: "Qual è la sua altezza?",
            eng: "ski-boots_welche_körpergröße_haben_sie",

        },
        options: [
            {
                eng: "unter_160_cm",
                it: "Sotto i 160 cm",
                de: "Unter 160 cm",
            },
            {
                eng: "160-175_cm",
                it: "160-175 cm",
                de: "160-175 cm",
            },
            {
                eng: "176-190_cm",
                it: "176-190 cm",
                de: "176-190 cm",
            },
            {
                eng: "über_190_cm",
                it: "Oltre 190 cm",
                de: "Über 190 cm",
            }
        ],
    },
    {
        question: {
            de: "Wie viel wiegen Sie?",
            it: "Quanto pesa??",
            eng: "ski-boots_wie_viel_wiegen_sie",

        },
        options: [
            {
                eng: "unter_60_kg",
                it: "Sotto i 60 kg",
                de: "Unter 60 kg",
            },
            {
                eng: "60-75_kg",
                it: "60-75 kg",
                de: "60-75 kg",
            },
            {
                eng: "76-90_kg",
                it: "76-90 kg",
                de: "76-90 kg",
            },
            {
                eng: "über_90_kg",
                it: "Oltre 90 kg",
                de: "Über 90 kg",
            }
        ],
    },
    {
        question: {
            de: "Wie lang sollten Ihre Ski sein?",
            it: "Quanto dovrebbero essere lunghi i suoi sci?",
            eng: "ski-boots_wie_lang_sollten_ihre_ski_sein",

        },
        options: [
            {
                eng: "kurze_ski_leicht_zu_steuern_ideal_für_anfänger_und_enge_slalom-schwünge",
                it: "Sci corti – Facili da controllare, ideali per principianti e curve strette da slalom",
                de: "Kurze Ski – Leicht zu steuern, ideal für Anfänger und enge Slalom-Schwünge",
            },
            {
                eng: "mittellange_ski_gute_balance_zwischen_kontrolle_und_geschwindigkeit",
                it: "Sci di media lunghezza – Buon equilibrio tra controllo e velocità",
                de: "Mittellange Ski – Gute Balance zwischen Kontrolle und Geschwindigkeit",
            },
            {
                eng: "lange_ski_mehr_stabilität_bei_hoher_geschwindigkeit_für_erfahrene_skifahrer",
                it: "Sci lunghi – Maggiore stabilità ad alta velocità, per sciatori esperti",
                de: "Lange Ski – Mehr Stabilität bei hoher Geschwindigkeit, für erfahrene Skifahrer",
            },
        ],
    }

];

export const runningShoes = {
    initialQuestion: {
        question: {
            eng: "running-shoes_für_welchen_zweck_suchen_sie_die_laufschuhe?",
            it: "Per quale scopo stai cercando scarpe da running?",
            de: "Für welchen Zweck suchen Sie die Laufschuhe?",
        },
        why_important: {
            de: "Warum wichtig?Jede Laufdisziplin stellt unterschiedliche Anforderungen an deine Schuhe. Die richtige Wahl sorgt für optimalen Komfort, Leistung und Schutz vor Verletzungen. Je nach Einsatzzweck variieren Dämpfung, Stabilität, Gewicht und Sohlengrip, um dich bestmöglich zu unterstützen.",
            it: "Perché importante? Ogni disciplina della corsa richiede esigenze diverse alle scarpe. La scelta corretta garantisce comfort, prestazioni e protezione dagli infortuni. Ammortizzazione, stabilità, peso e grip della suola variano in base all’utilizzo.",
        },
        options: [
            {
                eng: "allrounder",
                it: "Allrounder",
                de: "Allrounder",
                nextQuestions: "allrounder",
            },
            {
                eng: "trailrunning_gelände",
                it: "Trailrunning (terreno)",
                de: "Trailrunning (Gelände)",
                nextQuestions: "trailrunning",
            },
            {
                eng: "lange_distanzen_dauerläufe",
                it: "Lunghe distanze / corse continue",
                de: "Lange Distanzen/Dauerläufe",
                nextQuestions: "longDistance",
            },
            {
                eng: "wettkampf_marathon",
                it: "Gara / maratona",
                de: "Wettkampf/Marathon",
                nextQuestions: "competition",
            },
            {
                eng: "intervallläufe_laufbahn",
                it: "Ripetute / pista",
                de: "Intervallläufe/Laufbahn",
                nextQuestions: "interval",
            },
            {
                eng: "walkingschuhe",
                it: "Scarpe da camminata",
                de: "Walkingschuhe",
                nextQuestions: "walking",
            },
        ],
    },

    allrounder: [
        {
            question: {
                eng: "running-shoes-allrounder_wie_bevorzugen_sie_ihre_allround_-_laufschuhe_zu_tragen",
                it: "Come preferisce indossare le sue scarpe da running Allround?",
                de: "Wie bevorzugen Sie Ihre Allround - Laufschuhe zu tragen?",
            },
            why_important: {
                de: "Allrounder – Vielseitige Laufschuhe, die für verschiedene Distanzen und Untergründe geeignet sind. Ideal für Freizeitläufer und regelmäßiges Training.",
                it: "Scarpe versatili, adatte a diverse distanze e superfici. Ideali per chi corre nel tempo libero e per allenamenti regolari.",
            },
            options: [
                {
                    eng: "die_perfekte_laufschuh-passform_basierend_auf_meinen_3d-scan",
                    it: "La calzata perfetta delle scarpe da corsa basata sulla mia scansione 3D",
                    de: "Die perfekte Laufschuh-passform basierend auf meinen 3D-Scan",
                },
                {
                    eng: "eher_weiter_da_ich_mehr_bewegungsfreiheit_bevorzuge",
                    it: "Più spazio, perché preferisco maggiore libertà di movimento",
                    de: "Eher weiter, da ich mehr Bewegungsfreiheit bevorzuge",
                },
                {
                    eng: "eher_enger_da_ich_meine_schuhe_gern_fest_am_fuß_trage",
                    it: "Più aderente, perché mi piace che le scarpe stiano ben salde al piede",
                    de: "Eher enger, da ich meine Schuhe gern fest am Fuß trage",
                },
            ],
        },
        {
            question: {
                eng: "running-shoes-allrounder_kennen_sie_ihren_fußtyp_oder_ihre_pronation",
                it: "Conosci il tuo tipo di piede o pronazione?",
                de: "Kennen Sie Ihren Fußtyp oder Ihre Pronation?",
            },
            why_important: {
                de: `Warum wichtig?
Fußtyp und Pronation bestimmen, wie dein Fuß aufsetzt – und welche Unterstützung du brauchst.
Ein Neutralfuß läuft am besten in flexiblen Schuhen. 
Bei Überpronation helfen Stabilitätsmodelle, das Einknicken nach innen zu kontrollieren. 
Unsere präzise Analyse – basierend auf deinen 3D-Scan – hilft dir, den passenden Schuh zu finden, der deine natürliche Bewegung unterstützt und Verletzungen vorbeugt.
`
            },
            options: [
                {
                    eng: "analyse_basierend_auf_meinem_3d-scan",
                    it: "Analisi basata sulla mia scansione 3D",
                    de: "Analyse basierend auf meinem 3D-Scan",
                },
                {
                    eng: "neutralfuß",
                    it: "Piede neutro",
                    de: "Neutralfuß",
                },
                {
                    eng: "überpronation_starker_einknick_nach_innen",
                    it: "Iperpronazione (forte rotazione verso l’interno)",
                    de: "Überpronation (starker Einknick nach innen)",
                },
            ],
        },
        {
            question: {
                eng: "running-shoes-allrounder_hatten_sie_schon_einmal_probleme_oder_schmerzen_beim_laufen",
                it: "Hai mai avuto problemi o dolori durante la corsa?",
                de: "Hatten Sie schon einmal Probleme oder Schmerzen beim Laufen?",
            },
            why_important: {
                de: `Warum Wichtig? 
Die Frage nach vergangenen Beschwerden ist entscheidend, um die besten Schuhe für dich zu finden. Die richtige Kombination aus Dämpfung, Stabilität und Sohlenkonstruktion hilft, die Belastung zu reduzieren und den Laufkomfort zu verbessern.
Bei Knieproblemen ist eine gute Dämpfung und Stabilität wichtig, um Stöße zu absorbieren und das Gelenk zu entlasten.
Wadenprobleme profitieren von einem höheren Absatz, der die Muskulatur schont.
Schienbeinschmerzen (Shin Splints) erfordern Schuhe, die den Druck auf das Schienbein verringern.
Fersenschmerzen (Plantarfasziitis) wiederum können durch verstärkte Dämpfung und Fußunterstützung gelindert werden.
💡 Die richtige Wahl des Schuhwerks trägt nicht nur dazu bei, Beschwerden zu lindern, sondern beugt auch neuen Problemen vor und sorgt für ein angenehmes Laufgefühl.
`,
                it: `Perché importante? La domanda su eventuali disturbi passati è fondamentale per trovare le scarpe migliori: la giusta combinazione di ammortizzazione, stabilità e struttura della suola aiuta a ridurre il carico e migliorare il comfort; per dolori al ginocchio servono ammortizzazione e stabilità, i problemi ai polpacci beneficiano di un tallone più alto, gli shin splints richiedono scarpe che riducano la pressione sulla tibia, mentre la fascite plantare può essere alleviata con maggiore ammortizzazione e supporto dell’arco; la scelta corretta delle scarpe aiuta non solo a ridurre i dolori esistenti ma anche a prevenire nuovi problemi e garantire una corsa piacevole.`
            },
            options: [
                {
                    eng: "nein",
                    it: "No",
                    de: "Nein",
                },
                {
                    eng: "ja_knieprobleme",
                    it: "Sì, problemi al ginocchio",
                    de: "Ja, Knieprobleme",
                },
                {
                    eng: "ja_wadenprobleme",
                    it: "Sì, problemi ai polpacci",
                    de: "Ja, Wadenprobleme",
                },
                {
                    eng: "ja_shin_splints_schienbeinschmerzen",
                    it: "Sì, shin splints (dolori alla tibia)",
                    de: "Ja, Shin Splints (Schienbeinschmerzen)",
                },
                {
                    eng: "ja_plantarfasziitis_fersenschmerzen",
                    it: "Sì, fascite plantare (dolore al tallone)",
                    de: "Ja, Plantarfasziitis (Fersenschmerzen)",
                },
            ],
        },
        {
            question: {
                eng: "running-shoes-allrounder_welche_rolle_spielt_dämpfung_im_verhältnis_zu_stabilität",
                it: "Che ruolo gioca l'ammortizzazione in relazione alla stabilità?",
                de: "Welche Rolle spielt Dämpfung im Verhältnis zu Stabilität?",
            },
            why_important: {
                de: `Warum wichtig?
Die Balance zwischen Dämpfung und Stabilität beeinflusst Laufgefühl, Effizienz und Verletzungsrisiko.
Maximale Dämpfung: Schont die Gelenke, kann aber die Eigenstabilität verringern.
Mehr Stabilität: Unterstützt die Fußführung, ist oft etwas schwerer und weniger flexibel.
Ausgewogen: Kombiniert Komfort und Kontrolle – ideal für die meisten Läufer.`,
                it: "Perché importante? L’equilibrio tra ammortizzazione e stabilità influenza la sensazione di corsa, l’efficienza e il rischio di infortuni: molta ammortizzazione protegge le articolazioni ma riduce la stabilità; maggiore stabilità sostiene la guida del piede ma rende la scarpa meno flessibile; una soluzione equilibrata combina comfort e controllo ed è ideale per la maggior parte dei runner."
            },
            options: [
                {
                    eng: "maximale_dämpfung_fokus_auf_komfort_und_gelenkschonung",
                    it: "Massima ammortizzazione – focus su comfort e protezione delle articolazioni",
                    de: "Maximale Dämpfung – Fokus auf Komfort und Gelenkschonung",
                },
                {
                    eng: "ausgewogen_gutes_verhältnis_von_dämpfung_und_stabilität",
                    it: "Equilibrato – buon rapporto tra ammortizzazione e stabilità",
                    de: "Ausgewogen – Gutes Verhältnis von Dämpfung und Stabilität",
                },
                {
                    eng: "mehr_stabilität_fokus_auf_kontrolle_und_führung",
                    it: "Maggiore stabilità – focus su controllo e supporto",
                    de: "Mehr Stabilität – Fokus auf Kontrolle und Führung",
                },
            ],
        },
    ],

    trailrunning: [
        {
            question: {
                eng: "running-shoes-trailrunning_wie_bevorzugen_sie_ihre_trailrunning_-_schuhe_zu_tragen",
                it: "Come preferisci indossare le tue scarpe da trail running?",
                de: "Wie bevorzugen Sie Ihre Trailrunning - Schuhe zu tragen?",
            },
            why_important: {
                de: `Speziell für unwegsames Terrain entwickelt. Bietet verstärkten Grip, Stabilität und Schutz vor Steinen, Wurzeln und Matsch. Ideal für Wald-, Berg- und Offroad-Strecken.`,
                it: `Progettate per percorsi irregolari. Offrono grip elevato, stabilità e protezione da sassi, radici e fango. Perfette per boschi, montagna e tratti off-road.`,
            },
            options: [
                {
                    eng: "die_perfekte_trailrunning-passform_basierend_auf_meinen_3d-scan",
                    it: "La calzata perfetta per il trail running basata sulla mia scansione 3D",
                    de: "Die perfekte Trailrunning-passform basierend auf meinen 3D-Scan",
                },
                {
                    eng: "eher_weiter_da_ich_mehr_bewegungsfreiheit_bevorzuge",
                    it: "Più ampia, perché preferisco avere maggiore libertà di movimento",
                    de: "Eher weiter, da ich mehr Bewegungsfreiheit bevorzuge",
                },
                {
                    eng: "eher_enger_da_ich_meine_schuhe_gern_fest_am_fuß_trage",
                    it: "Più aderente, perché mi piace che la scarpa stia ben salda al piede",
                    de: "Eher enger, da ich meine Schuhe gern fest am Fuß trage",
                },
            ],
        },
        {
            question: {
                eng: "running-shoes-trailrunning_soll_dein_schuh_wasserdicht_sein_gore-tex-membran",
                it: "La scarpa dovrebbe essere impermeabile (membrana Gore-Tex)?",
                de: "Soll dein Schuh wasserdicht sein (Gore-Tex-Membran)?",
            },

            why_important: {
                de: `Warum wichtig?
Die Wahl zwischen einem wasserdichten oder besser belüfteten Schuh beeinflusst deinen Komfort und deine Leistung.
Ein wasserdichter Schuh hält deine Füße trocken und warm bei Regen, Schnee oder nassen Trails.
Ein besser belüfteter Schuh ist leichter, flexibler und sorgt für eine schnellere Verdunstung von Schweiß – ideal für trockene Bedingungen und warme Temperaturen..`,
                it: `Perché è importante? La scelta tra una scarpa impermeabile o una più traspirante influisce sul comfort e sulle prestazioni. Una scarpa impermeabile mantiene i piedi asciutti e caldi sotto pioggia, neve o su sentieri bagnati. Una scarpa più traspirante è più leggera, flessibile e favorisce una rapida evaporazione del sudore – ideale per condizioni asciutte e temperature calde.`,
            },

            options: [
                {
                    eng: "ja_wasserdicht_und_atmungsaktiv_gore-tex_oder_ähnliche_membran",
                    it: "Sì, impermeabile e traspirante (Gore-Tex o membrana simile)",
                    de: "Ja, wasserdicht und atmungsaktiv (Gore-Tex oder ähnliche Membran)",
                },
                {
                    eng: "nein_leichter_und_besser_belüftet",
                    it: "No, più leggera e meglio ventilata",
                    de: "Nein, leichter und besser belüftet",
                },
            ],
        },
        {
            question: {
                eng: "running-shoes-trailrunning_wo_wirst_du_deine_trailrunning-schuhe_hauptsächlich_nutzen",
                it: "Dove utilizzerai principalmente le tue scarpe da trail running?",
                de: "Wo wirst du deine Trailrunning-Schuhe hauptsächlich nutzen?",
            },
            why_important: {
                de: `Warum wichtig?
Der Untergrund beeinflusst, welchen Grip und welche Dämpfung du beim Laufen brauchst – und damit auch die Wahl deiner Schuhe.
Nur auf Trails & im Gelände: Hier brauchst du Schuhe mit robustem Aufbau und starkem Profil, das für maximalen Halt auf rutschigem, steinigem oder unebenem Terrain sorgt.
Mischung aus Trail & Straße (Hybrid-Nutzung): Ein flexibler Allrounder mit moderatem Profil bietet guten Grip im Gelände und ausreichend Komfort für kurze Asphaltpassagen.
💡 Wer häufig zwischen Untergründen wechselt, sollte auf ausgewogene Dämpfung und Profil achten – so bleibst du überall sicher unterwegs.`,
                it: "Il tipo di terreno influisce sul grip e sull’ammortizzazione di cui hai bisogno durante la corsa, e quindi anche sulla scelta della scarpa. Solo trail e terreni naturali richiedono un modello robusto con suola aggressiva per massima stabilità. L’uso misto trail & strada richiede una scarpa versatile con buon grip e comfort per brevi tratti asfaltati."
            },
            options: [
                {
                    eng: "nur_auf_trails_und_im_gelände",
                    it: "Solo su trail e terreni naturali",
                    de: "Nur auf Trails & im Gelände",
                },
                {
                    eng: "mischung_aus_trail_und_straße_hybrid-nutzung",
                    it: "Utilizzo misto trail & strada (ibrido)",
                    de: "Mischung aus Trail & Straße (Hybrid-Nutzung)",
                },
            ],
        },
        {
            question: {
                eng: "running-shoes-trailrunning_welche_schafthöhe_soll_dein_schuh_haben",
                it: "Che altezza del collarino dovrebbe avere la tua scarpa?",
                de: "Welche Schafthöhe soll dein Schuh haben?",
            },

            why_important: {
                de: `Warum wichtig?  
Die Schafthöhe beeinflusst Halt, Stabilität und Schutz beim Trailrunning – besonders auf anspruchsvollem Gelände.
Niedrig (unter dem Knöchel) – Bietet maximale Bewegungsfreiheit und ein natürliches Laufgefühl, ideal für schnelle Läufe auf festen Trails. Allerdings weniger Schutz und Stabilität auf unebenem Untergrund.
Mittel/Hoch (knöchelhoch oder darüber) – Zusätzlicher Halt und Stabilität auf technischen Trails mit losen Steinen, unebenem Boden oder steilen Passagen. Reduziert das Risiko des Umknickens und schützt den Knöchel besser vor äußeren Einwirkungen wie Steinen, Wurzeln oder Gestrüpp.`,
                it: `L’altezza del collarino influisce su stabilità, protezione e libertà di movimento, soprattutto sui terreni tecnici. Un modello basso offre maggiore mobilità e una sensazione di corsa più naturale, ma meno protezione su superfici irregolari. Un modello medio/alto offre più supporto e riduce il rischio di distorsioni, proteggendo meglio la caviglia da urti esterni.`
            },

            options: [
                {
                    eng: "niedrig_unter_dem_knöchel",
                    it: "Basso (sotto la caviglia)",
                    de: "Niedrig (unter dem Knöchel)",
                },
                {
                    eng: "mittel_hoch_knöchelhoch_oder_darüber",
                    it: "Medio/alto (altezza caviglia o superiore)",
                    de: "Mittel/Hoch (knöchelhoch oder darüber)",
                },
            ],
        },
    ],

    longDistance: [
        {
            question: {
                eng: "running-shoes-longdistance_wie_bevorzugen_sie_ihre_dauer_-_laufschuhe_zu_tragen",
                it: "Come preferisce indossare le sue scarpe da corsa per le corse lunghe?",
                de: "Wie bevorzugen Sie Ihre Dauer - Laufschuhe zu tragen?",
            },

            why_important: {
                it: `Scarpe con massima ammortizzazione, comfort ed efficienza energetica per correre molti chilometri mantenendo un ritmo costante.`,
                de: `Speziell für unwegsames Terrain entwickelt. Bietet verstärkten Grip, Stabilität und Schutz vor Steinen, Wurzeln und Matsch. Ideal für Wald-, Berg- und Offroad-Strecken.`
            },

            options: [
                {
                    eng: "die_perfekte_laufschuh-passform_basierend_auf_meinen_3d-scan",
                    it: "La calzata perfetta delle scarpe da corsa basata sulla mia scansione 3D",
                    de: "Die perfekte Laufschuh-passform basierend auf meinen 3D-Scan",
                },
                {
                    eng: "eher_weiter_da_ich_mehr_bewegungsfreiheit_bevorzuge",
                    it: "Più spazio, perché preferisco maggiore libertà di movimento",
                    de: "Eher weiter, da ich mehr Bewegungsfreiheit bevorzuge",
                },
                {
                    eng: "eher_enger_da_ich_meine_schuhe_gern_fest_am_fuß_trage",
                    it: "Più aderente, perché mi piace che le scarpe stiano ben salde al piede",
                    de: "Eher enger, da ich meine Schuhe gern fest am Fuß trage",
                },
            ],
        },
        {
            question: {
                eng: "running-shoes-longdistance_auf_welchem_untergrund_wirst_du_hauptsächlich_laufen",
                it: "Su quale tipo di terreno correrai principalmente?",
                de: "Auf welchem Untergrund wirst du hauptsächlich laufen?",
            },
            options: [
                {
                    eng: "asphalt_straße_für_regelmäßige_feste_oberflächen",
                    it: "Asfalto/strada – per superfici regolari e compatte",
                    de: "Asphalt/Straße - Für regelmäßige, feste Oberflächen",
                },
                {
                    eng: "gemischt_für_unterschiedliche_oberflächen",
                    it: "Misto – per superfici variabili",
                    de: "Gemischt – Für unterschiedliche Oberflächen",
                },
            ],
        },
        {
            question: {
                eng: "running-shoes-longdistance_hatten_sie_schon_einmal_probleme_oder_schmerzen_beim_laufen",
                it: "Hai mai avuto problemi o dolori durante la corsa?",
                de: "Hatten Sie schon einmal Probleme oder Schmerzen beim Laufen?",
            },
            why_important: {
                de: `Warum Wichtig?
Die Frage nach vergangenen Beschwerden ist entscheidend, um die besten Schuhe für dich zu finden. Die richtige Kombination aus Dämpfung, Stabilität und Sohlenkonstruktion hilft, die Belastung zu reduzieren und den Laufkomfort zu verbessern.    
Bei Knieproblemen ist eine gute Dämpfung und Stabilität wichtig, um Stöße zu absorbieren und das Gelenk zu entlasten.    
Wadenprobleme profitieren von einem höheren Absatz, der die Muskulatur schont.     
Schienbeinschmerzen (Shin Splints) erfordern Schuhe, die den Druck auf das Schienbein verringern.    
Fersenschmerzen (Plantarfasziitis) wiederum können durch verstärkte Dämpfung und Fußunterstützung gelindert werden.    
💡 Die richtige Wahl des Schuhwerks trägt nicht nur dazu bei, Beschwerden zu lindern, sondern beugt auch neuen Problemen vor und sorgt für ein angenehmes Laufgefühl.`,
                it: `Perché importante? La domanda sui disturbi passati è fondamentale per trovare le scarpe migliori: la giusta combinazione di ammortizzazione, stabilità e costruzione della suola aiuta a ridurre il carico e migliorare il comfort. Per dolori alle ginocchia servono ammortizzazione e stabilità; i problemi ai polpacci beneficiano di un tallone più alto; gli shin splints richiedono scarpe che riducano la pressione sulla tibia; la fascite plantare può essere alleviata con maggiore ammortizzazione e supporto dell’arco. La scelta corretta delle scarpe aiuta non solo a ridurre i dolori esistenti, ma anche a prevenire nuovi problemi e garantire una corsa più piacevole.`
            },
            options: [
                {
                    eng: "nein",
                    it: "No",
                    de: "Nein",
                },
                {
                    eng: "ja_knieprobleme",
                    it: "Sì, problemi al ginocchio",
                    de: "Ja, Knieprobleme",
                },
                {
                    eng: "ja_wadenprobleme",
                    it: "Sì, problemi ai polpacci",
                    de: "Ja, Wadenprobleme",
                },
                {
                    eng: "ja_shin_splints_schienbeinschmerzen",
                    it: "Sì, shin splints (dolori alla tibia)",
                    de: "Ja, Shin Splints (Schienbeinschmerzen)",
                },
                {
                    eng: "ja_plantarfasziitis_fersenschmerzen",
                    it: "Sì, fascite plantare (dolore al tallone)",
                    de: "Ja, Plantarfasziitis (Fersenschmerzen)",
                },
            ],
        },
        {
            question: {
                eng: "running-shoes-longdistance_kennen_sie_ihren_fußtyp_oder_ihre_pronation",
                it: "Conosce il suo tipo di piede o la sua pronazione?",
                de: "Kennen Sie Ihren Fußtyp oder Ihre Pronation?",
            },
            why_important: {
                de: `Warum wichtig?
Fußtyp und Pronation bestimmen, wie dein Fuß aufsetzt – und welche Unterstützung du brauchst.
Ein Neutralfuß läuft am besten in flexiblen Schuhen. 
Bei Überpronation helfen Stabilitätsmodelle, das Einknicken nach innen zu kontrollieren. 
Unsere präzise Analyse – basierend auf deinen 3D-Scan – hilft dir, den passenden Schuh zu finden, der deine natürliche Bewegung unterstützt und Verletzungen vorbeugt.`,
                it: `Perché importante? Il tipo di piede e la pronazione determinano come il piede appoggia e quale supporto serve: un piede neutro funziona meglio con scarpe flessibili; in caso di iperpronazione aiutano modelli stabili che controllano l’eccessiva rotazione verso l’interno; la nostra analisi precisa basata sulla scansione 3D aiuta a trovare la scarpa che sostiene il movimento naturale e previene infortuni.`
            },
            options: [
                {
                    eng: "analyse_basierend_auf_meinem_3d-scan",
                    it: "Analisi basata sulla mia scansione 3D",
                    de: "Analyse basierend auf meinem 3D-Scan",
                },
                {
                    eng: "neutralfuß",
                    it: "Piede neutro",
                    de: "Neutralfuß",
                },
                {
                    eng: "überpronation_starker_einknick_nach_innen",
                    it: "Iperpronazione (forte rotazione verso l’interno)",
                    de: "Überpronation (starker Einknick nach innen)",
                },
            ],
        },
        {
            question: {
                eng: "running-shoes-longdistance_welche_rolle_spielt_dämpfung_im_verhältnis_zu_stabilität",
                it: "Che ruolo hanno ammortizzazione e stabilità nel tuo modo di correre?",
                de: "Welche Rolle spielt Dämpfung im Verhältnis zu Stabilität?",
            },
            why_important: {
                de: `Warum wichtig?
Die Balance zwischen Dämpfung und Stabilität beeinflusst Laufgefühl, Effizienz und Verletzungsrisiko.
Maximale Dämpfung: Schont die Gelenke, kann aber die Eigenstabilität verringern.
Mehr Stabilität: Unterstützt die Fußführung, ist oft etwas schwerer und weniger flexibel.
Ausgewogen: Kombiniert Komfort und Kontrolle – ideal für die meisten Läufer.`,
                it: `Perché importante? L’equilibrio tra ammortizzazione e stabilità influenza la sensazione di corsa, l’efficienza e il rischio di infortuni: molta ammortizzazione protegge le articolazioni ma riduce la stabilità; più stabilità sostiene la guida del piede ma rende la scarpa meno flessibile; una soluzione equilibrata combina comfort e controllo ed è ideale per la maggior parte dei runner.`
            },
            options: [
                {
                    eng: "maximale_dämpfung_fokus_auf_komfort_und_gelenkschonung",
                    it: "Massima ammortizzazione – focus su comfort e protezione delle articolazioni",
                    de: "Maximale Dämpfung – Fokus auf Komfort und Gelenkschonung",
                },
                {
                    eng: "ausgewogen_gutes_verhältnis_von_dämpfung_und_stabilität",
                    it: "Equilibrato – buon rapporto tra ammortizzazione e stabilità",
                    de: "Ausgewogen – Gutes Verhältnis von Dämpfung und Stabilität",
                },
                {
                    eng: "mehr_stabilität_fokus_auf_kontrolle_und_führung",
                    it: "Maggiore stabilità – focus su controllo e supporto",
                    de: "Mehr Stabilität – Fokus auf Kontrolle und Führung",
                },
            ],
        },
    ],


    competition: [
        {
            question: {
                eng: "running-shoes-competition_wie_bevorzugen_sie_ihre_wettkampf_-_schuhe_zu_tragen",
                it: "Come preferisci indossare le tue scarpe da gara?",
                de: "Wie bevorzugen Sie Ihre Wettkampf - Schuhe zu tragen?",
            },
            why_important: {
                de: `Ultraleichte, reaktive Schuhe mit Carbon- oder Nylonplatte, speziell für den Renntag. Sie bieten maximale Energie-Rückgabe und Effizienz auf langen Distanzen und katapultieren dich mit jedem Schritt nach vorne.`,
                it: `Scarpe ultraleggere e reattive con piastra in carbonio o nylon, pensate per il giorno della gara. Offrono massimo ritorno di energia ed efficienza sulle lunghe distanze.`
            },
            options: [
                {
                    eng: "die_perfekte_wettkampf-passform_basierend_auf_meinen_3d-scan",
                    it: "La calzata perfetta per la gara basata sulla mia scansione 3D",
                    de: "Die perfekte Wettkampf-passform basierend auf meinen 3D-Scan",
                },
                {
                    eng: "eher_weiter_da_ich_mehr_bewegungsfreiheit_bevorzuge",
                    it: "Più ampia, perché preferisco maggiore libertà di movimento",
                    de: "Eher weiter, da ich mehr Bewegungsfreiheit bevorzuge",
                },
                {
                    eng: "eher_enger_da_ich_meine_schuhe_gern_fest_am_fuß_trage",
                    it: "Più aderente, perché mi piace che la scarpa avvolga bene il piede",
                    de: "Eher enger, da ich meine Schuhe gern fest am Fuß trage",
                },
            ],
        },
        {
            question: {
                eng: "running-shoes-competition_welche_art_von_wettkampfschuhen_suchst_du",
                it: "Che tipo di scarpe da gara stai cercando?",
                de: "Welche Art von Wettkampfschuhen suchst du?",
            },

            why_important: {
                de: `Warum wichtig?
Die Wahl zwischen Wettkampfschuhen mit oder ohne Carbon beeinflusst nicht nur deine Performance, sondern auch deine Belastung.
Mit Carbon: Bieten maximale Energierückgabe und Vortrieb – ideal für Bestzeiten. Sie fördern eine aggressive Laufmechanik, können jedoch bei häufiger Nutzung oder längeren Strecken die Gelenke und Muskulatur stärker belasten.
Ohne Carbon: Etwas gelenkschonender, oft stabiler und vielseitiger – gut geeignet für längere Wettkämpfe, Trainingsläufe oder alle, die mehr Kontrolle bevorzugen.
💡 Wer effizient und zugleich nachhaltig trainieren will, sollte je nach Ziel und Belastung bewusst wählen.`,
                it: `Perché è importante? La scelta tra scarpe da gara con o senza carbonio influisce non solo sulle prestazioni ma anche sul carico per le articolazioni. Le scarpe con carbonio offrono il massimo ritorno di energia e spinta – ideali per i personal best, ma possono affaticare maggiormente articolazioni e muscoli sulle distanze più lunghe. Le scarpe senza carbonio sono più stabili, versatili e spesso più delicate sulle articolazioni – perfette per gare più lunghe, allenamenti o per chi preferisce maggiore controllo. Chi vuole allenarsi in modo efficiente e sostenibile dovrebbe scegliere consapevolmente in base a obiettivo e carico.`
            },

            options: [
                {
                    eng: "wettkampfschuhe_mit_carbon",
                    it: "Scarpe da competizione con carbonio",
                    de: "Wettkampfschuhe Mit Carbon",
                },
                {
                    eng: "wettkampfschuhe_ohne_carbon",
                    it: "Scarpe da competizione senza carbonio",
                    de: "Wettkampfschuhe Ohne Carbon",
                },
            ],
        },
        {
            question: {
                eng: "running-shoes-competition_für_welche_distanz_suchst_du_wettkampf-schuhe",
                it: "Per quale distanza stai cercando scarpe da gara?",
                de: "Für welche Distanz suchst du Wettkampf-Schuhe?",
            },
            why_important: {
                de: `Warum wichtig?
Die Wahl der richtigen Wettkampf-Schuhe hängt stark von der Distanz ab.
Für kurze Strecken (5–10 km) sind leichte, reaktionsfreudige Modelle ideal, um Tempo und Effizienz zu maximieren.
Beim Halbmarathon braucht es eine ausgewogene Mischung aus Dämpfung und Energierückgabe, um Schnelligkeit und Komfort zu vereinen.
Für Marathon & Ultramarathon sind gut gedämpfte Schuhe essenziell, um Ermüdung zu minimieren und die Muskulatur langfristig zu entlasten.`,
                it: `Perché è importante? La scelta delle scarpe da gara dipende fortemente dalla distanza. Per distanze brevi (5–10 km) sono ideali modelli leggeri e reattivi per massimizzare velocità ed efficienza. Per la mezza maratona serve un equilibrio tra ammortizzazione e ritorno di energia per unire comfort e performance. Per maratona e ultramaratona sono fondamentali scarpe ben ammortizzate per ridurre l’affaticamento e proteggere la muscolatura a lungo termine.`
            },
            options: [
                {
                    eng: "kurzstrecke_5_km_–_10_km",
                    it: "Corta distanza (5 km – 10 km)",
                    de: "Kurzstrecke (5 km – 10 km)",
                },
                {
                    eng: "halbmarathon_21_1_km",
                    it: "Mezza maratona (21,1 km)",
                    de: "Halbmarathon (21,1 km)",
                },
                {
                    eng: "marathon_42_2_km_und_mehr",
                    it: "Maratona (42,2 km e oltre)",
                    de: "Marathon (42,2 km & mehr)",
                },
            ],
        },
        {
            question: {
                eng: "running-shoes-competition_welche_sprengung_bevorzugst_du",
                it: "Quale drop preferisci?",
                de: "Welche Sprengung bevorzugst du?",
            },

            //
            why_important: {
                de: `Warum wichtig?  
Die Sprengung beeinflusst deine Laufdynamik und die Belastung von Muskeln und Gelenken. Eine höhere Sprengung erleichtert das Abrollen, während eine niedrigere Sprengung eine aktivere Lauftechnik fördert.
6–10 mm – Die bewährte Wahl für viele Läufer. Unterstützt das natürliche Abrollen und entlastet Waden und Achillessehne – ideal für längere Läufe oder Fersenläufer.
≤ 5 mm – Sorgt für einen direkteren Bodenkontakt und fördert eine effiziente Lauftechnik. Erfordert eine gut trainierte Muskulatur, da Waden und Achillessehne stärker beansprucht werden.`,

                it: `Perché è importante? Il drop influisce sulla dinamica di corsa e sul carico su muscoli e articolazioni. Un drop più alto facilita la rullata, mentre un drop più basso favorisce una tecnica di corsa più attiva. 6–10 mm – La scelta più collaudata per molti runner. Supporta una rullata naturale e riduce lo stress su polpacci e tendine d’Achille – ideale per corse più lunghe o per chi atterra sul tallone. ≤ 5 mm – Garantisce un contatto più diretto con il terreno e favorisce una tecnica di corsa più efficiente. Richiede una muscolatura ben allenata, poiché polpacci e tendine d’Achille vengono maggiormente sollecitati.`

            },
            options: [
                {
                    eng: "6–10_mm_bewährte_wahl_unterstützt_das_abrollen",
                    it: "6–10 mm – Scelta collaudata, supporta la rullata.",
                    de: "6–10 mm – Bewährte Wahl, unterstützt das Abrollen.",
                },
                {
                    eng: "≤_6_mm_direkter_abdruck_erfordert_trainierte_technik",
                    it: "≤ 6 mm – Spinta più diretta, richiede tecnica allenata.",
                    de: "≤ 6 mm – Direkter Abdruck, erfordert trainierte Technik.",
                },
            ],
        },
    ],

    interval: [
        {
            question: {
                eng: "running-shoes-interval_wie_bevorzugen_sie_ihre_intervall_-_laufschuhe_zu_tragen",
                it: "Come preferisce indossare le sue scarpe da intervalli?",
                de: "Wie bevorzugen Sie Ihre Intervall - Laufschuhe zu tragen?",
            },

            why_important: {
                de: `Dynamische, leichte Schuhe mit direkter Bodenrückmeldung für schnelle Sprints und Tempoläufe auf der Bahn oder Straße.`,
                it: `Scarpe leggere e dinamiche con risposta diretta dal terreno, ideali per sprint e allenamenti veloci su pista o strada.`
            },

            options: [
                {
                    eng: "die_perfekte_intervall-passform_basierend_auf_meinen_3d-scan",
                    it: "La calzata perfetta per gli allenamenti a intervalli basata sulla mia scansione 3D",
                    de: "Die perfekte Intervall-passform basierend auf meinen 3D-Scan",
                },
                {
                    eng: "eher_weiter_da_ich_mehr_bewegungsfreiheit_bevorzuge",
                    it: "Più spazio, perché preferisco maggiore libertà di movimento",
                    de: "Eher weiter, da ich mehr Bewegungsfreiheit bevorzuge",
                },
            ],
        },
        {
            question: {
                eng: "running-shoes-interval_auf_welchem_untergrund_läufst_du_deine_intervalltrainings",
                it: "Su quale tipo di terreno svolgi i tuoi allenamenti a intervalli?",
                de: "Auf welchem Untergrund läufst du deine Intervalltrainings?",
            },

            why_important: {
                de: `Warum wichtig? Der Untergrund beeinflusst die Wahl deiner Wettkampf- und Intervallschuhe. Auf der Laufbahn bieten Spikes maximalen Grip und Effizienz, während auf Asphalt gut gedämpfte und reaktionsfreudige Schuhe die Belastung auf Muskeln und Gelenke reduzieren.`,
                it: `Perché importante? Il terreno influisce sulla scelta delle scarpe da gara e da intervalli: in pista le spikes offrono massimo grip ed efficienza, mentre su asfalto scarpe ben ammortizzate e reattive riducono il carico su muscoli e articolazioni.`
            },

            options: [
                {
                    eng: "laufbahn_spikes",
                    it: "Pista (spikes)",
                    de: "Laufbahn (Spikes)",
                },
                {
                    eng: "asphalt_laufbahn_ohne_spikes",
                    it: "Asfalto / pista (senza spikes)",
                    de: "Asphalt/Laufbahn (ohne Spikes)",
                },
            ],
        },
        {
            question: {
                eng: "running-shoes-interval_welche_distanz_läufst_du_bei_deinen_intervalltrainings",
                it: "Quale distanza percorri durante i tuoi allenamenti a intervalli?",
                de: "Welche Distanz läufst du bei deinen Intervalltrainings?",
            },
            why_important: {
                it: `Perché importante? La distanza influisce sulle esigenze delle scarpe: per le distanze brevi sono ideali scarpe leggere e reattive con buona trazione per supportare sprint e accelerazioni, mentre le distanze medio-lunghe richiedono una combinazione di ammortizzazione, stabilità e ritorno di energia per mantenere un ritmo costante in modo efficiente.`,
                de: `Warum wichtig?  
Die Distanz beeinflusst die Anforderungen an deine Schuhe. 
Für Kurzstrecken sind leichte, reaktionsfreudige Schuhe mit guter Traktion ideal, um schnelle Sprints und Beschleunigungen zu unterstützen. 
Mittel- & Langstrecken erfordern hingegen eine Kombination aus Dämpfung, Stabilität und Energierückgabe, um ein konstantes Tempo effizient zu halten.
`
            },
            options: [
                {
                    eng: "kurzstrecke_100–400_m",
                    it: "Distanza breve (100–400 m)",
                    de: "Kurzstrecke (100–400 m)",
                },
                {
                    eng: "mittel-_und_langstrecke_800_m_–_10_000_m",
                    it: "Distanza media e lunga (800 m – 10.000 m)",
                    de: "Mittel- & Langstrecke (800 m – 10.000 m)",
                },
            ],
        },
    ],

    walking: [
        {
            question: {
                eng: "running-shoes-walking_wie_bevorzugen_sie_ihre_walking_-_laufschuhe_zu_tragen",
                it: "Come preferisce indossare le sue scarpe da walking o da corsa?",
                de: "Wie bevorzugen Sie Ihre Walking - Laufschuhe zu tragen??",
            },
            why_important: {
                de: "Perfekt für Alltag, Spaziergänge und lange Gehstrecken. Sie bieten eine bequeme Passform, gute Dämpfung und unterstützen eine natürliche Abrollbewegung.",
                it: "Perfette per uso quotidiano, passeggiate e lunghe distanze a piedi. Offrono comfort, buona ammortizzazione e un naturale movimento del piede.",
            },
            options: [
                {
                    eng: "die_perfekte_laufschuh-passform_basierend_auf_meinen_3d-scan",
                    it: "La calzata perfetta delle scarpe da corsa basata sulla mia scansione 3D",
                    de: "Die perfekte Laufschuh-passform basierend auf meinen 3D-Scan",
                },
                {
                    eng: "eher_weiter_da_ich_mehr_bewegungsfreiheit_bevorzuge",
                    it: "Più spazio, perché preferisco maggiore libertà di movimento",
                    de: "Eher weiter, da ich mehr Bewegungsfreiheit bevorzuge",
                },
                {
                    eng: "eher_enger_da_ich_meine_schuhe_gern_fest_am_fuß_trage",
                    it: "Più aderente, perché mi piace che le scarpe stiano ben salde al piede",
                    de: "Eher enger, da ich meine Schuhe gern fest am Fuß trage",
                },
            ],
        },
        {
            question: {
                eng: "running-shoes-walking_auf_welchem_untergrund_wirst_du_hauptsächlich_unterwegs_sein",
                it: "Su quale tipo di terreno correrai principalmente?",
                de: "Auf welchem Untergrund wirst du hauptsächlich unterwegs sein?",
            },

            why_important: {
                de: `Warum wichtig?  
Der Untergrund beeinflusst die Dämpfung, Stabilität und das Profil der Schuhe. 
Auf hartem Untergrund sind gut gedämpfte Schuhe wichtig, um die Gelenke zu entlasten. 
Für gemischtes Terrain bieten Schuhe mit mehr Grip besseren Halt und Komfort auf unebenem Boden.
`,
                it: `Perché importante? Il terreno influisce sull’ammortizzazione, sulla stabilità e sul profilo della suola. Su superfici dure sono importanti scarpe ben ammortizzate per alleggerire le articolazioni.
Per terreni misti, le scarpe con più grip offrono una migliore tenuta e maggiore comfort su superfici irregolari.
`
            },

            options: [
                {
                    eng: "harter_untergrund_asphalt_pflastersteine_gehwege",
                    it: "Superficie dura – asfalto, pavé, marciapiedi",
                    de: "Harter Untergrund – Asphalt, Pflastersteine, Gehwege",
                },
                {
                    eng: "gemischtes_terrain_abwechslung_aus_natur-_und_stadtwegen",
                    it: "Terreno misto – alternanza di percorsi naturali e urbani",
                    de: "Gemischtes Terrain – Abwechslung aus Natur- und Stadtwegen",
                },
            ],
        },
        {
            question: {
                eng: "running-shoes-walking_bevorzugen_sie_eine_höhere_sohle_oder_eine_normale_bis_mittlere_sohlenhöhe",
                it: "Preferisce una suola più alta o una suola normale o media?",
                de: "Bevorzugen Sie eine höhere Sohle oder eine normale bis mittlere Sohlenhöhe?",
            },

            why_important: {
                de: `Warum wichtig?
Die Sohle bestimmt, wie sich der Schuh anfühlt. 
Eine höhere Sohle bietet mehr Dämpfung und fühlt sich weicher an, was angenehm für längere Strecken oder mehr Komfort ist. 
Eine normale bis mittlere Sohle gibt ein direkteres Gefühl zum Boden und sorgt für ein natürlicheres Abrollen.`,
                it: `Perché importante? L’altezza della suola determina la sensazione della scarpa: una suola più alta offre più ammortizzazione e comfort sulle lunghe distanze, mentre una suola normale o media garantisce un contatto più diretto con il terreno e una rullata più naturale.`
            },

            options: [
                {
                    eng: "höhere_sohle_fokus_auf_komfort",
                    it: "Suola alta – focus sul comfort",
                    de: "Höhere Sohle – Fokus auf Komfort",
                },
                {
                    eng: "normale_bis_mittlere_sohle_fokus_auf_nätürliches_abrollverhalten",
                    it: "Suola normale o media – focus su una rullata naturale",
                    de: "Normale bis mittlere Sohle – Fokus auf nätürliches Abrollverhalten",
                },
            ],
        },
    ],
};

const climbingShoes = [
    {
        question: {
            eng: "climbing-shoes_wie_bevorzugen_sie_ihre_schuhe_zu_tragen",
            it: "Come preferisci indossare le tue scarpe?",
            de: "Wie bevorzugen Sie Ihre Schuhe zu tragen?",
        },
        options: [
            {
                eng: "die_empfohlene_kletterschuh-passform_basierend_auf_meinen_3d-scan",
                it: "La calzata ideale delle scarpe da arrampicata basata sulla mia scansione 3D",
                de: "Die empfohlene Kletterschuh-passform basierend auf meinen 3D-Scan",
            },
            {
                eng: "eher_weiter_für_mehr_bewegungsfreiheit_und_höheren_tragekomfort",
                it: "Più ampia, per maggiore libertà di movimento e comfort prolungato",
                de: "Eher weiter, für mehr Bewegungsfreiheit und höheren Tragekomfort",
            },
        ],
    },
    {
        question: {
            eng: "climbing-shoes_wofür_brauchst_du_die_kletterschuhe",
            it: "A cosa ti servono le scarpe da arrampicata?",
            de: "Wofür brauchst du die Kletterschuhe?",
        },
        why_important: {
            de: `Warum wichtig?
Die Wahl der Kletterschuhe hängt stark von der Art des Kletterns ab.
Für Mehrseillängen und Alpinklettern sind bequeme Schuhe mit guter Unterstützung wichtig, da sie lange getragen werden.
Boulderschuhe bieten maximale Präzision und Grip für kurze, kraftvolle Bewegungen.
Beim Sportklettern sind eine gute Balance aus Komfort, Sensibilität und Aggressivität entscheidend.
Rissklettern erfordert robuste, flache Schuhe, die den Fuß schützen und sicheren Halt in Spalten bieten. 
Die richtige Wahl verbessert Performance, Komfort und Sicherheit.`,
            it: `La scelta delle scarpe da arrampicata dipende molto dal tipo di scalata: per vie lunghe e alpinismo servono modelli comodi con buon supporto, per il boulder massima precisione e grip, nell’arrampicata sportiva è importante un equilibrio tra sensibilità e aggressività, mentre per le fessure servono scarpe robuste e piatte che proteggano il piede e offrano stabilità.`
        },
        options: [
            {
                eng: "mehrseillängen_/_alpinklettern",
                it: "Vie lunghe / Alpinismo",
                de: "Mehrseillängen / Alpinklettern",
            },
            {
                eng: "bouldern",
                it: "Boulder",
                de: "Bouldern",
            },
            {
                eng: "sportklettern",
                it: "Arrampicata sportiva",
                de: "Sportklettern",
            },
            {
                eng: "rissklettern",
                it: "Arrampicata in fessura",
                de: "Rissklettern",
            },
        ],
    },
    {
        question: {
            eng: "climbing-shoes_welche_fußform_hast_du",
            it: "Che forma del piede hai?",
            de: "Welche Fußform hast du?",
        },
        why_important: {
            de: `Warum wichtig?
Die Fußform beeinflusst die Passform und den Komfort des Kletterschuhs. 
Bestimmte Modelle eignen sich besser für bestimmte Fußformen, um Druckstellen zu vermeiden und die Leistung zu optimieren.`,
            it: `La forma del piede influisce sulla calzata e sul comfort delle scarpe da arrampicata; alcuni modelli si adattano meglio a specifiche forme per evitare punti di pressione e migliorare la performance.`
        },
        options: [
            {
                eng: "ägyptisch",
                it: "Egizia",
                de: "Ägyptisch",
            },
            {
                eng: "römisch",
                it: "Romana",
                de: "Römisch",
            },
            {
                eng: "griechisch",
                it: "Greca",
                de: "Griechisch",
            },
            {
                eng: "automatische_analyse_laut_scan",
                it: "Analisi automatica tramite scansione",
                de: "Automatische Analyse laut Scan",
            },
        ],
    },
    {
        question: {
            eng: "climbing-shoes_was_ist_dir_bei_der_sohle_deines_kletterschuhs_am_wichtigsten",
            it: "Cosa è più importante per te nella suola delle tue scarpe da arrampicata?",
            de: "Was ist dir bei der Sohle deines Kletterschuhs am wichtigsten?",
        },
        why_important: {
            de: `Warum wichtig?
Die Sohle beeinflusst, wie du auf der Wand stehst und wie lange der Schuh hält.                             
Maximales Gefühl & Präzision ist wichtig, wenn du auf winzigen Tritten stehst – du spürst besser, wie du dein Gewicht verlagerst.                         
Unterstützung & Komfort hilft dir bei langen Routen, weil der Fuß weniger arbeiten muss und nicht so schnell ermüdet.                                                                  
 Langlebigkeit & Robustheit sorgt dafür, dass sich die Schuhe nicht zu schnell abnutzen, besonders wenn du oft in der Halle trainierst oder viel Reibungsklettern machst.                                                                 
Eine Balance aus Haltbarkeit & Performance ist ideal, wenn du einen vielseitigen Schuh suchst, der sowohl Grip als auch lange Lebensdauer bietet. 
Die Wahl der richtigen Sohle macht den Unterschied zwischen Kontrolle, Komfort und Haltbarkeit!`,
            it: `La suola influisce su come ti posizioni sulla parete e sulla durata della scarpa; precisione, supporto, durata o un equilibrio tra questi elementi determinano controllo, comfort e prestazioni.`
        },
        options: [
            {
                eng: "maximales_gefühl_und_präzision",
                it: "Massima sensibilità e precisione",
                de: "Maximales Gefühl und Präzision",
            },
            {
                eng: "unterstützung_und_komfort",
                it: "Supporto e comfort",
                de: "Unterstützung und Komfort",
            },
            {
                eng: "langlebigkeit_und_robustheit",
                it: "Durata e robustezza",
                de: "Langlebigkeit und Robustheit",
            },
            {
                eng: "balance_aus_haltbarkeit_und_performance",
                it: "Equilibrio tra durata e prestazioni",
                de: "Balance aus Haltbarkeit und Performance",
            },
        ],
    },
    {
        question: {
            eng: "climbing-shoes_welche_form_bevorzugen_sie",
            it: "Quale forma preferisci per le tue scarpe da arrampicata?",
            de: "Welche Form bevorzugen Sie?",
        },
        why_important: {
            de: `Warum Wichtig?  
Die Form des Kletterschuhs beeinflusst, wie der Fuß den Fels oder die Kletterwand berührt.                       
- Neutrale Schuhe bieten eine entspannte Passform und sind ideal für lange Touren oder Einsteiger, da sie den Fuß weniger belasten.                                                            - Moderate Krümmung sorgt für eine bessere Kraftübertragung auf kleine Tritte, bleibt aber komfortabel genug für längere Klettereinheiten.                                                   - Aggressive Schuhe mit starker Krümmung bündeln die Kraft in den Zehen, was besonders in steilen und überhängenden Routen wichtig ist, da sie besseren Halt auf kleinen Griffen ermöglichen – allerdings auf Kosten des Komforts.  
Die Wahl der richtigen Form entscheidet über Präzision, Komfort und Performance.`,
            it: `La forma della scarpa determina come il piede si posiziona sulla roccia; modelli neutri offrono comfort per lunghe vie, una curvatura moderata migliora la trasmissione della forza e le scarpe aggressive concentrano la potenza sulle dita garantendo massima precisione nelle pareti ripide.`
        },
        options: [
            {
                eng: "neutral_komfortabel_für_lange_touren_&_anfänger",
                it: "Neutra – Confortevole per lunghe vie e principianti",
                de: "Neutral – Komfortabel für lange Touren & Anfänger",
            },
            {
                eng: "moderate_krümmung_gute_balance_aus_komfort_&_präzision",
                it: "Curvatura moderata – Buon equilibrio tra comfort e precisione",
                de: "Moderate Krümmung – Gute Balance aus Komfort & Präzision",
            },
            {
                eng: "stark_gekrümmt_aggressiv_maximale_präzision_für_steile_&_schwierige_routen",
                it: "Fortemente arcuata (Aggressiva) – Massima precisione per vie ripide e difficili",
                de: "Stark gekrümmt (Aggressiv) – Maximale Präzision für steile & schwierige Routen",
            },
        ],
    },
];

const soccerShoes = [
    {
        question: {
            eng: "soccer-shoes_wie_bevorzugen_sie_ihre_schuhe_zu_tragen",
            it: "Come preferisci indossare le tue scarpe?",
            de: "Wie bevorzugen Sie Ihre Schuhe zu tragen?",
        },
        options: [
            {
                eng: "die_perfekte_fussballschuh-passform_basierend_auf_meinen_3d-scan",
                it: "La calzata perfetta delle scarpe da calcio basata sulla mia scansione 3D",
                de: "Die perfekte Fussballschuh-passform basierend auf meinen 3D-Scan",
            },
            {
                eng: "eher_weiter_da_ich_mehr_bewegungsfreiheit_bevorzuge",
                it: "Più ampia, perché preferisco maggiore libertà di movimento",
                de: "Eher weiter, da ich mehr Bewegungsfreiheit bevorzuge",
            },
        ],
    },
    {
        question: {
            eng: "soccer-shoes_auf_welchem_untergrund_spielst_du_hauptsächlich",
            it: "Su quale superficie giochi principalmente?",
            de: "Auf welchem Untergrund spielst du hauptsächlich?",
        },
        why_important: {
            de: `Warum wichtig?
Je nach Untergrund benötigt man unterschiedliche Fußballschuhe.
Für Naturrasen sind Schuhe mit Stollen (FG) ideal, um Grip und Stabilität zu gewährleisten.
Kunstrasen erfordert spezielle AG-Sohlen mit kürzeren, widerstandsfähigen Stollen, um Verletzungen zu vermeiden.
Auf Hartplätzen sind TF-Schuhe mit vielen kleinen Noppen optimal für Traktion und Dämpfung.
In der Halle sind IC-Schuhe mit flacher, abriebfester Sohle nötig, um besten Halt auf glatten Böden zu bieten.`,
            it: "A seconda del terreno servono scarpe diverse: il naturale richiede tacchetti FG per grip e stabilità, il sintetico suole AG più resistenti per evitare infortuni, i campi duri suole TF per trazione e ammortizzazione, mentre in palestra servono suole IC piatte per la massima aderenza.",
        },
        options: [
            {
                eng: "naturrasen_fg",
                it: "Erba naturale (FG)",
                de: "Naturrasen (FG)",
            },
            {
                eng: "kunstrasen_ag",
                it: "Erba sintetica (AG)",
                de: "Kunstrasen (AG)",
            },
            {
                eng: "halle_ic",
                it: "Indoor/Palestra (IC)",
                de: "Halle (IC)",
            },
        ],
    },
    {
        question: {
            eng: "soccer-shoes_was_ist_ihnen_wichtiger_geschwindigkeit_oder_stabilität",
            it: "Cosa è più importante per te: velocità o stabilità?",
            de: "Was ist Ihnen wichtiger – Geschwindigkeit oder Stabilität?",
        },
        why_important: {
            de: `Warum Wichtig?  
Fußballspieler haben unterschiedliche Spielstile und Anforderungen an ihre Schuhe.
Schnelle Flügelspieler oder Stürmer profitieren von leichten Schuhen für explosive Antritte.
Verteidiger oder physisch starke Spieler  benötigen mehr Stabilität und Schutz.
Mittelfeldspieler oder Allrounder brauchen oft eine Mischung aus beidem, um sich flexibel an Spielsituationen anzupassen.`,
            it: `I giocatori hanno stili diversi: gli esterni rapidi beneficiano di scarpe leggere per scatti ed esplosività, i difensori o giocatori fisicamente forti necessitano di più stabilità e protezione, mentre i centrocampisti o tuttofare hanno bisogno di un equilibrio tra entrambe per adattarsi rapidamente alle situazioni di gioco.`,
        },
        options: [
            {
                eng: "geschwindigkeit_leichter_schuh_für_schnelle_antritte_und_richtungswechsel",
                it: "Velocità – Scarpa leggera per scatti rapidi e cambi di direzione.",
                de: "Geschwindigkeit – Leichter Schuh für schnelle Antritte & Richtungswechsel.",
            },
            {
                eng: "stabilität_fester_sitz_und_optimal_für_harte_zweikämpfe",
                it: "Stabilità – Calzata più solida e ideale nei contrasti duri.",
                de: "Stabilität - Fester Sitz & Optimal für harte Zweikämpfe.",
            },
            {
                eng: "vielseitigkeit_balance_aus_speed_und_halt_für_flexible_spielstile",
                it: "Versatilità – Equilibrio tra velocità e stabilità per uno stile di gioco flessibile.",
                de: "Vielseitigkeit – Balance aus Speed & Halt für flexible Spielstile.",
            },
        ],
    },
    {
        question: {
            eng: "soccer-shoes_welche_preisklasse_bevorzugst_du_für_deine_fußballschuhe",
            it: "Quale fascia di prezzo preferisci per le tue scarpe da calcio?",
            de: "Welche Preisklasse bevorzugst du für deine Fußballschuhe?",
        },
        why_important: {
            de: `Warum wichtig?  
Die Wahl der Preisklasse beeinflusst die Qualität, Haltbarkeit und die verfügbaren Technologien der Fußballschuhe.
Einsteiger-Modelle sind budgetfreundlich und eignen sich für gelegentliches Spielen.
Mittelklasse-Modelle bieten ein ausgewogenes Verhältnis zwischen Preis und Leistung, ideal für regelmäßige Spieler.
Premium-Modelle bieten die fortschrittlichsten Features und Materialien, die von professionellen Spielern bevorzugt werden.`,
            it: `La scelta della fascia di prezzo influisce su qualità, durata e tecnologie disponibili: i modelli entry-level sono economici e adatti all’uso occasionale, i modelli di fascia media offrono il miglior equilibrio qualità-prezzo e quelli premium garantiscono materiali e caratteristiche avanzate usati dai professionisti.`,
        },
        options: [
            {
                eng: "einsteiger-modelle_€50_–_€100",
                it: "Modelli entry-level (€50 – €100)",
                de: "Einsteiger-Modelle (€50 – €100)",
            },
            {
                eng: "mittelklasse-modelle_€100_–_€200",
                it: "Modelli di fascia media (€100 – €200)",
                de: "Mittelklasse-Modelle (€100 – €200)",
            },
            {
                eng: "premium-modelle_über_€200",
                it: "Modelli premium (oltre €200)",
                de: "Premium-Modelle (über €200)",
            },
        ],
    },
];

// ABOVE - FIXED QUESTIONS


export const questions: QuestionsMap = {
    "casual-sneaker": casualShoes,
    "running-shoes": mountainTrekkingShoes,
    "cycling-shoes": cyclingShoes,
    "basketball-shoes": basketballShoes,
    "golf-shoes": golfShoes,
    "football-shoes": soccerShoes,
    "tennis-shoes": tennisShoes,
    "climbing-shoes": climbingShoes,
    "mountain-trekking-shoes": mountainTrekkingShoes,
    "ski-boots": skiBoots,
};
