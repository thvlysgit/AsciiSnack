// db.js : ouvre la base SQLite et crée les tables si elles n'existent pas.
const Database = require('better-sqlite3');

const db = new Database(process.env.DB_PATH || 'snack.db');
db.pragma('foreign_keys = ON'); // sans ça, SQLite ignore les clés étrangères

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id_categorie INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL UNIQUE
  );
  CREATE TABLE IF NOT EXISTS produits (
    id_produit INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL UNIQUE,
    description TEXT,
    prix_classique INTEGER NOT NULL,   -- en centimes
    prix_adherent INTEGER NOT NULL,    -- en centimes
    quantite_stock INTEGER NOT NULL DEFAULT 0,
    est_favori INTEGER NOT NULL DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS produits_categories (
    id_produit INTEGER NOT NULL REFERENCES produits(id_produit) ON DELETE CASCADE,
    id_categorie INTEGER NOT NULL REFERENCES categories(id_categorie) ON DELETE CASCADE,
    PRIMARY KEY (id_produit, id_categorie)
  );
  CREATE TABLE IF NOT EXISTS clients (
    id_client INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    adherent INTEGER NOT NULL DEFAULT 0,
    mail TEXT NOT NULL UNIQUE
  );
  CREATE TABLE IF NOT EXISTS admins (
    identifiant TEXT PRIMARY KEY,
    mdp TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS achats (
    id_achat INTEGER PRIMARY KEY AUTOINCREMENT,
    id_client INTEGER NOT NULL REFERENCES clients(id_client),
    montant INTEGER NOT NULL,
    date TEXT NOT NULL,
    statut TEXT NOT NULL CHECK (statut IN ('validé', 'annulé'))
  );
  CREATE TABLE IF NOT EXISTS lignes_achats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    achat_id INTEGER NOT NULL REFERENCES achats(id_achat) ON DELETE CASCADE,
    produit_id INTEGER NOT NULL REFERENCES produits(id_produit),
    quantite INTEGER NOT NULL,
    prix_unitaire INTEGER NOT NULL
  );
`);

module.exports = db;