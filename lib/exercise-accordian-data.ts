import { ExerciseSection } from "@/components/ui/exercise-accordian";

const germanFlexibilitySections: ExerciseSection[] = [
    {
        title: "Waden & Achillessehne lockern",
        content:
            "Für mehr Beweglichkeit, weniger Zugspannung und ein leichteres Ganggefühl.",
        links: [
            {
                text: "Wadenwanddehnung: Verbessert Achillessehnen-Flexibilität",
                imageUrl: require("@/assets/images/exercises/wadenwanddehnung__verbessert_sprunggelenkbeweglichkeit.png"),
            },
            {
                text: "Lunges mit Fersenfokus: Dehnt Waden & fördert Stabilität",
                imageUrl: require("@/assets/images/exercises/lunges_mit_fersenfokus__dehnt_wade_und_sehne.png"),
            },
            {
                text: "Fersensitz-Dehnung: Mobilisiert Fußrücken & entlastet Wadenbereich",
                imageUrl: require("@/assets/images/exercises/fersensitz-dehnung_mobilisiert_spann_und_zehen.png"),
            },
        ],
    },
    {
        title: "Fuß- & Unterschenkelmuskeln aktivieren",
        content:
            "Dynamische Mobilisation für bessere Kontrolle, flüssigere Bewegungen und mehr Stabilität beim Gehen und Sport.",
        links: [
            {
                text: "Fersen-/Zehengang im Wechsel: Fördert dynamische Fußkraft & Koordination",
                imageUrl: require("@/assets/images/exercises/zehengang_im_wechsel__foerdert_mobilitaet.png"),
            },
            {
                text: "Fußrollen im Stand: Aktiviert Sprunggelenk und verbessert Abrollbewegung",
                imageUrl: require("@/assets/images/exercises/fussrollen_im_stand__aktiviert_fusssohle.png"),
            },
            {
                text: "Barfußgehen auf unebenem Untergrund: Trainiert Stabilität & Reaktivität",
                imageUrl: require("@/assets/images/exercises/barfussgehen_auf_unebenem_untergrund__verbessert_natuerliche_beweglichkeit.png"),
            },
        ],
    },

    {
        title: "Dehne gezielt Fußsohle und Fußgewölbe",
        content:
            "Für mehr Entlastung, bessere Flexibilität und eine kräftigere Struktur des gesamten Fußes.",
        links: [
            {
                text: "Plantarfaszien-Dehnung im Stand: Dehnt Fußsohle & reduziert Spannung",
                imageUrl: require("@/assets/images/exercises/plantarfaszien-dehnung_im_stand__dehnt_fusssohle.png"),
            },
            {
                text: "Fußgewölbe-Dehnung auf Stufe: Fördert Flexibilität & Gewölbestabilität",
                imageUrl: require("@/assets/images/exercises/fussgewoelbe-dehnung_auf_stufe__foerdert_elastizitaet.png"),
            },
            {
                text: "Ballmassage (z. B. Igelball): Lockert Fußsohle & fördert Durchblutung",
                imageUrl: require("@/assets/images/exercises/ballmassage_z.b._igelball__loest_spannungen.png"),
            },
        ],
    },
    {
        title: "Zehen- und Fußgelenk-Mobilisation",
        content:
            "Aktiviere gezielt Zehen und Fußgelenke – für mehr Beweglichkeit, Kontrolle und ein stabiles Gangbild.",
        links: [
            {
                text: "Zehenwellen: Fördert Zehenbeweglichkeit",
                imageUrl: require("@/assets/images/exercises/zehenwellen__foerdert_zehenbeweglichkeit.png"),
            },
            {
                text: "Kreisende Fußbewegungen: Mobilisiert Sprunggelenk",
                imageUrl: require("@/assets/images/exercises/kreisende_fussbewegungen__mobilisiert_sprunggelenk.png"),
            },
            {
                text: "Zehenstrecken & -spreizen: Dehnt und aktiviert Zehenmuskeln",
                imageUrl: require("@/assets/images/exercises/zehenstrecken__-spreizen__dehnt_und_aktiviert_zehenmuskeln.png"),
            },
        ],
    },
];

const italianFlexibilitySections = [
    {
        title: "Allunga miratamente i muscoli del polpaccio e il tendine d'Achille",
        content:
            "Per una maggiore mobilità, meno tensione e una sensazione di camminata più leggera.",
        links: [
            {
                text: "Stretch alla parete per il polpaccio: Migliora la flessibilità del tendine d'Achille",
                imageUrl: require("@/assets/images/exercises/wadenwanddehnung__verbessert_sprunggelenkbeweglichkeit.png"),
            },
            {
                text: "Affondi con focus sul tallone: Allungano i polpacci e favoriscono la stabilità",
                imageUrl: require("@/assets/images/exercises/lunges_mit_fersenfokus__dehnt_wade_und_sehne.png"),
            },
            {
                text: "Stretch in posizione del tallone: Mobilizza il dorso del piede e allevia l'area del polpaccio",
                imageUrl: require("@/assets/images/exercises/fersensitz-dehnung_mobilisiert_spann_und_zehen.png"),
            },
        ],
    },
    {
        title: "Attiva l’intera area del piede e della parte inferiore della gamba",
        content:
            "Mobilizzazione dinamica per un migliore controllo, movimenti più fluidi e maggiore stabilità nella camminata e nello sport.",
        links: [
            {
                text: "Camminata alternata su talloni e punte: Favorisce forza dinamica del piede e coordinazione",
                imageUrl: require("@/assets/images/exercises/zehengang_im_wechsel__foerdert_mobilitaet.png"),
            },
            {
                text: "Rotolamento del piede in stazione eretta: Attiva la caviglia e migliora il movimento di rullata",
                imageUrl: require("@/assets/images/exercises/fussrollen_im_stand__aktiviert_fusssohle.png"),
            },
            {
                text: "Camminata a piedi nudi su terreno irregolare: Allena stabilità e reattività",
                imageUrl: require("@/assets/images/exercises/barfussgehen_auf_unebenem_untergrund__verbessert_natuerliche_beweglichkeit.png"),
            },
        ],
    },

    {
        title: "Allunga miratamente la pianta del piede e l’arco plantare",
        content:
            "Per maggiore sollievo, migliore flessibilità e una struttura complessivamente più forte del piede.",
        links: [
            {
                text: "Stretch della fascia plantare in piedi: Allunga la pianta del piede e riduce la tensione",
                imageUrl: require("@/assets/images/exercises/plantarfaszien-dehnung_im_stand__dehnt_fusssohle.png"),
            },
            {
                text: "Stretch dell’arco plantare sul gradino: Favorisce flessibilità e stabilità dell’arco",
                imageUrl: require("@/assets/images/exercises/fussgewoelbe-dehnung_auf_stufe__foerdert_elastizitaet.png"),
            },
            {
                text: "Massaggio con palla (es. palla riccio): Rilascia la pianta del piede e favorisce la circolazione",
                imageUrl: require("@/assets/images/exercises/ballmassage_z.b._igelball__loest_spannungen.png"),
            },
        ],
    },
    {
        title: "Mobilizzazione delle dita e delle articolazioni del piede",
        content:
            "Attiva miratamente le dita e le articolazioni del piede – per maggiore mobilità, controllo e un passo più stabile.",
        links: [
            {
                text: "Onde delle dita: Favoriscono la mobilità delle dita del piede",
                imageUrl: require("@/assets/images/exercises/zehenwellen__foerdert_zehenbeweglichkeit.png"),
            },
            {
                text: "Movimenti circolari del piede: Mobilizzano l’articolazione della caviglia",
                imageUrl: require("@/assets/images/exercises/kreisende_fussbewegungen__mobilisiert_sprunggelenk.png"),
            },
            {
                text: "Estensione e divaricazione delle dita: Allungano e attivano i muscoli delle dita",
                imageUrl: require("@/assets/images/exercises/zehenstrecken__-spreizen__dehnt_und_aktiviert_zehenmuskeln.png"),
            },
        ],
    },
];

const germanFootMuscleSections: ExerciseSection[] = [
    {
        title: "Waden- und Fußmuskulatur kräftigen",
        content:
            "Kräftige gezielt Waden- und Fußmuskulatur – für mehr Stabilität, Ausdauer und eine bessere Kraftübertragung bei jedem Schritt.",
        links: [
            {
                text: "Zehenhocke: Stärkt Fußmuskulatur und Wadenmuskulatur.",
                imageUrl: require("@/assets/images/exercises/zehenhocke.png"),
            },
            {
                text: "Wadenheben: Stärkt Wadenmuskulatur und Fußmuskulatur.",
                imageUrl: require("@/assets/images/exercises/wadenheben_.png"),
            },
            {
                text: "Fersenstand mit Armbewegung: Kräftigt Waden und Fußheber in koordinativer Belastung",
                imageUrl: require("@/assets/images/exercises/fersenstand_mit_armbewegung__kraeftigt_waden_und_fussheber_in_koordinativer_belastung.png"),
            },
            {
                text: "Fersen-Kick auf instabilem Untergrund: Trainiert Wadenkraft und stärkt die Stabilität der Fußmuskulatur",
                imageUrl: require("@/assets/images/exercises/fersen-kick_auf_instabilem_untergrund__trainiert_wadenkraft_und_staerkt_die_stabilitaet_der_fussmuskulatur.png"),
            },
            {
                text: "Fußstretch mit Widerstand: Stärkt Fußmuskulatur und Fußsohle.",
                imageUrl: require("@/assets/images/exercises/fussstretch_mit_widerstand_.png"),
            },
        ],
    },
    {
        title: "Allrounder Übungen",
        content: "Stärkt Fußstabilität und tiefe Fußmuskeln für die Balance.",
        links: [
            {
                text: "Band- oder Theraband-Übung: Stärkt besonders die Muskulatur des Fußgewölbes",
                imageUrl: require("@/assets/images/exercises/band-_oder_theraband-uebung_.png"),
            },
            {
                text: "Fersenheben auf einem Bein: Stärkt Fußmuskulatur und fördert das Gleichgewicht",
                imageUrl: require("@/assets/images/exercises/fersenheben_auf_einem_bein.png"),
            },
            {
                text: "Stabilisation mit der Balanceplatte: Stärkt Fußstabilität, Fußmuskulatur und Propriozeption.",
                imageUrl: require("@/assets/images/exercises/zehenwellen__foerdert_zehenbeweglichkeit.png"),
            },
        ],
    },
    {
        title: "Fußsohle stärken",
        content:
            "Stärke gezielt deine Fußsohle – für mehr Standfestigkeit, Dämpfung und ein kraftvolles Abrollen beim Gehen und Laufen.",
        links: [
            {
                text: "Handtuchgreifen mit den Zehen: Stärkt gezielt die Fußsohle und trainiert die Greifkraft der Zehen.",
                imageUrl: require("@/assets/images/exercises/handtuchgreifen_mit_den_zehen.png"),
            },
            {
                text: "Short Foot Exercise: Aktiviert und kräftigt die Muskulatur im Fußgewölbe und der Fußsohle.",
                imageUrl: require("@/assets/images/exercises/short_foot_exercise_.png"),
            },
            {
                text: "Zehenkrallen & -strecken im Wechsel: Fördert Kraft und Koordination in der Fußsohle.",
                imageUrl: require("@/assets/images/exercises/zehenkrallen__-strecken_im_wechsel.png"),
            },
            {
                text: "Einbeinstand instabil: Stärkt Fußsohle, stabilisiert das Gewölbe und fördert Körperkontrolle.",
                imageUrl: require("@/assets/images/exercises/einbeinstand_auf_instabiler_unterlage_.png"),
            },
        ],
    },
    {
        title: "Zehenmuskulatur stärken",
        content:
            "Fördert Koordination, aktiviert und kräftigt die Muskulatur der Zehen.",
        links: [
            {
                text: "Zehentrommeln: Fördert Koordination und aktiviert die gesamte Zehenmuskulatur.",
                imageUrl: require("@/assets/images/exercises/zehentrommeln.png"),
            },
            {
                text: "Einsgreifen: Stärkt Zehen- und Fußmuskulatur.",
                imageUrl: require("@/assets/images/exercises/fussgreifen_.png"),
            },
            {
                text: "Kleiner Zehenlift: Stärkt die kleinen Muskeln der Zehen.",
                imageUrl: require("@/assets/images/exercises/kleiner_zehenlift_.png"),
            },
            {
                text: "Zehenaufstellung und -wellen: Stärkt Muskulatur der Zehen und fördert deren Flexibilität.",
                imageUrl: require("@/assets/images/exercises/zehenaufstellung_und_-wellen_.png"),
            },
        ],
    },
];

const italianFootMuscleSections = [
    {
        title: "Rafforza la muscolatura di polpacci e piedi",
        content:
            "Rinforza in modo mirato la muscolatura dei polpacci e dei piedi – per maggiore stabilità, resistenza e una migliore trasmissione della forza a ogni passo.",
        links: [
            {
                text: "Squat sulle dita: Rafforza muscoli del piede e del polpaccio.",
                imageUrl: require("@/assets/images/exercises/zehenhocke.png"),
            },
            {
                text: "Sollevamento dei talloni: Rafforza polpacci e muscoli del piede.",
                imageUrl: require("@/assets/images/exercises/wadenheben_.png"),
            },
            {
                text: "Stazione sui talloni con movimento delle braccia: Rinforza polpacci e muscoli dorsali del piede in un lavoro coordinativo",
                imageUrl: require("@/assets/images/exercises/fersenstand_mit_armbewegung__kraeftigt_waden_und_fussheber_in_koordinativer_belastung.png"),
            },
            {
                text: "Calci con il tallone su superficie instabile: Allena la forza dei polpacci e migliora la stabilità della muscolatura del piede",
                imageUrl: require("@/assets/images/exercises/fersen-kick_auf_instabilem_untergrund__trainiert_wadenkraft_und_staerkt_die_stabilitaet_der_fussmuskulatur.png"),
            },
            {
                text: "Stretch del piede con resistenza: Rafforza muscoli del piede e pianta del piede.",
                imageUrl: require("@/assets/images/exercises/fussstretch_mit_widerstand_.png"),
            },
        ],
    },
    {
        title: "Esercizi tuttofare",
        content:
            "Rinforzano la stabilità del piede e i muscoli profondi per migliorare l’equilibrio.",
        links: [
            {
                text: "Esercizio con banda elastica o Theraband: Rafforza in particolare la muscolatura dell’arco plantare",
                imageUrl: require("@/assets/images/exercises/band-_oder_theraband-uebung_.png"),
            },
            {
                text: "Sollevamento dei talloni su una gamba: Rafforza i muscoli del piede e migliora l’equilibrio",
                imageUrl: require("@/assets/images/exercises/fersenheben_auf_einem_bein.png"),
            },
            {
                text: "Stabilizzazione con tavoletta propriocettiva: Rafforza stabilità del piede, muscoli plantari e propriocezione.",
                imageUrl: require("@/assets/images/exercises/zehenwellen__foerdert_zehenbeweglichkeit.png"),
            },
        ],
    },
    {
        title: "Rinforzare la pianta del piede",
        content:
            "Rinforza in modo mirato la pianta del piede – per maggiore stabilità, ammortizzazione e una spinta più potente durante camminata e corsa.",
        links: [
            {
                text: "Afferrare l’asciugamano con le dita: Rinforza la pianta del piede e la forza di presa delle dita.",
                imageUrl: require("@/assets/images/exercises/handtuchgreifen_mit_den_zehen.png"),
            },
            {
                text: "Short Foot Exercise: Attiva e rafforza la muscolatura dell’arco plantare e della pianta del piede.",
                imageUrl: require("@/assets/images/exercises/short_foot_exercise_.png"),
            },
            {
                text: "Artigliare e distendere le dita in alternanza: Favorisce forza e coordinazione nella pianta del piede.",
                imageUrl: require("@/assets/images/exercises/zehenkrallen__-strecken_im_wechsel.png"),
            },
            {
                text: "Equilibrio su una gamba in instabilità: Rafforza la pianta del piede, stabilizza l’arco e migliora il controllo corporeo.",
                imageUrl: require("@/assets/images/exercises/einbeinstand_auf_instabiler_unterlage_.png"),
            },
        ],
    },
    {
        title: "Rafforzare la muscolatura delle dita dei piedi",
        content:
            "Favorisce coordinazione, attiva e rafforza la muscolatura delle dita dei piedi.",
        links: [
            {
                text: "Tamburellare con le dita: Migliora la coordinazione e attiva tutta la muscolatura delle dita.",
                imageUrl: require("@/assets/images/exercises/zehentrommeln.png"),
            },
            {
                text: "Afferrare con le dita: Rafforza muscoli delle dita e del piede.",
                imageUrl: require("@/assets/images/exercises/fussgreifen_.png"),
            },
            {
                text: "Sollevamento del mignolo: Rafforza i piccoli muscoli delle dita.",
                imageUrl: require("@/assets/images/exercises/kleiner_zehenlift_.png"),
            },
            {
                text: "Posizionamento e onde delle dita: Rafforza la muscolatura delle dita e migliora la loro mobilità.",
                imageUrl: require("@/assets/images/exercises/zehenaufstellung_und_-wellen_.png"),
            },
        ],
    },
];

/// done until here.

const germanOverallFootSections: ExerciseSection[] = [
    {
        title: "Wadenmuskulatur stärken",
        content:
            "Fördert Kraft, Stabilität und Ausdauer der Waden für einen kraftvollen Abdruck und mehr Standfestigkeit.",
        links: [
            {
                text: "Kniebeuge barfuß (langsam) – aktiviert Fuß- und Beinmuskeln gemeinsam",
                imageUrl: require("@/assets/images/exercises/fersenheben_auf_einem_bein__kraeftigt_fussmuskulatur_und_gleichgewicht.png"),
            },
            {
                text: "Rückwärts auf instabilem Untergrund – aktiviert Füße, Rumpf und Nervensystem",
                imageUrl: require("@/assets/images/exercises/kleiner_zehenlift_-1.png"),
            },
        ],
    },
    {
        title: "Fußsohle & Fußgewölbe kräftigen",
        content:
            "Verbessert Stabilität, Dämpfung und Kraftübertragung, unterstützt ein gesundes Fußgewölbe.",
        links: [
            {
                text: "Zehenlaufen im Sand – kräftigt Zehen, Koordination und Fußgewölbe",
                imageUrl: require("@/assets/images/exercises/zehenlaufen.png"),
            },
            {
                text: "Balance auf instabilem Untergrund (z. B. Kissen) – verbessert Propriozeption und Kraft",
                imageUrl: require("@/assets/images/exercises/theraband-uebung__staerkt_das_fussgewoelbe.png"),
            },
        ],
    },
    {
        title: "Sprunggelenk mobilisieren & stabilisieren",
        content:
            "Erhöht Beweglichkeit, Reaktionsfähigkeit und schützt vor Verletzungen durch mehr Stabilität im Gelenk.",
        links: [
            {
                text: "Barfußlaufen auf Naturboden – stimuliert Sensorik, kräftigt den ganzen Fuß",
                imageUrl: require("@/assets/images/exercises/einbeinstand__trainiert_balance_und_tiefe_fussmuskeln.png"),
            },
        ],
    },
    {
        title: "Zehenmuskulatur mobilisieren & koordinieren",
        content:
            "Fördert Beweglichkeit, Koordination und Kraft der Zehen für mehr Kontrolle und Gleichgewicht.",
        links: [
            {
                text: "Achterkreisen mit dem großen Zeh – fördert Mobilität & feine Fußmotorik",
                imageUrl: require("@/assets/images/exercises/stabilisation_mit_der_balanceplatte_-1.png"),
            },
            {
                text: "Zehen blättern Seiten um – fördert Koordination und feine Fußmuskulatur",
                imageUrl: require("@/assets/images/exercises/zehen_blaettern_seiten_um.png"),
            },
        ],
    },
];

const italianOverallFootSections: ExerciseSection[] = [
    {
        title: "Rafforzare i muscoli del polpaccio",
        content:
            "Favorisce forza, stabilità e resistenza dei polpacci, migliorando la spinta e la stabilità generale.",
        links: [
            {
                text: "Squat a piedi nudi (lenti) – attiva insieme i muscoli del piede e della gamba",
                imageUrl: require("@/assets/images/exercises/fersenheben_auf_einem_bein__kraeftigt_fussmuskulatur_und_gleichgewicht.png"),
            },
            {
                text: "All’indietro su superficie instabile – attiva piedi, tronco e sistema nervoso",
                imageUrl: require("@/assets/images/exercises/kleiner_zehenlift_-1.png"),
            },
        ],
    },
    {
        title: "Rafforzare la pianta e l’arco del piede",
        content:
            "Migliora stabilità, ammortizzazione e trasmissione della forza, sostenendo un arco plantare sano.",
        links: [
            {
                text: "Camminare sulle punte nella sabbia – rafforza le dita, la coordinazione e l’arco plantare",
                imageUrl: require("@/assets/images/exercises/zehenlaufen.png"),
            },
            {
                text: "Equilibrio su superficie instabile (es. cuscino) – migliora propriocezione e forza",
                imageUrl: require("@/assets/images/exercises/theraband-uebung__staerkt_das_fussgewoelbe.png"),
            },
        ],
    },
    {
        title: "Mobilizzare e stabilizzare la caviglia",
        content:
            "Aumenta mobilità, reattività e protegge da infortuni grazie a una maggiore stabilità articolare.",
        links: [
            {
                text: "Camminare a piedi nudi su terreno naturale – stimola la sensibilità e rafforza tutto il piede",
                imageUrl: require("@/assets/images/exercises/einbeinstand__trainiert_balance_und_tiefe_fussmuskeln.png"),
            },
        ],
    },
    {
        title: "Mobilizzare e coordinare i muscoli delle dita",
        content:
            "Migliora mobilità, coordinazione e forza delle dita, favorendo controllo ed equilibrio.",
        links: [
            {
                text: "Disegnare un otto con l’alluce – migliora mobilità e motricità fine del piede",
                imageUrl: require("@/assets/images/exercises/stabilisation_mit_der_balanceplatte_-1.png"),
            },
            {
                text: "Le dita sfogliano le pagine – migliora coordinazione e muscolatura fine del piede",
                imageUrl: require("@/assets/images/exercises/zehen_blaettern_seiten_um.png"),
            },
        ],
    },
];

export {
    germanFlexibilitySections,
    italianFlexibilitySections,
    germanFootMuscleSections,
    italianFootMuscleSections,
    germanOverallFootSections,
    italianOverallFootSections,
};
