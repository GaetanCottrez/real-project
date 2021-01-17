export default async (db) => {
  await db.collection('Customers').remove({});
  await db.collection('Customers').insertMany(MockCustomers).then(r => r);
};

const MockCustomers = [
  {
    "ct_num" : "NEGOLOCVP45",
    "ct_intitule" : "SARL NEGOLOC VP45",
    "ct_type" : "0",
    "ct_qualite" : "PROSPECT",
    "ct_classement" : "SARL NEGOLOC VP45",
    "n_cattarif" : "1",
    "ct_contact" : "",
    "ct_adresse" : "Z.A. LES AILES",
    "ct_complement" : "RN7",
    "ct_codepostal" : "45680",
    "ct_ville" : "DORDIVES",
    "ct_pays" : "France",
    "ct_ape" : "",
    "ct_identifiant" : "",
    "ct_siret" : "50996723800015",
    "ct_telephone" : "06.48.22.18.64",
    "ct_email" : "negolocvp45@orange.fr",
    "ct_site" : "",
    "ct_sommeil" : "0",
    "ct_controlenc" : "1",
    "ct_commentaire" : "CREE 01/2009- VERT-A-75",
    "co_no" : 999,
    "account" : "normal",
    "delivery_adresses" : [
      {
        "id" : "06e2e15e-745b-47cc-a9cb-bfb6f1ff4386",
        "li_no" : "13162",
        "li_intitule" : "SARL NEGOLOC VP45",
        "li_adresse" : "Z.A. LES AILES",
        "li_complement" : "RN7",
        "li_codepostal" : "45680",
        "li_ville" : "DORDIVES",
        "li_pays" : "France",
        "li_principal" : "0",
        "li_contact" : "",
        "li_telephone" : "06.48.22.18.64"
      },
      {
        "id" : "06e2e15e-745b-47cc-a9cb-bfb6f1ff4385",
        "li_no" : "13163",
        "li_intitule" : "NEGOLOC VP45- GARAGE RENAULT",
        "li_adresse" : "115 AVENUE DU MARECHAL LECLERC",
        "li_complement" : "",
        "li_codepostal" : "77460",
        "li_ville" : "SOUPPES/LOING",
        "li_pays" : "",
        "li_principal" : "1",
        "li_contact" : "",
        "li_telephone" : ""
      }
    ],
    "history" : []
  }
];
