import { createFileRoute } from "@tanstack/react-router";

import { legalHead, LegalPage, type LegalCopy } from "@/components/legal-page";

export const Route = createFileRoute("/livraison-retours")({
  head: () =>
    legalHead(
      "Livraison & Retours — FilaBio",
      "Livraison gratuite en 24 à 48h partout au Maroc, paiement à la livraison et conditions de retour FilaBio.",
      "/livraison-retours",
    ),
  component: () => <LegalPage copy={COPY} />,
});

const COPY: LegalCopy = {
  fr: {
    title: "Politique de livraison et de retour",
    intro: "Commandez en toute confiance : vous ne payez qu'à la réception de votre colis.",
    updated: "Dernière mise à jour : octobre 2026",
    sections: [
      { h: "1. Zone et frais de livraison", p: ["Nous livrons dans toutes les villes du Maroc. La livraison est gratuite, quelle que soit la quantité commandée."] },
      { h: "2. Délais", p: ["Après validation de votre commande, notre équipe vous appelle pour la confirmer. Le colis est ensuite livré en 24 à 48 heures ouvrables. Ce délai peut être légèrement plus long pour certaines zones éloignées ou en période de forte affluence."] },
      { h: "3. Paiement à la livraison", p: ["Le paiement se fait en espèces, en dirhams (DH), directement au livreur lors de la remise du colis. Aucune information bancaire n'est demandée sur le site.", "Vous pouvez vérifier l'état extérieur du colis devant le livreur avant de payer."] },
      { h: "4. Commande non réceptionnée", p: ["Si vous ne pouvez pas être joint ou si vous êtes absent, le livreur vous recontactera. Après plusieurs tentatives sans réponse, la commande peut être annulée."] },
      { h: "5. Retours", p: ["Si le produit reçu est endommagé, incomplet ou ne correspond pas à votre commande, contactez-nous dans un délai de 7 jours après réception par WhatsApp, téléphone ou e-mail. Nous procédons à l'échange ou au remboursement après vérification.", "Pour des raisons d'hygiène et de sécurité alimentaire, seuls les produits non ouverts, dans leur emballage d'origine scellé, peuvent faire l'objet d'un retour pour changement d'avis."] },
      { h: "6. Remboursement", p: ["Après réception et vérification du produit retourné, le remboursement est effectué dans un délai de 14 jours, par le moyen convenu avec notre service client."] },
      { h: "7. Contact", p: ["Indoka SARL — ZI SSMK, Meknès, Maroc · filabio.contact@gmail.com"] },
    ],
  },
  ar: {
    title: "سياسة التوصيل والإرجاع",
    intro: "اطلب بكل ثقة: ما كتخلص حتى كتوصلك السلعة.",
    updated: "آخر تحديث: أكتوبر 2026",
    sections: [
      { h: "1. منطقة وثمن التوصيل", p: ["كنوصلو لجميع مدن المغرب. التوصيل مجاني كيفما كانت الكمية."] },
      { h: "2. المدة", p: ["بعد تسجيل الطلب، كيتاصل بيك الفريق ديالنا باش يأكد معاك. من بعد كيوصلك الطرد خلال 24 إلى 48 ساعة عمل، وقد تطول المدة شوية فبعض المناطق البعيدة."] },
      { h: "3. الدفع عند الاستلام", p: ["الدفع نقداً بالدرهم للموزع عند تسليم الطرد. ما كنطلبو حتى معلومات بنكية فالموقع.", "تقدر تشوف الحالة الخارجية للطرد قدام الموزع قبل ما تخلص."] },
      { h: "4. طلب غير مستلم", p: ["إلا ما جاوبتيش أو ما كنتيش، غادي يعاود يتاصل بيك الموزع. ومن بعد عدة محاولات بلا جواب، يمكن يتلغى الطلب."] },
      { h: "5. الإرجاع", p: ["إلا وصلك المنتج متضرر أو ناقص أو ماشي هو لي طلبتي، تاصل بينا خلال 7 أيام من الاستلام عبر واتساب أو الهاتف أو البريد. كنبدلوه أو كنرجعو الفلوس بعد التحقق.", "لأسباب صحية، غير المنتجات لي ما تحلاتش وفالتغليف الأصلي المختوم لي يمكن ترجع فحالة تغيير الرأي."] },
      { h: "6. استرجاع المبلغ", p: ["بعد استلام والتحقق من المنتج المرجع، كيتم استرجاع المبلغ خلال 14 يوم بالطريقة المتفق عليها."] },
      { h: "7. التواصل", p: ["Indoka SARL — المنطقة الصناعية SSMK، مكناس، المغرب · filabio.contact@gmail.com"] },
    ],
  },
};
