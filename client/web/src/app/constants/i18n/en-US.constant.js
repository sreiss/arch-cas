'use strict'
angular.module('archCas')
  .constant('i18nenUSConstant', {
    TITLE_PAGE:"CAS - Central Service Authentication",
    TITLE_WELCOME: "Welcome on the",
    TITLE_SERVICE: "central service authentication",
    INPUT_USERNAME: "Username",
    INPUT_PASSWORD: "Password",
    INPUT_LOGIN: "Log in",
    INPUT_LOGOUT: "Log out",
    ERROR_INIT: "An error ocured while saving current client. Please, repeat the operation later.",
    ERROR_LOGIN: "The couple username / password isn't associated with any user account.",
    ALREADY_CONNECTED: "You are already connected.",
    SUCCESS_LOGIN: "Félicitations ! Vous vous êtes connecté avec succés.",
    SUCCESS_LOGIN_REDIRECT: "Félicitations ! Vous vous êtes connecté avec succés, vous allez être redirigé."
  });
