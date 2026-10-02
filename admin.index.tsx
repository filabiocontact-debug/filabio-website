import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Database, RefreshCw, ShoppingBag, TrendingUp, Users, Wallet } from "lucide-react";
import {
  computeStats,
  formatDH,
  seedDemoData,
  STATUS_COLOR,
  useOrders,
  useVisits,
  type OrderStatus,
} from "@/lib/store";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Tableau de bord — FilaBio CRM" }, { name: "robots", content: "noindex" }] }),
  component: AdminDashboard,
});

const PIPE: { label: string; status: OrderStatus }[] = [
  { label: "Nouveau", status: "nouvelle" },
  { label: "Contacté", status: "confirmee" },
  { label: "Intéressé", status: "transit" },
  { label: "Gagné", status: "livree" },
  { label: "Perdu", status: "annulee" },
];

function statusLabel(s: OrderStatus) {
  if (s === "nouvelle") return "Pending";
  if (s === "livree") return "Delivered";
  if (s === "annulee") return "Annulée";
  return "Confirmed";
}

function AdminDashboard() {
  const orders = useOrders();
  const visits = useVisits();
  const [syncedAt, setSyncedAt] = useState("à l'instant");

  const stats = useMemo(() => computeStats(orders, visits), [orders, visits]);
  const recent = useMemo(
    () => [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8),
    [orders],
  );

  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl border border-primary/40 bg-primary/10">
          <Database className="h-5 w-5 text-primary" />
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground">
          Aucune commande pour le moment
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Les commandes passées sur la boutique s'afficheront ici automatiquement. Vous pouvez
          aussi charger un jeu de données de démonstration pour explorer les tableaux de bord.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={seedDemoData}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Charger des données de démonstration
          </button>
          <Link
            to="/admin/produits"
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Ajouter un produit
          </Link>
          <Link
            to="/"
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Ouvrir la boutique
          </Link>
        </div>
      </div>
    );
  }

  const kpis = [
    {
      label: "Chiffre d'affaires",
      value: formatDH(stats.revenue),
      sub: `${stats.orders} commandes enregistrées`,
      icon: Wallet,
    },
    {
      label: "Commandes",
      value: String(stats.orders),
      sub: `${stats.pending} à traiter`,
      icon: ShoppingBag,
    },
    {
      label: "Panier moyen",
      value: formatDH(stats.aov),
      sub: "hors commandes annulées",
      icon: TrendingUp,
    },
    {
      label: "Taux de conversion",
      value: `${stats.conversion.toFixed(1)} %`,
      sub: `${stats.visits} visites enregistrées`,
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {kpi.label}
              </p>
              <kpi.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-3 font-display text-2xl font-semibold text-foreground">{kpi.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{kpi.sub}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Évolution du chiffre d'affaires
            </h2>
            <p className="text-xs text-muted-foreground">
              Commandes validées (hors annulations)
            </p>
          </div>
          <div className="flex rounded-lg border border-border p-1">
            {GRANULARITIES.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGranularity(g.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  granularity === g.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
        <LineChart data={series} valueFormat={(v) => `${v}`} />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
            Villes les plus rentables
          </h2>
          <BarList data={cities} valueFormat={formatDH} />
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
            Répartition des statuts
          </h2>
          <Donut data={statuses} />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Dernières commandes
          </h2>
          <Link
            to="/admin/commandes"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Tout voir <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ul className="divide-y divide-border">
          {recent.map((o) => (
            <li key={o.id} className="flex flex-wrap items-center gap-3 px-5 py-3">
              <span className="font-mono text-xs text-muted-foreground">{o.ref}</span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
                {o.name}
              </span>
              <span className="text-xs text-muted-foreground">{o.city || "—"}</span>
              <span
                className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                style={{ background: `${STATUS_COLOR[o.status]}22`, color: STATUS_COLOR[o.status] }}
              >
                {STATUS_FR[o.status]}
              </span>
              <span className="text-sm font-semibold text-foreground">{formatDH(o.total)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
