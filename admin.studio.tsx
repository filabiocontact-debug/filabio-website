import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Download, Loader2, Sparkles, Upload } from "lucide-react";

import { generateStudioImage } from "@/lib/studio.functions";

export const Route = createFileRoute("/admin/studio")({
  component: AdminStudio,
});

const PRESETS = [
  { id: "hand", label: "En main" },
  { id: "nature", label: "Nature extérieure" },
  { id: "studio", label: "Studio minimaliste" },
  { id: "gym", label: "Salle de sport" },
] as const;

type PresetId = (typeof PRESETS)[number]["id"];

function AdminStudio() {
  const generate = useServerFn(generateStudioImage);
  const [source, setSource] = useState<string | null>(null);
  const [preset, setPreset] = useState<PresetId>("studio");
  const [results, setResults] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function onFile(file: File | undefined) {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => setSource(String(r.result));
    r.readAsDataURL(file);
  }

  async function run() {
    if (!source) return;
    setBusy(true);
    setError("");
    try {
      const { url } = await generate({ data: { image: source, preset } });
      setResults((prev) => [url, ...prev]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <h1 className="font-display text-2xl font-semibold">Studio photo IA</h1>
      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-6 text-sm text-muted-foreground hover:border-primary">
            {source ? <img src={source} alt="Produit" className="max-h-48 object-contain" /> : <Upload className="h-6 w-6" />}
            {source ? "Changer la photo" : "Importer une photo du produit"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPreset(p.id)}
                className={`rounded-lg border px-3 py-2 text-sm ${preset === p.id ? "border-primary bg-primary/15 text-primary" : "border-border"}`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <button
            onClick={run}
            disabled={!source || busy}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {busy ? "Génération…" : "Générer"}
          </button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {results.length === 0 && (
            <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground sm:col-span-2">
              Les images générées apparaîtront ici.
            </p>
          )}
          {results.map((url, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
              <img src={url} alt={`Visuel ${i + 1}`} className="aspect-square w-full object-cover" />
              <a href={url} download={`filabio-visuel-${i + 1}.png`} className="flex items-center justify-center gap-2 py-2.5 text-sm text-primary">
                <Download className="h-4 w-4" /> Télécharger
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
