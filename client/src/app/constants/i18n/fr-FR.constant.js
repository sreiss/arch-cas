'use strict'
angular.module('archCas')
  .constant('i18nfrFRConstant', {
    TITLE_PAGE:"CAS - Service Central d'Authentification",
    TITLE_WELCOME: "Bienvenue sur le ",
    TITLE_SERVICE: "service central d'authentification",
    INPUT_USERNAME: "Identifiant",
    INPUT_PASSWORD: "Mot de passe",
    INPUT_LOGIN: "Se connecter",
    ERROR_INIT: "Une erreur est survenue à l'enregistrement du client. Veuillez réiterer l'opération ultérieurement.",
    ERROR_LOGIN: "Le couple identifiant / mot de passe n'est associé à aucun compte utilisateur.",
    ALREADY_CONNECTED: "Vous êtes déjà identifié.",
    SUCCESS_LOGIN: "Félicitations ! Vous vous êtes connecté avec succés.",
    SUCCESS_LOGIN_REDIRECT: "Félicitations ! Vous vous êtes connecté avec succés, vous allez être redirigé."
  });
