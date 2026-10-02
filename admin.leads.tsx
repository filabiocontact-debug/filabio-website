import { createFileRoute } from "@tanstack/react-router";
import { AdminComingSoon } from "@/components/admin-coming-soon";

export const Route = createFileRoute("/admin/leads")({
  head: () => ({ meta: [{ title: "Leads / Prospects — FilaBio CRM" }, { name: "robots", content: "noindex" }] }),
  component: () => <AdminComingSoon title="Leads / Prospects" description="Chaque formulaire envoyé devient un lead à contacter." />,
});
