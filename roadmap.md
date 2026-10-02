# Roadmap

## Fait
- [x] Footer 4 colonnes (Marque & mentions légales / Boutique / Aide / Suivre) + bottom bar, fond charcoal, FR/AR, bouton "Nous écrire" (popup contact), CGV / Confidentialité / Retours en popup
- [x] Header : barre annonce dorée + navbar sombre, liens Accueil / Nos Produits / FilaBio Capsules / À propos / Contact, sélecteur عربية / FR, panier avec compteur, menu mobile
- [x] Pages : /produits (catalogue), /produits/filabio (fiche produit + galerie + commande express), /a-propos, /contact
- [x] Langue arabe/darija par défaut sur toutes les pages, choix FR mémorisé, RTL appliqué dès le chargement

## Fait (oct.)
- [x] Arabe/Darija par défaut sur tout le site, direction RTL, textes de vente et commande adaptés, français toujours disponible
- [x] Formulaire express COD (Nom complet, Téléphone +212, Ville, Adresse) + offres 1/2/3 boîtes + bouton animé
- [x] WhatsApp flottant, compte à rebours et stock réglables dans l'admin
- [x] Pages /faq, /livraison-retours, /cgv, /confidentialite
- [x] Admin : produits, commandes (filtres, CSV, WhatsApp, bordereau), studio IA, réglages

## En cours
- [ ] Espace d'administration "Filabio Para" (/admin) avec persistence localStorage (aucun abonnement) :
  - [ ] Accès protégé par code d'accès fourni par l'utilisateur : @FilaBio2000 (contrôle côté navigateur, données locales)
  - [ ] Boutique de données locale (produits, commandes, réglages) + hook React
  - [ ] Tableau de bord : KPI (CA DH, commandes, panier moyen, taux de conversion) + graphiques (revenus jour/semaine/mois, top villes, statuts)
  - [ ] Produits : modal ajout/édition illimitée, tableau, visibilité, suppression, upload image
  - [ ] Commandes : tableau + filtres statut, recherche nom/téléphone, export CSV/Excel, bouton WhatsApp, bordereau d'expédition imprimable
  - [ ] Studio photo IA : upload produit, presets (main, nature, studio, salle de sport), aperçu + téléchargement
  - [ ] Réglages : frais de livraison par ville, WhatsApp, coordonnées (filabio.contact@gmail.com)
  - [ ] Mode sombre/clair + sidebar responsive

## Attente utilisateur
- [ ] Numéro de téléphone / WhatsApp réel (placeholder +212 600 000 000 fourni par l'utilisateur)
- [ ] Liens réels Instagram / TikTok (placeholders vers les sites)
- [ ] Textes CGV / Confidentialité / Retours à valider (version neutre rédigée)
- [ ] Enregistrer les commandes en base (option proposée, pas encore demandée)
- [ ] Avis clients : section prête, en attente des vrais avis (nom, ville, texte, note, photo)
- [x] Verify order form layout on desktop and mobile
