import { createFileRoute } from "@tanstack/react-router";

import { legalHead, LegalPage, type LegalCopy } from "@/components/legal-page";

export const Route = createFileRoute("/cgv")({
  head: () =>
    legalHead(
      "Conditions Générales de Vente — FilaBio",
      "Conditions générales de vente de la boutique FilaBio, exploitée par Indoka SARL à Meknès : commande, prix en DH, livraison et paiement à la livraison.",
      "/cgv",
    ),
  component: () => <LegalPage copy={COPY} />,
});

const COPY: LegalCopy = {
  fr: {
    title: "Conditions Générales de Vente",
    intro: "Les présentes conditions régissent toute commande passée sur la boutique FilaBio.",
    updated: "Dernière mise à jour : octobre 2026",
    sections: [
      { h: "1. Vendeur", p: ["La boutique FilaBio est exploitée par Indoka SARL, ZI SSMK, Meknès, Maroc. Contact : filabio.contact@gmail.com."] },
      { h: "2. Produits", p: ["FilaBio est un complément alimentaire à base de plantes naturelles (20 gélules par boîte). Il ne se substitue pas à une alimentation variée et équilibrée ni à un mode de vie sain. Ne pas dépasser la dose journalière recommandée. Tenir hors de portée des enfants. Déconseillé aux femmes enceintes ou allaitantes et aux personnes sous traitement sans avis médical."] },
      { h: "3. Prix", p: ["Les prix sont indiqués en dirhams marocains (DH), toutes taxes comprises. La livraison est gratuite. Le prix applicable est celui affiché au moment de la commande, y compris les offres par quantité en cours."] },
      { h: "4. Commande", p: ["La commande se fait via le formulaire du site en indiquant nom, téléphone, ville et adresse. Elle est définitive après confirmation par téléphone par notre équipe. Nous nous réservons le droit d'annuler une commande aux informations incomplètes ou erronées."] },
      { h: "5. Paiement", p: ["Le paiement s'effectue exclusivement à la livraison, en espèces, auprès du livreur."] },
      { h: "6. Livraison", p: ["La livraison est assurée sur tout le territoire marocain sous 24 à 48 heures ouvrables après confirmation. Le transfert des risques intervient à la remise du colis."] },
      { h: "7. Retours et réclamations", p: ["Les retours et remboursements sont régis par notre politique de livraison et de retour. Toute réclamation peut être adressée par e-mail, téléphone ou WhatsApp."] },
      { h: "8. Droit applicable", p: ["Les présentes conditions sont soumises au droit marocain, notamment la loi n° 31-08 relative à la protection du consommateur. En cas de litige, une solution amiable sera recherchée en priorité."] },
    ],
  },
  ar: {
    title: "الشروط العامة للبيع",
    intro: "هاد الشروط كتطبق على جميع الطلبات فمتجر FilaBio.",
    updated: "آخر تحديث: أكتوبر 2026",
    sections: [
      { h: "1. البائع", p: ["متجر FilaBio كتسيرو شركة Indoka SARL، المنطقة الصناعية SSMK، مكناس، المغرب. البريد: filabio.contact@gmail.com."] },
      { h: "2. المنتجات", p: ["FilaBio مكمل غذائي من النباتات الطبيعية (20 كبسولة فالعلبة). لا يعوض نظاماً غذائياً متنوعاً ومتوازناً ولا نمط حياة صحي. لا تتجاوز الجرعة اليومية الموصى بها. يُحفظ بعيداً عن متناول الأطفال. لا يُنصح به للحوامل والمرضعات والأشخاص تحت العلاج بدون استشارة طبية."] },
      { h: "3. الأثمنة", p: ["الأثمنة بالدرهم المغربي وشاملة لجميع الضرائب. التوصيل مجاني. الثمن المعتمد هو المعروض وقت الطلب، بما فيه عروض الكمية."] },
      { h: "4. الطلب", p: ["كيتم الطلب عبر الاستمارة بإدخال الاسم والهاتف والمدينة والعنوان، ويصبح نهائياً بعد التأكيد بالهاتف. يمكن لنا نلغيو أي طلب بمعلومات ناقصة أو غير صحيحة."] },
      { h: "5. الأداء", p: ["الأداء كيكون غير عند الاستلام، نقداً للموزع."] },
      { h: "6. التوصيل", p: ["التوصيل فجميع التراب المغربي خلال 24 إلى 48 ساعة عمل بعد التأكيد."] },
      { h: "7. الإرجاع والشكايات", p: ["الإرجاع واسترجاع المبلغ خاضعين لسياسة التوصيل والإرجاع. تقدر تبعت أي شكاية بالبريد أو الهاتف أو واتساب."] },
      { h: "8. القانون المطبق", p: ["تخضع هذه الشروط للقانون المغربي، خاصة القانون رقم 31-08 المتعلق بحماية المستهلك. فحالة نزاع، كنقلبو على حل ودي أولاً."] },
    ],
  },
};
