const questions = [
  {
    question: "Qui doit cadenasser un équipement :",
    options: {
      a: "Le contremaître seulement",
      b: "Une personne de l'équipe qui doit travailler sur l'équipement",
      c: "Seulement l'opérateur de l'équipement",
      d: "Chaque personne qui est en contact direct avec l'équipement et qui doit effectuer un travail de réparation, d'entretien ou de déblocage",
    },
    mark: 3,
    answer: "d",
  },
  {
    question: "Lors du cadenassage d'un équipement :",
    options: {
      a: "Seulement les cadenas en place donnent une sécurité absolue",
      b: "Après avoir effectué le cadenassage, désamorcer les sources d'énergie et demander un test de démarrage",
      c: "Seulement la console d'opération doit être cadenassée",
      d: "Après avoir cadenassé la clé de protection, on doit effectuer la réparation. Le test de démarrage n'est pas obligatoire",
    },
    mark: 3,
    answer: "b",
  },
  {
    question: "L'employeur doit s'assurer que tout travailleur :",
    options: {
      a: "Ne se livre pas à des compétitions pendant le travail;",
      b: "Soit prévenu des risques propres à son travail;",
      c: "Soit surveillé par un compagnon;",
      d: "Porte en tout temps des gants de travail.",
    },
    mark: 3,
    answer: "b",
  },
  {
    question:
      "Peut-on nettoyer les vêtements que l'on porte avec un jet d'air :",
    options: {
      a: "Oui, car c'est plus rapide",
      b: "Oui, si le comité de santé a approuvé les équipements",
      c: "Non, car cela pourrait occasionner des blessures",
      d: "Non, sauf si la pression d'air est moins de 60 lbs/po²",
    },
    mark: 3,
    answer: "c",
  },
  {
    question: "Le monoxyde de carbone :",
    options: {
      a: "Est un gaz inoffensif",
      b: "Est gris et est légèrement plus lourd que l'air",
      c: "Est un gaz toxique, incolore et inodore",
      d: "A une odeur désagréable",
    },
    mark: 3,
    answer: "c",
  },
  {
    question: "Quel signal représente l'immobilisation",
    images: ["/public/images/Q-6.png"],
    options: {
      a: "a",
      b: "b",
      c: "c",
      d: "d",
    },
    mark: 3,
    answer: "b",
  },
  {
    question:
      " l'aide de la charte ci-dessous, quelle serait la charge maximale pour une élingue de type 1 largeur de 2 pouce pli double attache à panier",
    images: ["/public/images/Q-7.png"],
    options: {
      a: "12.400 lbs",
      b: "15.600 lbs",
      c: "29.400 lbs",
      d: "6.200 lbs",
    },
    mark: 3,
    answer: "a",
  },
  {
    question: "L'utilisation de l'appareil Ohmmètre permet d'obtenir",
    images: ["/public/images/Q-8-9-10.png"],
    options: {
      a: "La résistance",
      b: "La quantité de courant en circulation",
      c: "Une chute de pression électrique (voltage)",
      d: "La puissance en watts",
    },
    mark: 1,
    answer: "a",
  },
  {
    question: "L'utilisation de l'appareil Voltmètre permet d'obtenir",
    images: ["/public/images/Q-8-9-10.png"],
    options: {
      a: "La résistance",
      b: "La quantité de courant en circulation",
      c: "Une chute de pression électrique (voltage)",
      d: "La puissance en watts",
    },
    mark: 1,
    answer: "c",
  },
  {
    question: "L'utilisation de l'appareil Ampèremètre permet d'obtenir",
    images: ["/public/images/Q-8-9-10.png"],
    options: {
      a: "La résistance",
      b: "La quantité de courant en circulation",
      c: "Une chute de pression électrique (voltage)",
      d: "La puissance en watts",
    },
    mark: 1,
    answer: "b",
  },
  {
    question: "Ce diagramme présente un circuit",
    images: ["/public/images/Q-11.png"],
    options: {
      a: "Série",
      b: "Parallèle",
      c: "Intégré",
      d: "Mixte",
    },
    mark: 1,
    answer: "a",
  },
  {
    question:
      "Nommez les trois dispositifs de protection employés pour protéger les circuits électriques",
    options: {
      a: "Fusible, fil fusible, interrupteur au mercure",
      b: "Fusible, fil fusible, coupe-circuit",
      c: "Fil fusible, coupe-circuit, couvre fil fondant",
    },
    mark: 1,
    answer: "b",
  },
  {
    question:
      "Trouvez la lettre qui résume bien la cause du bris suivant : les lampes (hautes et basses) du faisceau avant sont faibles lorsque le moteur est en marche",
    options: {
      a: "Haute résistance dans le circuit ou mauvaise masse",
      b: "Batterie fortement déchargée",
      c: "La fusible est grillée",
      d: "Un des filaments est complètement brlé dans la lampe",
    },
    mark: 1,
    answer: "a",
  },
  {
    question: "L'image ci-contre, représente la vérification",
    images: ["/public/images/Q-14.png"],
    options: {
      a: "D'une diode, le courant doit passer dans les deux sens",
      b: "D'une diode, le courant doit passer dans un sens seulement",
      c: "D'un transistor, le courant doit passer dans les deux sens",
      d: "D'un transistor, le courant doit passer dans un sens seulement. La vérification suivante permet de mesurer",
    },
    mark: 1,
    answer: "b",
  },
  {
    question: "L’alternateur produit du courant ",
    options: {
      a: "Alternatif et rectifié par des diodes",
      b: "Continu dans le stator",
      c: "Alternatif deux phase",
      d: "Alternatif trois alternances",
    },
    mark: 1,
    answer: "a",
  },
  {
    question:
      "Identifiez la ou les possibilités de défectuosité. Le problème est que la lampe témoin de l’alternateur s’allume faiblement ou scintille :",
    options: {
      a: "Résistance excessive dans le fil de la batterie au régulateur de l’alternateur",
      b: "Résistance excessive à l’intérieur du régulateur",
      c: "Alternateur défectueux",
      d: "Batterie surchargée",
      e: "Batterie déchargée partiellement",
      f: "A, B, et C comme réponses",
    },
    mark: 1,
    answer: "f",
  },
  {
    question: "Ce raccord hydraulique est de type :",
    images: ["/public/images/Q-20.png"],
    options: {
      a: 'Droit Boss "O" ring mâle et N. P. T. F. mâle',
      b: 'Droit Boss "O" ring mâle et J. I. C. mâle',
      c: "Droit N. P. T. F mâle et J. I. C. mâle",
      d: "Droit N. P. T. mâle et B. S. P.",
      e: "Droit N. P. T",
    },
    mark: 1,
    answer: "b",
  },
  {
    question: "Ce raccord hydraulique est de type :",
    images: ["/public/images/Q-21.png"],
    options: {
      a: "Raccord métrique",
      b: "Raccord B.S.P.",
      c: 'Raccord Boss "O" ring',
      d: "Raccord N.P.T.F",
      e: "Raccord N.P.T",
    },
    mark: 1,
    answer: "d",
  },
  {
    question: "Identifier le symbole de la pièce n° 1 du schéma ci-dessous :",
    images: ["/public/images/Q-22-23.png"],
    options: {
      a: "Un limiteur de moteur",
      b: "Un régulateur amortisseur",
      c: "Un limiteur principal",
      d: "Une soupape de gavage",
    },
    mark: 1,
    answer: "c",
  },
  {
    question: "Identifier le symbole de la pièce n° 2 du schéma ci-dessus :",
    images: ["/public/images/Q-22-23.png"],
    options: {
      a: "Réservoir pressurisé",
      b: "Manomètre",
      c: "Thermomètre",
      d: "Accumulateur liquide-gaz avec séparation",
    },
    mark: 1,
    answer: "d",
  },
  //30
  {
    question:
      "Quel serait l’équivalent dans le système métrique d’une pression de 14.2 lbs/po²",
    options: {
      a: "1 kilo pascal",
      b: "1 bar",
      c: "1 mètre-kilogramme",
      d: "1 kilogramme/cm²",
    },
    mark: 1,
    answer: "d",
  },
  //32
  {
    question:
      "Quel avantage à l’utilisation de l’air comprimé comme source d’énergie :",
    options: {
      a: "Pas besoin d’huile",
      b: "Capacité d’absorber une grande quantité d’énergie",
      c: "Pas besoin de soupape de sécurité",
      d: "Pas bruyant",
    },
    mark: 1,
    answer: "b",
  },
  //33
  {
    question:
      "Comment est exprimé le débit d’air que peut fournir un compresseur ",
    options: {
      a: "P.S.I",
      b: "BAR",
      c: "CFM",
      d: "KPA",
    },
    mark: 1,
    answer: "c",
  },
  //40
  {
    question:
      "Un moteur quatre temps fonctionne par répétition du cycle composé des quatre temps suivants :",
    options: {
      a: "1-Compression, 2-Échappement, 3-Détente temps moteur, 4-Admission",
      b: "1-Détente temps moteur, 2-Admission, 3-Échappement, 4-Compression",
      c: "1-Admission, 2-Compression, 3-Détente temps moteur, 4-Échappement",
      d: "1-Compression, 2-Admission, 3-Échappement, 4-Détente temps moteur",
    },
    mark: 1,
    answer: "c",
  },
  //41
  {
    question:
      "De quel matériau est généralement fait le bâti d’un bloc-cylindres utilisé dans les moteurs diesels :",
    options: {
      a: "Aluminium",
      b: "Fonte",
      c: "Galvanisé",
      d: "Fer",
    },
    mark: 1,
    answer: "b",
  },
  //46
  {
    question:
      "Un capteur de température défectueux peut-il empêcher le moteur de démarrer :",
    options: {
      a: "Vrais  ",
      b: "Faux",
    },
    mark: 1,
    answer: "b",
  },
  {
    question:
      "Les bris de joint universel et de roulement central ainsi que les vibrations de l’arbre de commande sont causés par :",
    options: {
      a: "Des fourches desserrées",
      b: "L’arbre de commande plié",
      c: "Des poids d’équilibrage manquants",
      d: "Toutes ces réponses",
    },
    mark: 1,
    answer: "d",
  },
  {
    question:
      "À l’aide des deux images ci-dessous veuillez indiquer lequel des deux arbres de commande (drive-shaft) est monté correctement",
    images: ["/public/images/Q-47.png"],
    options: {
      a: "A",
      b: "B",
    },
    mark: 1,
    answer: "a",
  },
  {
    question:
      "Lorsque vous lubrifiez un joint universel, la graisse fraîche sort des joints d’étanchéité des quatre tourillons. Lequel des énoncés est vrai :",
    options: {
      a: "Les coussinets sont usés et devront être remplacés",
      b: "Les joints d’étanchéité sont usés et devront être remplacés",
      c: "Les tourillons sont usés et le joint devra être remplacé",
      d: "Le joint est bien lubrifié",
    },
    mark: 1,
    answer: "d",
  },
  {
    question:
      "Lequel des énoncés suivants indique que le niveau est bon lors de la vérification du niveau d’huile dans le boîtier avec le bouchon de remplissage enlevé :",
    options: {
      a: "L’huile sort de l’orifice de remplissage",
      b: "Le niveau est égal au bas de l’orifice de remplissage",
      c: "Le niveau est à une longueur de doigt plié de l’orifice de remplissage",
      d: "Le niveau est à un pouce de l’orifice de remplissage",
    },
    mark: 1,
    answer: "b",
  },
  {
    question:
      "Quelle est la manière habituelle de supporter l’arbre d’entrée du boîtier de différentiel dans le devant du pignon :",
    options: {
      a: "Coussinet",
      b: "Roulement à rouleau conique simple",
      c: "Roulements à rouleau conique face à face",
      d: "Roulement à billes",
    },
    mark: 1,
    answer: "c",
  },
  {
    question:
      "Laquelle des réponses suivantes pourrait constituer un facteur du rapport de réduction dans le boîtier du différentiel :",
    options: {
      a: "Le nombre de dents sur la couronne",
      b: "Le nombre de cannelures sur le planétaire",
      c: "Le nombre de dents sur les satellites",
      d: "Le nombre de dents sur les planétaires",
    },
    mark: 1,
    answer: "a",
  },
  {
    question:
      "Quel serait le meilleur taraud pour démarrer le taraudage d’un trou :",
    options: {
      a: "Taraud finisseur",
      b: "Taraud injecteur",
      c: "Taraud ébaucheur",
    },
    mark: 1,
    answer: "c",
  },
  {
    question:
      "Quand le foret est prêt à déboucher la pièce à percer, que faites-vous :",
    options: {
      a: "Augmenter la pression appliquée",
      b: "Diminuer la pression appliquée",
      c: "Maintenir la même pression",
      d: "Effectuer un rebondissement sur le foret pour qu’il n’accroche pas",
    },
    mark: 1,
    answer: "b",
  },
  {
    question:
      "Quand vous utilisez un extracteur de vis (eazy-out), quelle est la chose à faire :",
    options: {
      a: "Appliquer beaucoup de force",
      b: "Chauffer l’extracteur",
      c: "Évitez d’appliquer beaucoup de force",
    },
    mark: 1,
    answer: "c",
  },
  {
    question: "Le choix d’une électrode se fait en premier lieu selon :",
    options: {
      a: "La position de soudage",
      b: "L’intensité du courant",
      c: "La forme du joint à souder",
      d: "Le métal à souder",
    },
    mark: 1,
    answer: "d",
  },
  {
    question:
      "Vous devez souder à plat un assemblage de plaques en acier doux. Quelle gamme d’intensité devra se situer votre ajustement d’ampérage si les électrodes utilisées sont des E-4824/E-7024 de 3.2 de diamètre",
    options: {
      a: "70-110 ampères",
      b: "90-135 ampères",
      c: "140-180 ampères",
      c: "180-220 ampères",
    },
    mark: 1,
    answer: "b",
  },
  {
    question:
      "Lorsque vous soudez en CC polarité inversée, le câble de l’électrode est branché à:",
    options: {
      a: "La borne positive (+)",
      b: "La borne négative (-)",
      c: "La borne AC",
      c: "La prise de masse",
    },
    mark: 1,
    answer: "b",
  },
  {
    question: "La valve sur la bouteille d’oxygène doit être ouverte",
    options: {
      a: "À moitié",
      b: "Au complet",
      c: "De deux tours",
    },
    mark: 1,
    answer: "b",
  },
  {
    question:
      "Vous devez faire un préchauffage sur une grosse pièce de métal avec un chalumeau oxyacétylénique, la buse employée est à plusieurs flammes.     Quelle pression ne faut-il pas dépasser dans l’ajustement de l’acétylène pour éviter tous risques d’explosion",
    options: {
      a: "100 kpa (15 psi)",
      b: "110 kpa (16 psi)",
      c: "120 kpa (17 psi)",
      d: "130 kpa (18 psi)",
    },
    mark: 1,
    answer: "a",
  },

  {
    question:
      "L’acier inoxydable peut se couper avec le procédé oxyacétylénique",
    options: {
      a: "Vrais",
      b: "Faux",
    },
    mark: 1,
    answer: "b",
  },
  {
    question:
      "Tout panneau ou autocollant endommagé, illisible ou manquant sur les machines doit être remplacé",
    options: {
      a: "Vrais",
      b: "Faux",
    },
    mark: 1,
    answer: "a",
  },
  {
    question:
      "Lors de la préparation d’une machine au levage et au calage, il n’est pas nécessaire de veiller à ce que la machine soit exempte de tout matériel ayant été utilisé pour transporter, creuser ou porter à condition qu’il soit tenu compte du poids supplémentaire",
    options: {
      a: "Vrais",
      b: "Faux",
    },
    mark: 1,
    answer: "b",
  },
  {
    question:
      "Il faut consulter le manuel d’entretien avant d’essayer de soulever une machine",
    options: {
      a: "Vrais",
      b: "Faux",
    },
    mark: 1,
    answer: "a",
  },
  {
    question:
      "En stationnant une machine avant de la lever et la soutenir sur les chandelles, n’importe quelle surface plane suffit",
    options: {
      a: "Vrais",
      b: "Faux",
    },
    mark: 1,
    answer: "b",
  },
];
