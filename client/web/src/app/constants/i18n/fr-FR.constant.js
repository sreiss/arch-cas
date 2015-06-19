'use strict'
angular.module('archCas')
  .constant('i18nfrFRConstant', {
    TITLE_PAGE:"CAS - Service Central d'Authentification",
    TITLE_WELCOME: "Bienvenue sur le ",
    TITLE_SERVICE: "service central d'authentification",
    INPUT_USERNAME: "Identifiant",
    INPUT_PASSWORD: "Mot de passe",
    INPUT_LOGIN: "Se connecter",
    INPUT_LOGOUT: "Me déconnecter",
    ERROR_INIT: "Une erreur est survenue à l'enregistrement du client. Veuillez réiterer l'opération ultérieurement.",
    ERROR_LOGIN: "Le couple identifiant / mot de passe n'est associé à aucun compte utilisateur.",
    ALREADY_CONNECTED: "Vous êtes déjà identifié.",
    SUCCESS_LOGIN: "Félicitations ! Vous vous êtes connecté avec succés.",
    SUCCESS_LOGIN_REDIRECT: "Félicitations ! Vous vous êtes connecté avec succés, vous allez être redirigé.",
    FORGET_PASSWORD: "Mot de passe oublié",
    ERROR_EMAIL: "L'identifiant n'est associé à aucun compte utilisateur.",
    SUCCESS_RESET_PASSWORD: "Un nouveau mot de passe a été envoyé, vous allez être redirigé.",
    SEND_NEW_PASSWORD : "Envoyer un nouveau mot de passe",
    TITLE_FORGET_PASSWORD: "Entrez votre identifiant ci dessous pour obtenir un nouveau mot de passe."
  });
