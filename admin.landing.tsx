import { createFileRoute } from "@tanstack/react-router";
import { AdminComingSoon } from "@/components/admin-coming-soon";

export const Route = createFileRoute("/admin/landing")({
  head: () => ({ meta: [{ title: "Landing Pages — FilaBio CRM" }, { name: "robots", content: "noindex" }] }),
  component: () => <AdminComingSoon title="Landing Pages" description="Vos pages de vente et leurs performances." />,
});
