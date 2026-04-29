const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");

let proposition = {};
let resultat = {};

// ─── GIVEN ───────────────────────────────────────────

Given("un étudiant avec l'id {int}", function (id) {
  this.etudiant_id = id;
});

Given("une proposition existante avec le statut {string}", function (statut) {
  proposition = {
    id: 1,
    etudiant_id: 1,
    titre: "Titre initial",
    description: "Description initiale",
    statut: statut,
  };
});

// ─── WHEN ────────────────────────────────────────────

When(
  "il soumet une proposition avec le titre {string} et la description {string}",
  function (titre, description) {
    proposition = {
      etudiant_id: this.etudiant_id,
      titre: titre,
      description: description,
      statut: "en_attente",
    };
    resultat = { success: true, message: "Proposition créée avec succès" };
  }
);

When("l'étudiant modifie le titre en {string}", function (nouveauTitre) {
  if (proposition.statut === "validé") {
    resultat = {
      success: false,
      message: "Impossible de modifier : la proposition a déjà été validée",
    };
  } else {
    proposition.titre = nouveauTitre;
    resultat = { success: true, message: "Proposition modifiée avec succès" };
  }
});

When(
  "l'étudiant essaie de modifier le titre en {string}",
  function (nouveauTitre) {
    if (proposition.statut === "validé") {
      resultat = {
        success: false,
        message: "Impossible de modifier : la proposition a déjà été validée",
      };
    } else {
      proposition.titre = nouveauTitre;
      resultat = { success: true, message: "Proposition modifiée avec succès" };
    }
  }
);

When("l'admin valide la proposition", function () {
  proposition.statut = "validé";
  resultat = { success: true, message: "Proposition validée avec succès" };
});

// ─── THEN ────────────────────────────────────────────

Then("la proposition est créée avec le statut {string}", function (statut) {
  assert.strictEqual(proposition.statut, statut);
});

Then("la modification est acceptée avec succès", function () {
  assert.strictEqual(resultat.success, true);
  assert.strictEqual(resultat.message, "Proposition modifiée avec succès");
});

Then(
  "la modification est refusée avec le message {string}",
  function (message) {
    assert.strictEqual(resultat.success, false);
    assert.strictEqual(resultat.message, message);
  }
);

Then("le statut de la proposition devient {string}", function (statut) {
  assert.strictEqual(proposition.statut, statut);
});
