import { createFileRoute } from "@tanstack/react-router";
import { AdminComingSoon } from "@/components/admin-coming-soon";

export const Route = createFileRoute("/admin/pipeline")({
  head: () => ({ meta: [{ title: "Pipeline de vente — FilaBio CRM" }, { name: "robots", content: "noindex" }] }),
  component: () => <AdminComingSoon title="Pipeline de vente" description="Faites avancer vos prospects : Nouveau → Contacté → Intéressé → Gagné." />,
});
