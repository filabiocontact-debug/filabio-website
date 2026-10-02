import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";

import { saveSettings, useSettings, type Settings } from "@/lib/store";

export const Route = createFileRoute("/admin/parametres")({
  component: AdminSettings,
});

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <h2 className="mb-4 font-display text-lg font-semibold">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function toLocalInput(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const off = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - off).toISOString().slice(0, 16);
}

function AdminSettings() {
  const saved = useSettings();
  const [s, setS] = useState<Settings>(saved);
  const [newCity, setNewCity] = useState("");
  const [ok, setOk] = useState(false);
  useEffect(() => setS(saved), [saved]);

  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => setS((p) => ({ ...p, [k]: v }));

  function save() {
    saveSettings(s);
    setOk(true);
    window.setTimeout(() => setOk(false), 2000);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold">Réglages de la boutique</h1>
        <button onClick={save} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          <Check className="h-4 w-4" /> {ok ? "Enregistré" : "Enregistrer"}
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Urgence & promotion">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={s.showStock} onChange={(e) => set("showStock", e.target.checked)} className="accent-primary" />
            Afficher le badge « Plus que N unités en stock »
          </label>
          <Field label="Unités restantes affichées">
            <input type="number" min={0} className={input} value={s.stockLeft} onChange={(e) => set("stockLeft", Math.max(0, Number(e.target.value) || 0))} />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={s.showCountdown} onChange={(e) => set("showCountdown", e.target.checked)} className="accent-primary" />
            Afficher le compte à rebours « Offre limitée »
          </label>
          <Field label="Fin de l'offre (vide = minuit chaque jour)">
            <input
              type="datetime-local"
              className={input}
              value={toLocalInput(s.promoEndsAt)}
              onChange={(e) => set("promoEndsAt", e.target.value ? new Date(e.target.value).toISOString() : "")}
            />
          </Field>
        </Card>

        <Card title="Contact & support">
          <Field label="Numéro WhatsApp (format international, ex. 212612345678)">
            <input className={input} value={s.whatsapp} onChange={(e) => set("whatsapp", e.target.value.replace(/[^\d]/g, ""))} />
          </Field>
          <Field label="Téléphone affiché">
            <input className={input} value={s.phoneDisplay} onChange={(e) => set("phoneDisplay", e.target.value)} />
          </Field>
          <Field label="E-mail">
            <input type="email" className={input} value={s.email} onChange={(e) => set("email", e.target.value)} />
          </Field>
          <Field label="Société">
            <input className={input} value={s.company} onChange={(e) => set("company", e.target.value)} />
          </Field>
          <Field label="Adresse">
            <input className={input} value={s.address} onChange={(e) => set("address", e.target.value)} />
          </Field>
        </Card>

        <Card title="Frais de livraison par ville (DH)">
          <Field label="Frais par défaut (autres villes)">
            <input type="number" min={0} className={input} value={s.defaultDeliveryFee} onChange={(e) => set("defaultDeliveryFee", Math.max(0, Number(e.target.value) || 0))} />
          </Field>
          {Object.entries(s.deliveryFees).map(([city, fee]) => (
            <div key={city} className="flex items-center gap-2">
              <span className="w-32 shrink-0 text-sm">{city}</span>
              <input
                type="number"
                min={0}
                className={input}
                value={fee}
                onChange={(e) => set("deliveryFees", { ...s.deliveryFees, [city]: Math.max(0, Number(e.target.value) || 0) })}
              />
              <button
                aria-label={`Supprimer ${city}`}
                onClick={() => {
                  const next = { ...s.deliveryFees };
                  delete next[city];
                  set("deliveryFees", next);
                }}
                className="rounded-lg border border-border p-2 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <input className={input} placeholder="Nouvelle ville" value={newCity} onChange={(e) => setNewCity(e.target.value)} />
            <button
              onClick={() => {
                const c = newCity.trim();
                if (!c) return;
                set("deliveryFees", { ...s.deliveryFees, [c]: s.defaultDeliveryFee });
                setNewCity("");
              }}
              className="flex items-center gap-1 rounded-lg border border-primary/50 px-3 text-sm text-primary"
            >
              <Plus className="h-4 w-4" /> Ajouter
            </button>
          </div>
        </Card>

        <Card title="Sécurité">
          <Field label="Code d'accès à l'administration">
            <input className={input} value={s.accessCode} onChange={(e) => set("accessCode", e.target.value)} />
          </Field>
          <p className="text-xs text-muted-foreground">Les données sont enregistrées dans ce navigateur.</p>
        </Card>
      </div>
    </div>
  );
}
