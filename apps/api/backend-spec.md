# Spécification backend et base de données Zongo Pay

Ce document sert de guide pour concevoir **le backend** (API) et **la base de données** de l'application Zongo Pay. Il est organisé de manière à pouvoir être suivi étape par étape.

---

## 1. Objectifs du backend

- Exposer une **API HTTP/REST** (plus tard éventuellement GraphQL) pour:

  - Authentifier les utilisateurs.
  - Gérer leur profil et leurs paramètres de sécurité.
  - Gérer les **comptes / wallets** et les **soldes**.
  - Créer et exécuter des **transactions** (envoi / réception d’argent).
  - Générer et lire des **QR codes de paiement**.
  - Gérer les **cagnottes (pools)** et les contributions.
  - Fournir l’historique des transactions pour alimenter le **dashboard**.

- Servir de couche d’abstraction par rapport:
  - Aux **opérateurs mobiles** (TMoney, Moov).
  - Aux services externes (SMS, emails, notifications push, etc.).

---

## 2. Stack technique recommandée

Cette stack est cohérente avec le front en React/TypeScript.

- Langage: **TypeScript**
- Runtime: **Node.js**
- Framework backend:
  - **Hono** (API HTTP légère, rapide, très adaptée à TypeScript)
- Base de données:
  - **PostgreSQL**.
- ORM:
  - **Prisma** (très confortable avec TypeScript).
- Auth:
  - **JWT** (access token + refresh token).
  - Stockage des mots de passe via **bcrypt**.

---

## 3. Modèle de données (entités principales)

### 3.1. User

Représente un utilisateur Zongo Pay.

- `id` (uuid)
- `phone` (string, unique, format international: `+228...`)
- `email` (string, unique, optionnel)
- `full_name` (string)
- `pin_hash` (string, hash du code PIN à 4/6 chiffres)
- `avatar_initials` (string, dérivé du nom pour affichage)
- `created_at` (timestamp)
- `updated_at` (timestamp)
- `status` (enum: `ACTIVE`, `SUSPENDED`, `DELETED`)

### 3.2. Wallet

Un utilisateur peut avoir plusieurs wallets, éventuellement par opérateur.

- `id` (uuid)
- `user_id` (fk -> User)
- `provider` (enum: `TMONEY`, `MOOV`, `OTHER`)
- `balance` (numeric/decimal)
- `currency` (string, ex: `XOF`)
- `phone_number` (string, numéro lié au wallet)
- `created_at`
- `updated_at`

### 3.3. Transaction

Représente une opération financière (envoi, réception, contribution).

- `id` (uuid)
- `reference` (string, unique, affichée dans le front)
- `type` (enum: `SEND`, `RECEIVE`, `POOL_CONTRIBUTION`, `POOL_PAYOUT`)
- `status` (enum: `PENDING`, `SUCCESS`, `FAILED`, `CANCELED`)
- `amount` (numeric/decimal)
- `currency` (string)
- `from_user_id` (fk -> User, nullable si externe)
- `to_user_id` (fk -> User, nullable si externe)
- `from_wallet_id` (fk -> Wallet, nullable)
- `to_wallet_id` (fk -> Wallet, nullable)
- `direction` (enum: `IN`, `OUT` par rapport au user principal)
- `description` (string, optionnel)
- `created_at`
- `updated_at`

Cette table alimente le **dashboard** et le **TransactionDialog**:

- `name` affiché dans le front = `full_name` ou un alias calculé côté backend.
- `status` affiché = `status` de la transaction.
- `type` affiché (`received` / `sent`) peut être dérivé de `direction`.

### 3.4. QRCode / PaymentRequest

Permet de générer un QR qui encode une demande de paiement (utilisé dans `Receive` et `Scan`/`Send`).

- `id` (uuid)
- `code` (string, court, utilisé dans l’URL `zongo://pay/{code}`)
- `owner_user_id` (fk -> User)
- `amount` (numeric, nullable si montant libre)
- `currency` (string)
- `provider` (enum, nullable: `TMONEY`, `MOOV`, etc.)
- `phone_number` (string, si différent du lien principal)
- `is_single_use` (boolean)
- `max_uses` (int, optionnel)
- `uses_count` (int)
- `expires_at` (timestamp, optionnel)
- `status` (enum: `ACTIVE`, `EXPIRED`, `CANCELED`)
- `created_at`
- `updated_at`

Le QR affiché peut encoder:

```text
zongo://pay/{code}
```

Le front fait un scan, obtient un `qrData`, et le backend résout `{code}` vers une `PaymentRequest`.

### 3.5. Pool (Cagnotte)

- `id` (uuid)
- `owner_user_id` (fk -> User, créateur)
- `title` (string)
- `description` (string)
- `target_amount` (numeric, optionnel)
- `current_amount` (numeric, recalculé)
- `status` (enum: `OPEN`, `CLOSED`, `CANCELED`)
- `deadline` (timestamp, optionnel)
- `created_at`
- `updated_at`

### 3.6. PoolContribution

- `id` (uuid)
- `pool_id` (fk -> Pool)
- `from_user_id` (fk -> User)
- `amount` (numeric)
- `currency` (string)
- `transaction_id` (fk -> Transaction)
- `created_at`

### 3.7. SecuritySettings

Pour l’écran `Security` du front.

- `id` (uuid)
- `user_id` (fk -> User)
- `biometric_enabled` (boolean)
- `two_factor_enabled` (boolean)
- `device_lock_required` (boolean)
- `created_at`
- `updated_at`

---

## 4. Schéma SQL de base (exemple PostgreSQL)

Ce bloc fournit une base de schéma SQL. Il peut être adapté à l’ORM choisi (Prisma, TypeORM, etc.).

```sql
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone varchar(20) UNIQUE NOT NULL,
  email varchar(255) UNIQUE,
  full_name varchar(255) NOT NULL,
  pin_hash varchar(255) NOT NULL,
  avatar_initials varchar(8),
  status varchar(20) NOT NULL DEFAULT 'ACTIVE',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  provider varchar(20) NOT NULL,
  balance numeric(18,2) NOT NULL DEFAULT 0,
  currency varchar(10) NOT NULL DEFAULT 'XOF',
  phone_number varchar(20),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference varchar(64) UNIQUE NOT NULL,
  type varchar(32) NOT NULL,
  status varchar(32) NOT NULL,
  amount numeric(18,2) NOT NULL,
  currency varchar(10) NOT NULL DEFAULT 'XOF',
  from_user_id uuid REFERENCES users(id),
  to_user_id uuid REFERENCES users(id),
  from_wallet_id uuid REFERENCES wallets(id),
  to_wallet_id uuid REFERENCES wallets(id),
  direction varchar(8) NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE payment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code varchar(64) UNIQUE NOT NULL,
  owner_user_id uuid NOT NULL REFERENCES users(id),
  amount numeric(18,2),
  currency varchar(10) NOT NULL DEFAULT 'XOF',
  provider varchar(20),
  phone_number varchar(20),
  is_single_use boolean NOT NULL DEFAULT false,
  max_uses int,
  uses_count int NOT NULL DEFAULT 0,
  expires_at timestamptz,
  status varchar(20) NOT NULL DEFAULT 'ACTIVE',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE pools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id uuid NOT NULL REFERENCES users(id),
  title varchar(255) NOT NULL,
  description text,
  target_amount numeric(18,2),
  current_amount numeric(18,2) NOT NULL DEFAULT 0,
  status varchar(20) NOT NULL DEFAULT 'OPEN',
  deadline timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE pool_contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pool_id uuid NOT NULL REFERENCES pools(id),
  from_user_id uuid NOT NULL REFERENCES users(id),
  amount numeric(18,2) NOT NULL,
  currency varchar(10) NOT NULL DEFAULT 'XOF',
  transaction_id uuid REFERENCES transactions(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE security_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  biometric_enabled boolean NOT NULL DEFAULT false,
  two_factor_enabled boolean NOT NULL DEFAULT false,
  device_lock_required boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
```

---

## 5. Design de l’API (endpoints REST)

Les URLs sont indicatives et peuvent être ajustées en fonction des besoins.

### 5.1. Authentification

- `POST /api/auth/register`

  - Body: `phone`, `full_name`, `pin`
  - Effet: crée un `User`, un `Wallet` principal, renvoie un `accessToken`.

- `POST /api/auth/login`

  - Body: `phone`, `pin`
  - Effet: vérifie le `pin_hash`, renvoie `accessToken` et éventuellement `refreshToken`.

- `POST /api/auth/refresh`
  - Renvoie un nouvel `accessToken`.

### 5.2. Profil et sécurité

- `GET /api/me`

  - Renvoie les infos de l’utilisateur connecté + wallets.

- `PUT /api/me`

  - Body: `full_name`, `email`…

- `GET /api/me/security`

  - Renvoie les `SecuritySettings`.

- `PUT /api/me/security`
  - Body: `biometric_enabled`, `two_factor_enabled`, `device_lock_required`.

### 5.3. Wallets et transactions

- `GET /api/wallets`

  - Liste des wallets de l’utilisateur.

- `GET /api/transactions`

  - Query params: `limit`, `offset`, `type`, `status`.
  - Utilisé par le `Dashboard` pour montrer l’historique.

- `GET /api/transactions/:id`
  - Données détaillées pour `TransactionDialog`.

### 5.4. Envoi d’argent (Send / Scan)

- `POST /api/transactions/send`

  - Body:
    - `to_phone` ou `to_user_id`
    - `amount`
    - `provider` (optionnel)
    - `source_wallet_id` (optionnel)
  - Effet:
    - Vérifie le solde du wallet.
    - Crée une transaction `type=SEND`, `direction=OUT`.
    - Interagit avec l’API opérateur (mock dans un premier temps).
    - Met à jour le solde si succès.

- `POST /api/transactions/from-qr`
  - Body: `code` (extrait du QR)
  - Effet:
    - Résout `PaymentRequest`.
    - Pré-remplit `recipient`, `amount`, `provider` côté front (tu peux renvoyer ces champs).

### 5.5. Réception d’argent (Receive)

- `GET /api/me/payment-request`
  - Renvoie ou crée automatiquement une `PaymentRequest` de type “profil” (`code` unique).
  - Le front génère le QR `zongo://pay/{code}`.

### 5.6. Cagnottes (pools)

- `POST /api/pools`

  - Body: `title`, `description`, `target_amount`, `deadline`.

- `GET /api/pools`

  - Liste des cagnottes de l’utilisateur ou cagnottes publiques.

- `GET /api/pools/:id`

  - Détails d’une cagnotte (montants, contributions).

- `POST /api/pools/:id/contributions`
  - Body: `amount`, `from_wallet_id`, etc.
  - Crée une `Transaction` + `PoolContribution`.

---

## 6. Sécurité et bonnes pratiques

- Stocker uniquement des **hashes** de PIN (bcrypt).
- Utiliser HTTPS partout en production.
- Mettre en place un **rate limiting** sur:
  - Auth (`/auth/login`)
  - Endpoints sensibles (envoi d’argent).
- Logger les opérations critiques:
  - Échecs de login.
  - Transactions rejetées.
- Structurer les erreurs:
  - Code d’erreur interne (`code`).
  - Message pour le front (localisable).

---

## 7. Roadmap d’implémentation

L’ordre suivant permet de construire progressivement le backend:

1. **Initialisation du projet backend**

   - Créer un nouveau projet Node/TypeScript basé sur **Hono**.
   - Configurer ESLint, Prettier, scripts de build.

2. **Connexion à la base de données**

   - Lancer un PostgreSQL local (Docker).
   - Ajouter Prisma.
   - Implémenter les migrations avec les tables `users`, `wallets`, `transactions`.

3. **Auth de base**

   - Endpoints `register` et `login`.
   - Génération de JWT.
   - Middleware d’auth pour protéger `/api/me`, `/api/transactions`, etc.

4. **Transactions simples**

   - Implémenter `POST /api/transactions/send` en mode “mock” (pas d’appel réel aux opérateurs).
   - Mettre à jour les soldes en base.
   - Renvoyer des codes d’erreur compréhensibles par le front.

5. **QR codes / PaymentRequest**

   - Implémenter `payment_requests` et `GET /api/me/payment-request`.
   - Implémenter `POST /api/transactions/from-qr` pour pré-remplir l’écran `Send`.

6. **Cagnottes**

   - Implémenter `pools` et `pool_contributions`.
   - Connecter cela aux routes du front `ContributeToPool`, `InviteParticipants`, etc.

7. **Sécurité avancée**

   - Implémenter `SecuritySettings`.
   - Ajouter 2FA si nécessaire (OTP via SMS/email).

8. **Intégration opérateurs**
   - Créer une couche `ProviderService` avec une interface générique.
   - Implémenter un adaptateur `TMoney`, un adaptateur `Moov` (dans un premier temps simuler les réponses).

---

## 8. Mapping avec le front actuel

Quelques écrans et les endpoints correspondants:

- `Scan.tsx`

  - Scan QR -> front extrait `code` -> call `POST /api/transactions/from-qr`.
  - Validation -> call `POST /api/transactions/send`.

- `Send.tsx`

  - Soumission formulaire -> `POST /api/transactions/send`.
  - Redirection vers `/dashboard`.

- `Receive.tsx`

  - Récupération du QR à afficher -> `GET /api/me/payment-request`.

- `Dashboard` + `TransactionDialog`

  - Liste -> `GET /api/transactions`.
  - Détail -> `GET /api/transactions/:id`.

- `Cagnottes` (pools)
  - Liste -> `GET /api/pools`.
  - Détail -> `GET /api/pools/:id`.
  - Contribution -> `POST /api/pools/:id/contributions`.

Ce fichier est conçu pour être évolutif: il peut être enrichi au fur et à mesure que de nouvelles fonctionnalités sont ajoutées côté front ou que de nouvelles intégrations avec des opérateurs sont mises en place.
