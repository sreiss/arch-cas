# arch-cas

Le serveur d'authentification de nos applications.

## Oauth2

Ce serveur utilise le protocole Oauth2 pour identifier les utilisateurs. Il fonctionne avec un système de jeton.
Voici quelques articles pour vous aider à comprendre Oauth2 (en anglais):
- [An Introduction To Oauth](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2) sur [Digital Ocean](https://www.digitalocean.com).
- [Beer Locker: Building a RESTful API With Node - OAuth2 Server](http://scottksmith.com/blog/2014/07/02/beer-locker-building-a-restful-api-with-node-oauth2-server/) sur [ScottSmith.com](http://scottksmith.com/).

### Enregistrement du client

Au lancement de l'application, celle-ci va vérifier si dans ses coockies elle dispose d'un élément clientId et clientSecret. Si oui, cela signifie qu'elle a déjà été enregistrée auprès du serveur d'authentification. Dans le cas contraire, celle-ci doit s'enregistrer grâce aux paramètres suivant :

* URL : POST /oauth/oauth/client
  * name : "ASCPA" (1)
  * redirect_uri : "http://www.ascpa.fr" (2)

```
{
    "message": "Client saved successfully.",
    "data": {
        "__v": 0,
        "clientSecret": "6815fd98a6d1ec8bdf96195e9cd6979af1778e3a",
        "clientId": "ASCPA_1426177377479_4342",
        "_id": "5501bd61f38f8d2545508701"
    }
}
```

(1) Il s'agit du nom de l'application cliente enregistré dans la configuration.
(2) Il s'agit de l'URL vers laquelle le serveur d'authentification va rediriger l'utilisateur après connexion.

Il est possible de re-consulter ses informations en pointant vers l'URL : GET /oauth/oauth/client/:clientId/:clientSecret.

### Enregistrement de l'utilisateur

La totalité des utilisateurs vont être centralités dans la base du données du serveur d'authentification. Il faut donc au préalable créer un compte au nouveau utilisateur à cet endroit. Pour se faire, il faut utiliser les paramètres suivant :

* URL : POST /oauth/oauth/user
  * username : "email@email.fr"
  * firstname : "First Name"
  * lastname : "Last Name"
  * email : "email@email.fr" 

```
{
    "message": "User saved successfully.",
    "data": {
        "__v": 0,
        "lastname": "Last Name",
        "firstname": "First Name",
        "username": "email@email.fr",
        "_id": "5501bc26f38f8d2545508700",
        "email": "email@email.fr"
    }
}
```

Grâce à cet ObjectId, il va vous être possible d'enregistrer les informations complémentaires de ces utilisateurs (profil ASCPA, profil carto, etc) dans les diverses bases de données. Grâce à la jointure des informations on aura les informations de connexions et du profil.

### Récupération des tokens

#### Authentification par mot de passe

L'application cliente va s'occuper de vérifier si elle dispose d'un access_token et d'un refresh_token dans ses coockies lorsque l'utilisateur souhaite accéder à une ressource privée. Si ce n'est pas le cas, il va falloir faire une demande au serveur d'authentification en spécifiant les informations suivantes :

* Header : 
  * Authorization : Basic clientId:clientSecret (3)
* URL : POST /oauth/oauth/token
  * grant_type : "password"
  * username : "email@email.fr"
  * password : "mon_mot_de_passe"

```
{
    "token_type": "bearer",
    "access_token": "4b20cbf0e8e6ab57085ba719b818abe8e486300f",
    "expires_in": 3600,
    "refresh_token": "a9d00845f22e60ef72950951db790a7a72f8371d"
}
```

Le serveur d'authentification va dans un premier temps récupérer les informations du client et vérifier son existante. Suite à cela, il va vérifier l'existance de l'utilisateur utilisant ce couple username/password. On va donc récupérer un access_token qui doit être stocké et renvoyé à chaque accès à une ressource privée. Lorsque l'access_token arrive à expiration, on va pouvoir en re-demander un nouveau en utilisant refresh_token, sans avoir à demander l'utilisateur de resaisir ses identifiants.

(3) Le couple clientId:clientSecret doit être encodé en base64.

#### Authentification par token

* Header : 
  * Authorization : Basic clientId:clientSecret*
* URL : POST /oauth/oauth/token
  * grant_type : "refresh_token"
  * refresh_token : "a9d00845f22e60ef72950951db790a7a72f8371d"

On va récupérer un objet similaire à l'authentification par mot de passe avec un nouveau access_token ainsi qu'un nouveau refresh_token.



