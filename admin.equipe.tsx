import { createFileRoute } from "@tanstack/react-router";
import { AdminComingSoon } from "@/components/admin-coming-soon";

export const Route = createFileRoute("/admin/equipe")({
  head: () => ({ meta: [{ title: "Équipe & Rôles — FilaBio CRM" }, { name: "robots", content: "noindex" }] }),
  component: () => <AdminComingSoon title="Équipe & Rôles" description="Invitez les confirmatrices et gérez les accès." />,
});
