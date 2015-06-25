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
    SUCCESS_LOGIN: "Congratulations! You have successfully logged in.",
    SUCCESS_LOGIN_REDIRECT: "Congratulations! You have successfully logged in, you will be redirected.",
    FORGET_PASSWORD: "Forgot password",
    ERROR_EMAIL: "The username isn't associated with an account.",
    SUCCESS_RESET_PASSWORD: "A new password has been sent to you by email.",
    SEND_NEW_PASSWORD : "Reinitialize my password",
    TITLE_FORGET_PASSWORD: "Enter your username below to reinitialize your password.",
    BACK : "Back",
    COPYRIGHT_DEVTEAM : "ArchTailors",
    COPYRIGHT_ALL_RIGHTS_RESERVED : " - 2015 - All rights reserved."
  });
