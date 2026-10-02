import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BarChart3,
  ClipboardList,
  ExternalLink,
  Kanban,
  LayoutDashboard,
  LayoutTemplate,
  ListChecks,
  LogOut,
  Menu,
  Moon,
  Package,
  Radar,
  Settings as SettingsIcon,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  X,
} from "lucide-react";
import { AdminLogin } from "@/components/admin-login";
import { getSettings } from "@/lib/store";

const SESSION_KEY = "filabio.admin.session";
const THEME_KEY = "filabio.admin.theme";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const NAV_GROUPS = [
  {
    title: "Pilotage",
    items: [
      { to: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
      { to: "/admin/analytics", label: "Analytics", icon: BarChart3, exact: false },
    ],
  },
  {
    title: "Commercial",
    items: [
      { to: "/admin/leads", label: "Leads / Prospects", icon: Users, exact: false },
      { to: "/admin/pipeline", label: "Pipeline de vente", icon: Kanban, exact: false },
      { to: "/admin/commandes", label: "Commandes", icon: ClipboardList, exact: false },
      { to: "/admin/taches", label: "Tâches", icon: ListChecks, exact: false },
      { to: "/admin/produits", label: "Produits", icon: Package, exact: false },
    ],
  },
  {
    title: "Marketing",
    items: [
      { to: "/admin/pixels", label: "Pixels & Tracking", icon: Radar, exact: false },
      { to: "/admin/landing", label: "Landing Pages", icon: LayoutTemplate, exact: false },
      { to: "/admin/studio", label: "Studio photo", icon: Sparkles, exact: false },
    ],
  },
  {
    title: "Administration",
    items: [
      { to: "/admin/equipe", label: "Équipe & Rôles", icon: ShieldCheck, exact: false },
      { to: "/admin/parametres", label: "Paramètres", icon: SettingsIcon, exact: false },
    ],
  },
] as const;

const NAV = NAV_GROUPS.flatMap((g) => g.items);

function useAdminSession() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setAuthed(window.sessionStorage.getItem(SESSION_KEY) === "1");
    } catch {
      setAuthed(false);
    }
    setReady(true);
  }, []);

  function login(code: string) {
    const expected = (getSettings().accessCode || "").trim();
    if (!expected || code.trim() !== expected) return false;
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setAuthed(true);
    return true;
  }

  function logout() {
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch {
      /* ignore */
    }
    setAuthed(false);
  }

  return { authed, ready, login, logout };
}

function useAdminTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark") setTheme(saved);
    } catch {
      /* ignore */
    }
  }, []);

  function toggle() {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem(THEME_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  return { theme, toggle };
}

function AdminLayout() {
  const { authed, ready, login, logout } = useAdminSession();
  const { theme, toggle } = useAdminTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (!ready) return <div className="min-h-screen bg-background" />;
  if (!authed) return <AdminLogin onLogin={login} />;

  const themeAttr = theme === "light" ? { "data-theme": "light" } : {};
  const current = NAV.find((n) => (n.exact ? pathname === n.to : pathname.startsWith(n.to)));

  const sidebar = (
    <nav className="flex h-full flex-col gap-1 overflow-y-auto p-3">
      <Link
        to="/admin"
        className="mb-3 flex items-center gap-2 rounded-lg px-3 py-2 font-display text-lg font-semibold tracking-tight text-foreground"
      >
        <span className="grid h-9 w-9 place-items-center rounded-lg border border-primary/50 bg-primary/15 text-sm font-bold text-primary">
          F
        </span>
        <span className="leading-tight">
          FilaBio
          <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            CRM Console
          </span>
        </span>
      </Link>
      {NAV_GROUPS.map((group) => (
        <div key={group.title} className="mb-2">
          <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
            {group.title}
          </p>
          {group.items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-primary/15 !text-primary" }}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </div>
      ))}
      <div className="mt-auto space-y-1 border-t border-sidebar-border pt-3">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          Voir la boutique
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Quitter
        </button>
      </div>
    </nav>
  );

  return (
    <div
      {...themeAttr}
      className="min-h-screen bg-background text-foreground transition-colors duration-300"
    >
      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 start-0 z-50 w-64 border-e border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label="Fermer le menu"
          className="absolute end-3 top-3 grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
        {sidebar}
      </aside>

      <div className="lg:ps-64">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-foreground lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-base font-semibold text-foreground">
              {current?.label ?? "Filabio Para"}
            </h1>
            <p className="truncate text-xs text-muted-foreground">
              Données locales — aucun abonnement requis
            </p>
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
