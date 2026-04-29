Feature: Modification de proposition étudiant

  En tant qu'étudiant
  Je peux modifier ma proposition tant qu'elle n'a pas été validée
  Afin de corriger ou améliorer mon dossier

  Scenario: Étudiant soumet une nouvelle proposition
    Given un étudiant avec l'id 1
    When il soumet une proposition avec le titre "Mon projet" et la description "Description test"
    Then la proposition est créée avec le statut "en_attente"

  Scenario: Étudiant modifie une proposition non validée
    Given une proposition existante avec le statut "en_attente"
    When l'étudiant modifie le titre en "Nouveau titre"
    Then la modification est acceptée avec succès

  Scenario: Étudiant ne peut pas modifier une proposition validée
    Given une proposition existante avec le statut "validé"
    When l'étudiant essaie de modifier le titre en "Titre modifié"
    Then la modification est refusée avec le message "Impossible de modifier : la proposition a déjà été validée"

  Scenario: Admin valide une proposition
    Given une proposition existante avec le statut "en_attente"
    When l'admin valide la proposition
    Then le statut de la proposition devient "validé"