import { createFileRoute } from "@tanstack/react-router";
import { AdminComingSoon } from "@/components/admin-coming-soon";

export const Route = createFileRoute("/admin/taches")({
  head: () => ({ meta: [{ title: "Tâches — FilaBio CRM" }, { name: "robots", content: "noindex" }] }),
  component: () => <AdminComingSoon title="Tâches" description="Rappels d'appels, confirmations et relances clients." />,
});
