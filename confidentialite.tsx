import { createFileRoute } from "@tanstack/react-router";

import { legalHead, LegalPage, type LegalCopy } from "@/components/legal-page";

export const Route = createFileRoute("/confidentialite")({
  head: () =>
    legalHead(
      "Politique de Confidentialité — FilaBio",
      "Comment FilaBio collecte, utilise et protège vos données personnelles, conformément à la loi marocaine 09-08.",
      "/confidentialite",
    ),
  component: () => <LegalPage copy={COPY} />,
});

const COPY: LegalCopy = {
  fr: {
    title: "Politique de Confidentialité",
    intro: "Nous respectons votre vie privée et ne collectons que les données nécessaires à votre commande.",
    updated: "Dernière mise à jour : octobre 2026",
    sections: [
      { h: "1. Responsable du traitement", p: ["Indoka SARL, ZI SSMK, Meknès, Maroc — filabio.contact@gmail.com."] },
      { h: "2. Données collectées", p: ["Lors d'une commande : nom et prénom, numéro de téléphone, ville et adresse de livraison. Via le formulaire de contact : nom, e-mail, téléphone et message. Aucune donnée bancaire n'est collectée."] },
      { h: "3. Finalités", p: ["Vos données servent uniquement à confirmer et livrer votre commande, à vous contacter au sujet de celle-ci et à répondre à vos demandes. Des outils de mesure d'audience et publicitaires (par exemple Meta ou Google) peuvent être utilisés pour améliorer nos campagnes, de façon agrégée."] },
      { h: "4. Partage", p: ["Vos coordonnées sont transmises uniquement à notre partenaire de livraison pour acheminer votre colis. Elles ne sont jamais vendues."] },
      { h: "5. Durée de conservation", p: ["Les données de commande sont conservées le temps nécessaire au suivi commercial et aux obligations légales, puis supprimées."] },
      { h: "6. Vos droits", p: ["Conformément à la loi n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et d'opposition. Pour l'exercer, écrivez à filabio.contact@gmail.com."] },
      { h: "7. Cookies", p: ["Le site utilise le stockage local du navigateur pour mémoriser votre langue, ainsi que d'éventuels cookies de mesure d'audience. Vous pouvez les supprimer depuis les réglages de votre navigateur."] },
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    intro: "كنحترمو الخصوصية ديالك وما كنجمعو غير المعلومات الضرورية للطلب.",
    updated: "آخر تحديث: أكتوبر 2026",
    sections: [
      { h: "1. المسؤول عن المعالجة", p: ["Indoka SARL، المنطقة الصناعية SSMK، مكناس، المغرب — filabio.contact@gmail.com."] },
      { h: "2. المعلومات المجمعة", p: ["عند الطلب: الاسم والنسب، رقم الهاتف، المدينة وعنوان التوصيل. عبر استمارة التواصل: الاسم، البريد، الهاتف والرسالة. ما كنجمعو حتى معلومات بنكية."] },
      { h: "3. الأهداف", p: ["كنستعملو المعلومات غير باش نأكدو ونوصلو الطلب، نتاصلو بيك بخصوصو، ونجاوبو على الأسئلة ديالك. يمكن نستعملو أدوات قياس الجمهور والإشهار (بحال Meta أو Google) بشكل إجمالي."] },
      { h: "4. المشاركة", p: ["المعلومات ديالك كتعطى غير لشريك التوصيل باش يوصلك الطرد، وعمرها ما كتباع."] },
      { h: "5. مدة الاحتفاظ", p: ["كنحتافظو بمعلومات الطلب المدة اللازمة للتتبع والالتزامات القانونية، ومن بعد كتمسح."] },
      { h: "6. الحقوق ديالك", p: ["طبقاً للقانون رقم 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي، عندك الحق فالولوج والتصحيح والتعرض. راسلنا على filabio.contact@gmail.com."] },
      { h: "7. ملفات تعريف الارتباط", p: ["الموقع كيستعمل التخزين المحلي فالمتصفح باش يتفكر اللغة، وممكن ملفات قياس الجمهور. تقدر تمسحهم من إعدادات المتصفح."] },
    ],
  },
};
