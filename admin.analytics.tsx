import { createFileRoute } from "@tanstack/react-router";
import { AdminComingSoon } from "@/components/admin-coming-soon";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Analytics — FilaBio CRM" }, { name: "robots", content: "noindex" }] }),
  component: () => <AdminComingSoon title="Analytics" description="Suivez les visites, conversions et revenus de la boutique." />,
});
