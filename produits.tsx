import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/produits")({
  component: ProduitsLayout,
});

function ProduitsLayout() {
  return <Outlet />;
}
