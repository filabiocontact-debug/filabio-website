import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, MessageCircle, Printer, Search, Trash2 } from "lucide-react";

import {
  deleteOrder,
  formatDH,
  STATUS_COLOR,
  STATUS_FR,
  STATUS_ORDER,
  toCsv,
  updateOrder,
  useOrders,
  useSettings,
  type Order,
  type OrderStatus,
} from "@/lib/store";

export const Route = createFileRoute("/admin/commandes")({
  component: AdminOrders,
});

function waLink(o: Order) {
  let n = o.phone.replace(/\D/g, "");
  if (n.startsWith("00")) n = n.slice(2);
  if (n.startsWith("0")) n = `212${n.slice(1)}`;
  const msg = encodeURIComponent(
    `Bonjour ${o.name}, ici FilaBio. Nous confirmons votre commande ${o.ref} : ${o.qty} × ${o.productName}, total ${o.total} DH, paiement à la livraison. Merci de confirmer votre adresse : ${o.address}, ${o.city}.`,
  );
  return `https://wa.me/${n}?text=${msg}`;
}

function printSlip(o: Order, company: string, phone: string) {
  const w = window.open("", "_blank", "width=720,height=900");
  if (!w) return;
  const esc = (v: string) => v.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);
  w.document.write(`<!doctype html><html><head><title>Bordereau ${esc(o.ref)}</title>
<style>body{font-family:system-ui,sans-serif;padding:32px;color:#111}h1{margin:0 0 4px}table{width:100%;border-collapse:collapse;margin-top:16px}td{border:1px solid #999;padding:10px;vertical-align:top}.big{font-size:28px;font-weight:800}.muted{color:#555;font-size:13px}</style></head><body>
<h1>BORDEREAU DE LIVRAISON</h1><div class="muted">${esc(company)} · ${esc(phone)} · ${new Date(o.createdAt).toLocaleDateString("fr-FR")}</div>
<table><tr><td><b>N° commande</b><br><span class="big">${esc(o.ref)}</span></td><td><b>Montant à encaisser (COD)</b><br><span class="big">${o.total} DH</span></td></tr>
<tr><td colspan="2"><b>Destinataire</b><br>${esc(o.name)}<br>Tél : ${esc(o.phone)}<br>${esc(o.address)}<br><b>${esc(o.city)}</b></td></tr>
<tr><td colspan="2"><b>Contenu</b><br>${o.qty} × ${esc(o.productName)}</td></tr>
<tr><td style="height:80px"><b>Signature livreur</b></td><td><b>Signature client</b></td></tr></table>
<script>window.onload=()=>window.print()</script></body></html>`);
  w.document.close();
}

function AdminOrders() {
  const orders = useOrders();
  const settings = useSettings();
  const [status, setStatus] = useState<OrderStatus | "all">("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return [...orders]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .filter((o) => status === "all" || o.status === status)
      .filter((o) => !term || o.name.toLowerCase().includes(term) || o.phone.replace(/\s/g, "").includes(term.replace(/\s/g, "")));
  }, [orders, status, q]);

  function exportCsv() {
    const blob = new Blob(["\ufeff" + toCsv(list)], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `commandes-filabio-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold">Commandes ({list.length})</h1>
        <button onClick={exportCsv} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          <Download className="h-4 w-4" /> Exporter Excel / CSV
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher par nom ou téléphone"
            className="w-full rounded-lg border border-border bg-card py-2 ps-9 pe-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["all", ...STATUS_ORDER] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${status === s ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground"}`}
            >
              {s === "all" ? "Toutes" : STATUS_FR[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="border-b border-border text-start text-xs uppercase text-muted-foreground">
            <tr>
              {["N°", "Client", "Téléphone", "Ville", "Adresse", "Total", "Statut", "Actions"].map((h) => (
                <th key={h} className="px-3 py-3 text-start font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-10 text-center text-muted-foreground">Aucune commande.</td>
              </tr>
            )}
            {list.map((o) => (
              <tr key={o.id} className="border-b border-border/60 last:border-0">
                <td className="px-3 py-3 font-mono text-xs">{o.ref}</td>
                <td className="px-3 py-3 font-medium">{o.name}<div className="text-xs text-muted-foreground">{o.qty} × {o.productName}</div></td>
                <td className="px-3 py-3" dir="ltr">{o.phone}</td>
                <td className="px-3 py-3">{o.city || "—"}</td>
                <td className="max-w-[220px] truncate px-3 py-3" title={o.address}>{o.address}</td>
                <td className="px-3 py-3 font-semibold">{formatDH(o.total)}</td>
                <td className="px-3 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateOrder(o.id, { status: e.target.value as OrderStatus })}
                    className="rounded-full border bg-background px-2 py-1 text-xs font-semibold"
                    style={{ borderColor: STATUS_COLOR[o.status], color: STATUS_COLOR[o.status] }}
                  >
                    {STATUS_ORDER.map((s) => (
                      <option key={s} value={s}>{STATUS_FR[s]}</option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-1.5">
                    <a href={waLink(o)} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="rounded-lg bg-whatsapp p-2 text-whatsapp-foreground">
                      <MessageCircle className="h-4 w-4" />
                    </a>
                    <button aria-label="Bordereau" onClick={() => printSlip(o, settings.company, settings.phoneDisplay)} className="rounded-lg border border-border p-2 hover:text-primary">
                      <Printer className="h-4 w-4" />
                    </button>
                    <button aria-label="Supprimer" onClick={() => confirm(`Supprimer ${o.ref} ?`) && deleteOrder(o.id)} className="rounded-lg border border-border p-2 hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
