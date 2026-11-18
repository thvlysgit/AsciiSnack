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
> option que nous trouvions la plus habituelle et "graphique"
# Web Frontend
- HTML/CSS
- Javascript
> Ne pas utiliser de framework ou technologie non étudiée est un choix stratégique pour ne pas passer trop de temps à apprendre un framework plutôt que de travailler sur l'application en elle même.
# Web Backend 
- Javascript
- ExpressJs
> Justifications similaire, nous souhaitons rester sur la technologie étudiée en cours afin de ne pas nous compliquer la tâche plus que nécessaire, surtout que dans le cadre d'un projet relativement "léger" il n'est pas vraiment nécessaire d'utiliser quelque chose de compliqué pour que ça fonctionne.
# Base de données
- SQLite 
> SQLite en + d'avoir été conseillé par l'enseignant pendant le cours est une bonne option pour gérer une base de données de petite taille efficacement.

## Les entités avec leurs champs principaux

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

ouuu (à voir) :
# Produits
- id
- nom
- description
- types (boisson ou nourriture)
- prix_classique
- prix_adherent
- quantite_stock
- indice_popularite

# Liste des Clients
- id
- nom
- prénom
- adhérent booléen

# Utilisateurs
- id
- identifiant
- mdp
- role (admin ou operateur)

# Achats
- id
- ID client
- montant de la transaction
- date
- statut (validé ou annulé)

# Lignes Achats (produits contenus dans un achat)
- id
- achat_id
- produit_id
- quantite
- prix_unitaire

## Les relations : les 2 relations 1-N (ou plus) et la relation N-N.
# Relations 1-N
Clients - Achats
- Un client peut effectuer plusieurs achats
- Un achat appartient qu'à un seul client

Achats - Lignes Achats
- Un achat contient une ou plusieurs lignes d'achat
- Une ligne d'achat appartient à un seul achat

# Relation N-N
Achats - Produits
- Un achat peut contenir plusieurs produits
- Un produit peut apparaître dans plusieurs achats
-> Cette relation est réalisé grâce à Lignes Achats

## Les entités A et B, entièrement gérables (F1 à F10).
# Entité A : Produits
- F1 - Ajouter : ajouter un nouveau produit
- F2 - Consulter : afficher la liste des produits
- F3 - Détail produit : nom, type, prix classique, prix adhérent, stock disponible,...
- F4 : Modifier : modifier les informations d'un produit déjà existant
- F5 : Supprimer : supprimer un produit du catalogue

# Entité B : Clients
- F6 - Créer : ajouter un nouveau client avec son nom/prénom et son statut d'adhérent
- F7 - Lire : afficher la liste des clients et consulter leurs informations
- F8 - Page de détail : informations complètes et achats associés d'un client
- F9 - Modifier : modifier les informations du client
- F10 - Supprimer : supprimer un client

## Le contenu du seed (D4) : quelles données seront présentes au lancement.
- 10 clients (adhérents/non-adhérents)
- 5 nourritures (prix classique, prix adhérents, un stock)
- 5 boissons    ( """ )
- 10 transactions factices 

## Ce qui est mis en avant sur la page d'accueil (F13 et F14).
> Les 5 Boissons et Nourritures (carrousel) avec l'indice de popularité le plus élevé. (statique si pas d'indices de popularité)