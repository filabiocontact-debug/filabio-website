import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function AdminComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-primary/30 bg-card p-10 text-center">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl border border-primary/40 bg-primary/10">
        <Sparkles className="h-5 w-5 text-primary" />
      </div>
      <h2 className="font-display text-2xl font-semibold text-foreground">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-primary">Bientôt disponible</p>
      <Link
        to="/admin"
        className="mt-6 inline-flex rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
      >
        Retour au tableau de bord
      </Link>
    </div>
  );
}
