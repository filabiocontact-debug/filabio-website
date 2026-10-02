import type { Lang } from "@/lib/lang";

/** Unit price of FilaBio in Moroccan dirhams. */
export const PRICE = 199;

export type UiDict = {
  announcement: string;
  nav: { home: string; products: string; capsules: string; about: string; contact: string };
  order: string;
  cart: string;
  menu: string;
  close: string;
  freeDelivery: string;
  cod: string;
  formTitle: string;
  formName: string;
  formPhone: string;
  formAddress: string;
  formSubmit: string;
  errName: string;
  errPhone: string;
  errAddress: string;
  successTitle: string;
  successText: string;
  seeMore: string;
  gelulesLabel: string;
};

export const UI: Record<Lang, UiDict> = {
  fr: {
    announcement: "Livraison gratuite partout au Maroc • Paiement à la livraison",
    nav: {
      home: "Accueil",
      products: "Nos Produits",
      capsules: "FilaBio Capsules",
      about: "À propos",
      contact: "Contact",
    },
    order: "Commander maintenant",
    cart: "Panier",
    menu: "Menu",
    close: "Fermer",
    freeDelivery: "Livraison gratuite au Maroc",
    cod: "Paiement à la livraison",
    formTitle: "Formulaire de commande",
    formName: "Nom complet",
    formPhone: "Téléphone",
    formAddress: "Adresse",
    formSubmit: "Valider ma commande",
    errName: "Merci d'indiquer votre nom complet.",
    errPhone: "Numéro invalide. Exemple : 0612345678.",
    errAddress: "Merci d'indiquer votre adresse complète.",
    successTitle: "Merci",
    successText:
      "Votre commande est bien reçue. Nous vous appellerons pour confirmer la livraison.",
    seeMore: "En savoir plus",
    gelulesLabel: "20 GÉLULES",
  },
  ar: {
    announcement: "التوصيل مجاني لجميع المدن - الدفع عند الاستلام",
    nav: {
      home: "الرئيسية",
      products: "جميع المنتجات",
      capsules: "كبسولات فيلابيو",
      about: "من نحن",
      contact: "اتصل بنا",
    },
    order: "اطلب الآن",
    cart: "السلة",
    menu: "القائمة",
    close: "إغلاق",
    freeDelivery: "التوصيل مجاني في جميع أنحاء المغرب",
    cod: "الدفع عند الاستلام",
    formTitle: "استمارة الطلب السريع",
    formName: "الاسم الكامل",
    formPhone: "رقم الهاتف",
    formAddress: "العنوان",
    formSubmit: "تأكيد الطلب",
    errName: "يُرجى إدخال الاسم الكامل.",
    errPhone: "رقم غير صحيح. مثال: 0612345678.",
    errAddress: "يُرجى إدخال العنوان الكامل.",
    successTitle: "شكراً",
    successText: "تم استلام طلبك بنجاح. سنتصل بك لتأكيد التوصيل.",
    seeMore: "اعرف المزيد",
    gelulesLabel: "20 كبسولة",
  },
};
