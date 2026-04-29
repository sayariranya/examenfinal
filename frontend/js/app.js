const API = 'http://localhost:3000/api/propositions';

function showMessage(msg, type) {
  const el = document.getElementById('message');
  el.textContent = msg;
  el.className = `message ${type}`;
  setTimeout(() => { el.className = 'message'; }, 3000);
}

async function creerProposition() {
  const etudiant_id = document.getElementById('etudiant_id').value;
  const titre = document.getElementById('titre').value;
  const description = document.getElementById('description').value;

  if (!etudiant_id || !titre || !description)
    return showMessage('Veuillez remplir tous les champs !', 'error');

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ etudiant_id, titre, description })
    });
    const data = await res.json();
    showMessage(data.message, res.ok ? 'success' : 'error');
    if (res.ok) document.getElementById('modif_id').value = data.id;
  } catch (err) {
    showMessage('Erreur de connexion au serveur', 'error');
  }
}

async function modifierProposition() {
  const id = document.getElementById('modif_id').value;
  const titre = document.getElementById('modif_titre').value;
  const description = document.getElementById('modif_description').value;

  if (!id || !titre || !description)
    return showMessage('Veuillez remplir tous les champs !', 'error');

  try {
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titre, description })
    });
    const data = await res.json();
    showMessage(data.message, res.ok ? 'success' : 'error');
  } catch (err) {
    showMessage('Erreur de connexion au serveur', 'error');
  }
}

async function validerProposition() {
  const id = document.getElementById('modif_id').value;
  if (!id) return showMessage('Entrez un ID !', 'error');

  try {
    const res = await fetch(`${API}/${id}/valider`, { method: 'PATCH' });
    const data = await res.json();
    showMessage(data.message, res.ok ? 'success' : 'error');
  } catch (err) {
    showMessage('Erreur de connexion au serveur', 'error');
  }
}