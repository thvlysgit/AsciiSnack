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
    prix_classique INTEGER NOT NULL CHECK (prix_classique >= 0),  -- centimes
    prix_adherent  INTEGER NOT NULL CHECK (prix_adherent >= 0),   -- centimes
    quantite_stock INTEGER NOT NULL DEFAULT 0 CHECK (quantite_stock >= 0),
    est_favori INTEGER NOT NULL DEFAULT 0 CHECK (est_favori IN (0, 1))
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
    adherent INTEGER NOT NULL DEFAULT 0 CHECK (adherent IN (0, 1)),
    mail TEXT NOT NULL UNIQUE
  );
  CREATE TABLE IF NOT EXISTS admins (
    identifiant TEXT PRIMARY KEY,
    mdp TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS achats (
    id_achat INTEGER PRIMARY KEY AUTOINCREMENT,
    id_client INTEGER NOT NULL REFERENCES clients(id_client),
    montant INTEGER NOT NULL CHECK (montant >= 0),
    date TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    statut TEXT NOT NULL CHECK (statut IN ('validé', 'annulé'))
  );
  CREATE TABLE IF NOT EXISTS lignes_achats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    achat_id INTEGER NOT NULL REFERENCES achats(id_achat) ON DELETE CASCADE,
    produit_id INTEGER NOT NULL REFERENCES produits(id_produit),
    quantite INTEGER NOT NULL CHECK (quantite > 0),
    prix_unitaire INTEGER NOT NULL CHECK (prix_unitaire >= 0)
  );

  CREATE INDEX IF NOT EXISTS idx_achats_client ON achats(id_client); -- achats d'un client
  CREATE INDEX IF NOT EXISTS idx_lignes_achat ON lignes_achats(achat_id); -- produits contenus dans un achat
  CREATE INDEX IF NOT EXISTS idx_pc_categorie ON produits_categories(id_categorie); -- produits d'une catégorie
`);

module.exports = db;