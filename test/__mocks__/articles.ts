export default async (db) => {
  await db.collection('Articles').remove({});
  await db.collection('Articles').insertMany(MockArticles).then(r => r);
};

const MockArticles = [
  {
    "dl_ref" : "AB4709350018",
    "dl_design" : "AILE DE ROTOR - 4pces",
    "dl_codefamille" : "PD",
    "dl_garantie" : 0.0,
    "dl_unitepoids" : 2.0,
    "dl_poidsnet" : 0.0,
    "dl_poidsbrut" : 0.0,
    "dl_prixach" : 6.0,
    "dl_prixven" : 20.69,
    "dl_prixttc" : 0.0,
    "dl_stat01" : "Non définie",
    "dl_stat02" : "",
    "dl_codebarre" : "",
    "dl_pays" : "",
    "categories" : [
      {
        "ar_ref" : "AB4709350018",
        "ac_categorie" : "2",
        "ac_prixven" : 13.58,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350018",
        "ac_categorie" : "3",
        "ac_prixven" : 16.45,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350018",
        "ac_categorie" : "4",
        "ac_prixven" : 13.18,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350018",
        "ac_categorie" : "8",
        "ac_prixven" : 13.58,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350018",
        "ac_categorie" : "1",
        "ac_prixven" : 20.69,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350018",
        "ac_categorie" : "5",
        "ac_prixven" : 20.69,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350018",
        "ac_categorie" : "9",
        "ac_prixven" : 13.58,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350018",
        "ac_categorie" : "7",
        "ac_prixven" : 14.26,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350018",
        "ac_categorie" : "6",
        "ac_prixven" : 16.45,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350018",
        "ac_categorie" : "10",
        "ac_prixven" : 13.58,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350018",
        "ac_categorie" : "11",
        "ac_prixven" : 14.259,
        "ct_num" : ""
      }
    ],
    "exceptions" : []
  },
  {
    "dl_ref" : "AB4709350032",
    "dl_design" : "ROUE CONIQUE",
    "dl_codefamille" : "PD",
    "dl_garantie" : 0.0,
    "dl_unitepoids" : 2.0,
    "dl_poidsnet" : 0.0,
    "dl_poidsbrut" : 0.0,
    "dl_prixach" : 24.0,
    "dl_prixven" : 55.32,
    "dl_prixttc" : 0.0,
    "dl_stat01" : "Non définie",
    "dl_stat02" : "",
    "dl_codebarre" : "",
    "dl_pays" : "",
    "categories" : [
      {
        "ar_ref" : "AB4709350032",
        "ac_categorie" : "2",
        "ac_prixven" : 36.59,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350032",
        "ac_categorie" : "3",
        "ac_prixven" : 43.24,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350032",
        "ac_categorie" : "4",
        "ac_prixven" : 35.51,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350032",
        "ac_categorie" : "8",
        "ac_prixven" : 36.59,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350032",
        "ac_categorie" : "1",
        "ac_prixven" : 55.32,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350032",
        "ac_categorie" : "5",
        "ac_prixven" : 55.32,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350032",
        "ac_categorie" : "9",
        "ac_prixven" : 36.59,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350032",
        "ac_categorie" : "7",
        "ac_prixven" : 38.42,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350032",
        "ac_categorie" : "6",
        "ac_prixven" : 43.24,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350032",
        "ac_categorie" : "10",
        "ac_prixven" : 36.59,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350032",
        "ac_categorie" : "11",
        "ac_prixven" : 38.4195,
        "ct_num" : ""
      }
    ],
    "exceptions" : []
  },
  {
    "dl_ref" : "AB4709350045",
    "dl_design" : "VIS",
    "dl_codefamille" : "PD",
    "dl_garantie" : 0.0,
    "dl_unitepoids" : 2.0,
    "dl_poidsnet" : 0.0,
    "dl_poidsbrut" : 0.0,
    "dl_prixach" : 0.0,
    "dl_prixven" : 0.1,
    "dl_prixttc" : 0.0,
    "dl_stat01" : "Non définie",
    "dl_stat02" : "",
    "dl_codebarre" : "",
    "dl_pays" : "",
    "categories" : [
      {
        "ar_ref" : "AB4709350045",
        "ac_categorie" : "2",
        "ac_prixven" : 0.07,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350045",
        "ac_categorie" : "3",
        "ac_prixven" : 0.08,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350045",
        "ac_categorie" : "4",
        "ac_prixven" : 0.07,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350045",
        "ac_categorie" : "8",
        "ac_prixven" : 0.07,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350045",
        "ac_categorie" : "9",
        "ac_prixven" : 0.07,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350045",
        "ac_categorie" : "7",
        "ac_prixven" : 0.07,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350045",
        "ac_categorie" : "6",
        "ac_prixven" : 0.08,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350045",
        "ac_categorie" : "10",
        "ac_prixven" : 0.07,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350045",
        "ac_categorie" : "11",
        "ac_prixven" : 0.0735,
        "ct_num" : ""
      }
    ],
    "exceptions" : []
  },
  {
    "dl_ref" : "AB4709350069",
    "dl_design" : "TETE",
    "dl_codefamille" : "PD",
    "dl_garantie" : 0.0,
    "dl_unitepoids" : 2.0,
    "dl_poidsnet" : 0.0,
    "dl_poidsbrut" : 0.0,
    "dl_prixach" : 83.0,
    "dl_prixven" : 138.47,
    "dl_prixttc" : 0.0,
    "dl_stat01" : "Non définie",
    "dl_stat02" : "",
    "dl_codebarre" : "",
    "dl_pays" : "",
    "categories" : [
      {
        "ar_ref" : "AB4709350069",
        "ac_categorie" : "2",
        "ac_prixven" : 94.23,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350069",
        "ac_categorie" : "3",
        "ac_prixven" : 110.87,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350069",
        "ac_categorie" : "4",
        "ac_prixven" : 91.49,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350069",
        "ac_categorie" : "8",
        "ac_prixven" : 94.23,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350069",
        "ac_categorie" : "1",
        "ac_prixven" : 138.47,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350069",
        "ac_categorie" : "5",
        "ac_prixven" : 138.47,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350069",
        "ac_categorie" : "9",
        "ac_prixven" : 94.23,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350069",
        "ac_categorie" : "7",
        "ac_prixven" : 98.94,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350069",
        "ac_categorie" : "6",
        "ac_prixven" : 110.87,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350069",
        "ac_categorie" : "10",
        "ac_prixven" : 94.23,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB4709350069",
        "ac_categorie" : "11",
        "ac_prixven" : 98.9415,
        "ct_num" : ""
      }
    ],
    "exceptions" : []
  },
  {
    "dl_ref" : "AB709350032",
    "dl_design" : "KIT PIGNON air brush",
    "dl_codefamille" : "PD",
    "dl_garantie" : 0.0,
    "dl_unitepoids" : 2.0,
    "dl_poidsnet" : 0.0,
    "dl_poidsbrut" : 0.0,
    "dl_prixach" : 21.0,
    "dl_prixven" : 53.28,
    "dl_prixttc" : 0.0,
    "dl_stat01" : "Non définie",
    "dl_stat02" : "",
    "dl_codebarre" : "",
    "dl_pays" : "",
    "categories" : [
      {
        "ar_ref" : "AB709350032",
        "ac_categorie" : "2",
        "ac_prixven" : 36.7,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB709350032",
        "ac_categorie" : "3",
        "ac_prixven" : 43.9,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB709350032",
        "ac_categorie" : "4",
        "ac_prixven" : 35.63,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB709350032",
        "ac_categorie" : "8",
        "ac_prixven" : 36.7,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB709350032",
        "ac_categorie" : "1",
        "ac_prixven" : 54.88,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB709350032",
        "ac_categorie" : "5",
        "ac_prixven" : 54.88,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB709350032",
        "ac_categorie" : "9",
        "ac_prixven" : 36.7,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB709350032",
        "ac_categorie" : "7",
        "ac_prixven" : 38.54,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB709350032",
        "ac_categorie" : "6",
        "ac_prixven" : 43.9,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB709350032",
        "ac_categorie" : "10",
        "ac_prixven" : 36.7,
        "ct_num" : ""
      },
      {
        "ar_ref" : "AB709350032",
        "ac_categorie" : "11",
        "ac_prixven" : 38.535,
        "ct_num" : ""
      }
    ],
    "exceptions" : []
  },
  {
    "dl_ref" : "ABMSS",
    "dl_design" : "AIR BRUSH PNEUMATIQUE en malette+GOM+BROSS+ECHAP+HUIL+NOTE",
    "dl_codefamille" : "OUTIL",
    "dl_garantie" : 0.0,
    "dl_unitepoids" : 2.0,
    "dl_poidsnet" : 4.0,
    "dl_poidsbrut" : 4.0,
    "dl_prixach" : 145.0,
    "dl_prixven" : 364.7,
    "dl_prixttc" : 0.0,
    "dl_stat01" : "",
    "dl_stat02" : "statmateriel",
    "dl_codebarre" : "1010101029748",
    "dl_pays" : "",
    "categories" : [
      {
        "ar_ref" : "ABMSS",
        "ac_categorie" : "2",
        "ac_prixven" : 239.9,
        "ct_num" : ""
      },
      {
        "ar_ref" : "ABMSS",
        "ac_categorie" : "3",
        "ac_prixven" : 294.75,
        "ct_num" : ""
      },
      {
        "ar_ref" : "ABMSS",
        "ac_categorie" : "4",
        "ac_prixven" : 239.9,
        "ct_num" : ""
      },
      {
        "ar_ref" : "ABMSS",
        "ac_categorie" : "8",
        "ac_prixven" : 199.88,
        "ct_num" : ""
      },
      {
        "ar_ref" : "ABMSS",
        "ac_categorie" : "5",
        "ac_prixven" : 318.55,
        "ct_num" : ""
      },
      {
        "ar_ref" : "ABMSS",
        "ac_categorie" : "9",
        "ac_prixven" : 239.9,
        "ct_num" : ""
      },
      {
        "ar_ref" : "ABMSS",
        "ac_categorie" : "7",
        "ac_prixven" : 239.9,
        "ct_num" : ""
      },
      {
        "ar_ref" : "ABMSS",
        "ac_categorie" : "6",
        "ac_prixven" : 294.75,
        "ct_num" : ""
      },
      {
        "ar_ref" : "ABMSS",
        "ac_categorie" : "10",
        "ac_prixven" : 239.9,
        "ct_num" : ""
      },
      {
        "ar_ref" : "ABMSS",
        "ac_categorie" : "11",
        "ac_prixven" : 239.9,
        "ct_num" : ""
      }
    ],
    "exceptions" : [
      {
        "ar_ref" : "ABMSS",
        "ac_categorie" : "0",
        "ac_prixven" : 199.9,
        "ct_num" : "SSSSSSSSSSSSSS"
      }
    ]
  }
];
