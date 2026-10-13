// ============================================
// TRANSLATIONS - Governor's House
// ============================================
// Pour ajouter une traduction :
// 1. Ajouter la clé dans l'objet fr
// 2. Ajouter la traduction correspondante dans l'objet en
// 3. Dans le HTML, ajouter data-i18n="la.cle" sur l'élément

var TRANSLATIONS = {
  fr: {
    // Navigation
    nav: {
      ile: "L'île",
      formules: "Formules",
      journee: "La journée",
      options: "Options",
      privatisation: "Privatisation",
      galerie: "Galerie",
      faq: "FAQ",
      cta: "Réserver"
    },

    // Hero section
    hero: {
      title: "L'île Plate",
      subtitle: "Restaurant & beach club exclusif",
      description: "Une journée hors du temps sur l'une des plus belles îles de Maurice. Gastronomie, plage privée, lagon turquoise.",
      cta_primary: "Réserver ma journée",
      cta_secondary: "Voir les formules"
    },

    // Section île
    ile: {
      eyebrow: "L'île Plate",
      title: "Hors du temps, à vue de la côte",
      description: "À 25 minutes de Grand Baie, l'île Plate reste un secret bien gardé. Pas d'hôtel, pas de foule. Juste une plage de sable blanc, un lagon peu profond et la maison du Gouverneur restaurée pour vous accueillir le temps d'une journée."
    },

    // Formules
    formules: {
      eyebrow: "Formules",
      title: "Trois façons de vivre l'île",
      reassurance: "Annulation gratuite jusqu'à 48 h · Au-delà de 25 nœuds de vent, report sans frais ou remboursement intégral.",

      gouverneur: {
        name: "Le Déjeuner du Gouverneur",
        price: "200 €/pers.",
        duration: "9h–16h · Tous les jours",
        description: [
          "Traversée en bateau rapide ou catamaran depuis Grand Baie",
          "Trois tapas raffinés dès l'arrivée sur l'île",
          "Déjeuner gastronomique de la mer : langouste, gambas, pêche du jour",
          "Vin blanc & rosé en accompagnement, softs à volonté",
          "Accès libre au lagon, matériel de snorkeling fourni"
        ]
      },

      beachclub: {
        name: "Flat Island Beach Club",
        price: "130 €/pers.",
        priceNote: "traversée incluse",
        duration: "Samedi & dimanche · 9h–17h30",
        description: [
          "Espace réservé sur la plage : transat, coussin et voile d'ombrage",
          "Service de plage en continu et serviette fraîche à l'arrivée",
          "Finger food servi en continu toute la journée",
          "Softs à volonté et cinq consommations au choix : cocktails ou bière",
          "DJ set sur la plage l'après-midi"
        ]
      },

      sable: {
        name: "Flat Island Beach Menu",
        price: "100 €/pers.",
        priceNote: "hors traversée",
        duration: "Samedi & dimanche · 10h30–17h30",
        description: [
          "Formule identique au Beach Club",
          "Pour ceux qui arrivent par leurs propres moyens",
          "Idéal pour les propriétaires de bateau ou catamaran"
        ]
      }
    },

    // Section journée
    journee: {
      eyebrow: "Une journée sur l'île",
      title: "Du départ au retour",
      switch_gouverneur: "Le Déjeuner du Gouverneur",
      switch_beachclub: "Flat Island Beach Club"
    },

    // Privatisation
    privatisation: {
      eyebrow: "Privatisation",
      title: "L'île entière pour vous",
      description: "Mariage, anniversaire, séminaire ou simplement l'envie d'être entre vous. Nous fermons le site, construisons le menu avec vous et ajustons chaque détail.",
      cta: "Demander un devis privatisation"
    },

    // FAQ
    faq: {
      eyebrow: "Questions fréquentes",
      title: "Tout ce qu'il faut savoir"
    },

    // Réservation
    reserver: {
      eyebrow: "Réservation",
      title: "Réserver votre journée",
      description: "Choisissez votre formule, sélectionnez vos options et nous vous confirmons par WhatsApp dans les plus brefs délais.",

      form: {
        formule: "Formule",
        formule_placeholder: "Choisir une formule",
        date: "Date souhaitée",
        adults: "Adultes",
        children: "Enfants (-12 ans)",
        options: "Options",
        name: "Nom complet",
        email: "Email",
        phone: "Téléphone",
        message: "Message (optionnel)",
        message_placeholder: "Régime alimentaire, demande particulière...",
        submit: "Envoyer ma demande via WhatsApp"
      },

      reassurance: "Annulation gratuite jusqu'à 48 h · Au-delà de 25 nœuds de vent, report sans frais ou remboursement intégral."
    },

    // Footer
    footer: {
      tagline: "Une journée hors du temps sur l'île Plate, Maurice.",
      links_title: "Liens rapides",
      contact_title: "Contact",
      follow_title: "Suivez-nous",
      legal: "The Governor's House - Flat Island, Maurice"
    }
  },

  en: {
    // Navigation
    nav: {
      ile: "The Island",
      formules: "Packages",
      journee: "The Day",
      options: "Options",
      privatisation: "Private Events",
      galerie: "Gallery",
      faq: "FAQ",
      cta: "Book Now"
    },

    // Hero section
    hero: {
      title: "Flat Island",
      subtitle: "Exclusive restaurant & beach club",
      description: "A timeless day on one of Mauritius' most beautiful islands. Gastronomy, private beach, turquoise lagoon.",
      cta_primary: "Book my day",
      cta_secondary: "View packages"
    },

    // Section île
    ile: {
      eyebrow: "Flat Island",
      title: "Timeless, within sight of the coast",
      description: "25 minutes from Grand Baie, Flat Island remains a well-kept secret. No hotel, no crowds. Just a white sand beach, a shallow lagoon, and the Governor's restored house to welcome you for the day."
    },

    // Formules
    formules: {
      eyebrow: "Packages",
      title: "Three ways to experience the island",
      reassurance: "Free cancellation up to 48 hours · Beyond 25 knots wind, free postponement or full refund.",

      gouverneur: {
        name: "The Governor's Lunch",
        price: "€200/pers.",
        duration: "9am–4pm · Daily",
        description: [
          "Speedboat or catamaran crossing from Grand Baie",
          "Three refined tapas upon arrival on the island",
          "Gourmet seafood lunch: lobster, prawns, catch of the day",
          "White & rosé wine pairing, unlimited soft drinks",
          "Free lagoon access, snorkeling equipment provided"
        ]
      },

      beachclub: {
        name: "Flat Island Beach Club",
        price: "€130/pers.",
        priceNote: "crossing included",
        duration: "Saturday & Sunday · 9am–5:30pm",
        description: [
          "Reserved beach area: sunbed, cushions and shade sail",
          "Continuous beach service and fresh towel on arrival",
          "Finger food served continuously throughout the day",
          "Unlimited soft drinks and five drinks of your choice: cocktails or beer",
          "DJ set on the beach in the afternoon"
        ]
      },

      sable: {
        name: "Flat Island Beach Menu",
        price: "€100/pers.",
        priceNote: "crossing not included",
        duration: "Saturday & Sunday · 10:30am–5:30pm",
        description: [
          "Same package as Beach Club",
          "For those arriving by their own means",
          "Ideal for boat or catamaran owners"
        ]
      }
    },

    // Section journée
    journee: {
      eyebrow: "A day on the island",
      title: "From departure to return",
      switch_gouverneur: "The Governor's Lunch",
      switch_beachclub: "Flat Island Beach Club"
    },

    // Privatisation
    privatisation: {
      eyebrow: "Private Events",
      title: "The entire island for you",
      description: "Wedding, anniversary, seminar or simply the desire to be among yourselves. We close the site, build the menu with you and adjust every detail.",
      cta: "Request a private event quote"
    },

    // FAQ
    faq: {
      eyebrow: "Frequently Asked Questions",
      title: "Everything you need to know"
    },

    // Réservation
    reserver: {
      eyebrow: "Booking",
      title: "Book your day",
      description: "Choose your package, select your options and we'll confirm via WhatsApp as soon as possible.",

      form: {
        formule: "Package",
        formule_placeholder: "Choose a package",
        date: "Desired date",
        adults: "Adults",
        children: "Children (under 12)",
        options: "Options",
        name: "Full name",
        email: "Email",
        phone: "Phone",
        message: "Message (optional)",
        message_placeholder: "Dietary requirements, special requests...",
        submit: "Send my request via WhatsApp"
      },

      reassurance: "Free cancellation up to 48 hours · Beyond 25 knots wind, free postponement or full refund."
    },

    // Footer
    footer: {
      tagline: "A timeless day on Flat Island, Mauritius.",
      links_title: "Quick Links",
      contact_title: "Contact",
      follow_title: "Follow Us",
      legal: "The Governor's House - Flat Island, Mauritius"
    }
  }
};
