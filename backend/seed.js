// Remplit la base de données avec les données de départ.

const db = require('./db'); // Crée les tables

// Vérification que la base n'a pas déjà de données
if (db.prepare('SELECT COUNT(*) AS n FROM produits').get().n > 0) {
    console.log('Seed ignoré : la base contient déjà des données.');
    process.exit(0);
}

// DONNEES
const categories = [
    'Nourriture', 'Boisson', 'Sucré', 'Salé', 'Vegan', 'Boisson chaude', 'Boisson froide',
];

// PRIX EN CENTIMES
// nom , description , prix classique , prix adhérent , stock , favori , catégories
const listeProduits = [
    // 5 nourritures
    ['Barre chocolatée', 'Barre au chocolat au lait', 100, 80, 40, 1, ['Nourriture', 'Sucré']],
    ['Paquet de chips', 'Chips nature', 120, 100, 30, 1, ['Nourriture', 'Salé', 'Vegan']],
    ['Cookie', 'Cookie aux pépites de chocolat', 150, 120, 25, 0, ['Nourriture', 'Sucré']],
    ['Sandwich jambon-beurre', 'Baguette, jambon, beurre', 300, 250, 15, 1, ['Nourriture', 'Salé']],
    ['Barre de céréales', 'Céréales et miel', 90, 70, 35, 0, ['Nourriture', 'Sucré', 'Vegan']],
    // 5 boissons
    ['Canette de soda', 'Soda au cola 33 cl', 120, 100, 50, 1, ['Boisson', 'Sucré', 'Boisson froide']],
    ["Bouteille d'eau", 'Eau minérale 50 cl', 80, 60, 60, 0, ['Boisson', 'Vegan', 'Boisson froide']],
    ['Café', 'Café expresso', 70, 50, 100, 1, ['Boisson', 'Boisson chaude', 'Vegan']],
    ['Thé', 'Thé noir', 70, 50, 80, 0, ['Boisson', 'Boisson chaude', 'Vegan']],
    ["Jus d'orange", 'Pur jus 25 cl', 150, 120, 20, 0, ['Boisson', 'Boisson froide', 'Vegan']],
];

// nom , prenom , adherent , mail
const clients = [
    ['Martin', 'Léa', 1, 'lea.martin@example.com'],
    ['Bernard', 'Hugo', 1, 'hugo.bernard@example.com'],
    ['Dubois', 'Emma', 0, 'emma.dubois@example.com'],
    ['Thomas', 'Lucas', 1, 'lucas.thomas@example.com'],
    ['Robert', 'Chloé', 0, 'chloe.robert@example.com'],
    ['Richard', 'Nathan', 1, 'nathan.richard@example.com'],
    ['Petit', 'Manon', 0, 'manon.petit@example.com'],
    ['Durand', 'Louis', 1, 'louis.durand@example.com'],
    ['Leroy', 'Camille', 0, 'camille.leroy@example.com'],
    ['Moreau', 'Jules', 1, 'jules.moreau@example.com'],
];

// numéro du client (position dans le tableau clients) , date , statut , [[produit, quantité], ...]
const achats = [
    [0, '2026-10-05', 'validé', [['Café', 2], ['Cookie', 1]]],
    [1, '2026-10-06', 'validé', [['Canette de soda', 1], ['Paquet de chips', 1]]],
    [2, '2026-10-07', 'validé', [['Sandwich jambon-beurre', 1], ["Bouteille d'eau", 1]]],
    [3, '2026-10-08', 'annulé', [["Jus d'orange", 2]]],
    [4, '2026-10-09', 'validé', [['Barre chocolatée', 3]]],
    [5, '2026-10-12', 'validé', [['Café', 1], ['Barre de céréales', 2]]],
    [6, '2026-10-13', 'validé', [['Thé', 1], ['Cookie', 2]]],
    [7, '2026-10-14', 'validé', [['Canette de soda', 2], ['Sandwich jambon-beurre', 1]]],
    [8, '2026-10-15', 'annulé', [['Paquet de chips', 2]]],
    [9, '2026-10-16', 'validé', [['Café', 3], ['Barre chocolatée', 1]]],
];

// REQUETES PREPAREES 

const insCategorie = db.prepare('INSERT INTO categories (nom) VALUES (?)');

const insProduit = db.prepare(
    `INSERT INTO produits (nom, description, prix_classique, prix_adherent, quantite_stock, est_favori)
     VALUES (?, ?, ?, ?, ?, ?)`
);

const insLien = db.prepare(
    'INSERT INTO produits_categories (id_produit, id_categorie) VALUES (?, ?)'
);

const insClient = db.prepare(
    'INSERT INTO clients (nom, prenom, adherent, mail) VALUES (?, ?, ?, ?)'
);

const insAchat = db.prepare(
    'INSERT INTO achats (id_client, montant, date, statut) VALUES (?, ?, ?, ?)'
);

const insLigne = db.prepare(
    'INSERT INTO lignes_achats (achat_id, produit_id, quantite, prix_unitaire) VALUES (?, ?, ?, ?)'
);

const retirerStock = db.prepare(
    'UPDATE produits SET quantite_stock = quantite_stock - ? WHERE id_produit = ?'
);

// INSERTION (dans une transaction : tout réussit ou rien n'est écrit)

const seed = db.transaction(() => {

    // 1. Catégories (on garde l'id de chacune pour les lier aux produits)
    const idCategorie = {};
    for (const nom of categories) {
        idCategorie[nom] = insCategorie.run(nom).lastInsertRowid;
    }

    // 2. Produits, puis liens produit <-> catégories
    const produit = {}; // pour retrouver un produit par son nom
    for (const [nom, description, prixClassique, prixAdherent, stock, favori, cats] of listeProduits) {
        const idProduit = insProduit.run(
            nom, description, prixClassique, prixAdherent, stock, favori
        ).lastInsertRowid;

        produit[nom] = { id: idProduit, classique: prixClassique, adherent: prixAdherent };

        for (const cat of cats) {
            insLien.run(idProduit, idCategorie[cat]);
        }
    }

    // 3. Clients (on garde les id dans l'ordre du tableau)
    const idClient = [];
    for (const [nom, prenom, adherent, mail] of clients) {
        idClient.push(insClient.run(nom, prenom, adherent, mail).lastInsertRowid);
    }

    // 4. Achats, puis leurs lignes
    for (const [numClient, date, statut, lignes] of achats) {
        const estAdherent = clients[numClient][2] === 1;

        // On calcule d'abord les lignes (prix adhérent ou classique)
        const lignesCalculees = lignes.map(([nomProduit, quantite]) => ({
            produitId: produit[nomProduit].id,
            quantite,
            prix: estAdherent ? produit[nomProduit].adherent : produit[nomProduit].classique,
        }));

        // Montant = somme des (quantité * prix)
        const montant = lignesCalculees.reduce((somme, l) => somme + l.quantite * l.prix, 0);

        const idAchat = insAchat.run(idClient[numClient], montant, date, statut).lastInsertRowid;

        for (const l of lignesCalculees) {
            insLigne.run(idAchat, l.produitId, l.quantite, l.prix);
            // Un achat annulé ne consomme pas de stock
            if (statut === 'validé') {
                retirerStock.run(l.quantite, l.produitId);
            }
        }
    }
});

seed();
console.log('Seed terminé');