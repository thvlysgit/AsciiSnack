## Le pitch
> Une super application qui permet de garder un inventaire du snack du BDE Ascii ainsi que notifier les opérateurs de celui-ci des demandes des élèves. L'application permet également une visualisation des statistiques d'achat et des performances du Snack.

## Les membres du groupe
- Célia NUGEYRE
- Gabriel BEURRIER
- Thomas BARTHOIS

## La stack technique, et pourquoi
La stack technique se limitera aux technologies suivantes :
# Versioning :
- git
- github
# Web Frontend
- HTML/CSS
- Javascript
# Web Backend 
- Javascript
- ExpressJs
# Base de données
- SQLite 

## Les entités avec leurs champs principaux
# Achats
- montant de la transaction
- tab[produits]
- ID client
- date

# Boissons
- prix classique
- prix adhérent
- quantité en stock
- (indice de popularité)

# Nourritures
- prix classique
- prix adhérent
- quantité en stock
- (indice de popularité)

# Liste des Clients
- nom
- prénom
- adhérent booléen



## Les relations : les 2 relations 1-N (ou plus) et la relation N-N.
# Relations 1-N
- 
- 
## Les entités A et B, entièrement gérables (F1 à F10).

## Le contenu du seed (D4) : quelles données seront présentes au lancement.
- 10 utilisateurs
- 5 nourritures
- 5 boissons
- 10 transactions factices 

## Ce qui est mis en avant sur la page d'accueil (F13 et F14).
> Les 5 Boissons et Nourritures (carrousel) avec l'indice de popularité le plus élevé. (statique si pas d'indices de popularité)