# carte_fr

###### Projet Architecture d'Application     
###### DAFFEF Inès & MEDDOUR Yan      
###### Classe 48 - FISA
###### ESIEA - Campus de Paris

## Pour commencer

Tout d'abord, il faut que vous clonez notre repo grâce à la commande suivante : 

```
git clone https://gitlab.esiea.fr/daffef/carte_fr.git
```

## Comment run notre application ?

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