import { createFileRoute } from "@tanstack/react-router";
import { AdminComingSoon } from "@/components/admin-coming-soon";

export const Route = createFileRoute("/admin/pixels")({
  head: () => ({ meta: [{ title: "Pixels & Tracking — FilaBio CRM" }, { name: "robots", content: "noindex" }] }),
  component: () => <AdminComingSoon title="Pixels & Tracking" description="Facebook Pixel, TikTok Pixel et Google Tag." />,
});
