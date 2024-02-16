# carte_fr

**Projet Architecture d'Application**     
**DAFFEF Inès & MEDDOUR Yan**      
**Classe 48 - FISA**
**ESIEA - Campus de Paris**

## Notice d'utilisation
### Pour commencer

Tout d'abord, il faut que vous clonez notre repo grâce à la commande suivante : 

```
git clone https://gitlab.esiea.fr/daffef/carte_fr.git
```

### Comment run notre application ?

Rien de plus simple ! Il suffit simplement de rentrer dans notre repo une fois qu'il est cloné, avec la commande :
```
cd ./carte_fr/
```
Vous verrez qu'à cet endroit il y a un fichier docker-compose.yml. Il nous permettra  de construire notre application grâce à Docker.
> Par contre, il est important de savoir une chose : nous utilisons MYSQL pour notre base de données. Ce qui signifie que lors du remplissage de notre BDD, l'application Spring boot va essayer d'accéder à notre BDD (qui sera encore en cours de remplissage). Ce qui signifie que notre application ne se lancera pas correctement du premier coup. 
Pour cela, il va falloir qu'on la relance une seconde fois pour qu'elle fonctionne correctement.    

Voici les commandes nécessaire pour lancer notre application : 

```
docker-compose build
docker-compose up -d
```

Il faut patienter un peu, puis ensuite lancer les commandes suivantes : 
```
docker-compose down
docker-compose up -d
```

Et enfin, vous aurez accès à notre application sur le lien suivant : ``http://localhost``.

> Il est possible que malgré tout ceci les points ne s'affichent pas sur la carte. Nous avons testé sur d'autres appareils et le temps de recupérer les données dans le ``http://localhost:8080/cities`` via notre script.js change en fonction de l'appareil. Nous vous demandons donc de réiterer l'opération down/up de docker, puis de patienter un certain temps avant de refresh la page ``http://localhost``.


## Choix architecturaux justifiés
Nous avons donc utilisé une architecture à microservices, avec un front-end séparé du back-end pour garantir une meilleure maintenabilité de l'application. Cette approche permet également une séparation claire des préoccupations entre les différentes parties de l'application, ce qui facilite le développement étant donné que nous travaillons par binôme. 
Nous avons utilisé Docker et docker-compose pour la conteneurisation pour être sûr que notre application fonctionne correctement peu importe l'appareil utilisé. 

## Langages, technologies, packages et middlewares utilisés
Nous avons utilisé les technologies suivantes :

- Front-end : HTML, CSS, JavaScript avec la librairie D3.js pour la visualisation des données géographiques, et l'API OpenWeatherMap pour récuperer la localisation de l'utilisateur.
- Back-end : Java avec Spring Boot pour l'API REST, ainsi que la gestion des données.
- Outils de développement : 
    - Base de données : MySQL pour le stockage des données géographiques.
    - Git pour la gestion de version,
    - Docker pour la conteneurisation et le déploiement de notre application,
    - Meld pour les merge Git,
    - Cypress pour les tests d'acception,
- Middleware : Utilisation d'un middleware personnalisé pour gérer les requêtes CORS.

## Avons nous pu respecter notre architecture initiale ?

1. Respect de l'architecture initiale   

Nous avons réussi à respecter notre architecture initiale dans l'ensemble, en maintenant une séparation comme demandé par l'énnoncé entre le front et le back, et en utilisant les différents outils conseillés.
Nous avons exploré diverses technologies qui étaient assez nouvelles pour nous, comme l'utilisation de Docker pour la conteneurisation, la création d'une API REST avec Spring Boot, et l'intégration de la librairie D3.js pour la visualisation des données géographiques.

2. Les bonus UI/UX   

Nous avons fait en sorte de répondre aux maximums des points pour que l'expérience utilisateur en fournissant une interface intuitive et conviviale. Nous avons utilisé les fonctionnalités de D3.js pour rendre la visualisation des données géographiques attrayante et interactive, ce qui améliore l'engagement et la satisfaction de l'utilisateur.

3. Encore plus de bonus ?    

Nous avons également exploré des solutions alternatives pour améliorer notre application. Par exemple, nous avons envisagé d'utiliser Docker Hub pour le partage d'image, mais il nous était plus simple de continuer sur notre idée de base.

4. Améliorations envisagées   

Nous nous sommes rendu compte malheureusement tardivement que l'utilisation de la base de données SQLite aurait été préférable étant donné que nous n'avons pas besoin de l'initialiser comme nous devons le faire avec notre BDD MySQL.
Nous aimerions également optimiser les performances de l'application en optimisant les requêtes et les opérations dela BDD, et en mettant en oeuvre des techniques de mise en cache pour réduire les temps de réponse. De plus, on aurait renforcé la sécurité de l'application en utilisant par exemple Docker Secret. Nous aurions dès le début configurer le CI de GitLab pour pouvoir tester régulièrement le fonctionnement de notre projet car il nous est déjà arrivé malheureusement de faire des commits qui n'étaient pas dans la continuité fonctionnelle de notre application. 
Et enfn côté front, cela aurait été intéressant de commencer à utiliser des nouvelles technologies comme React. 