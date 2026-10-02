import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Pencil, Plus, Trash2, X } from "lucide-react";

import productFront from "@/assets/product-front.png";
import { deleteProduct, formatDH, newProduct, saveProduct, useProducts, type Product } from "@/lib/store";

export const Route = createFileRoute("/admin/produits")({
  component: AdminProducts,
});

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

function AdminProducts() {
  const products = useProducts();
  const [editing, setEditing] = useState<Product | null>(null);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold">Produits ({products.length})</h1>
        <button onClick={() => setEditing(newProduct())} className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> Nouveau produit
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b border-border text-xs uppercase text-muted-foreground">
            <tr>
              {["Produit", "Prix", "Promo", "Stock", "Visible", "Actions"].map((h) => (
                <th key={h} className="px-3 py-3 text-start font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-border/60 last:border-0">
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image ?? productFront} alt={p.name} className="h-12 w-12 rounded-lg border border-border object-contain" />
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">/{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3">{formatDH(p.price)}</td>
                <td className="px-3 py-3">{p.promoPrice ? formatDH(p.promoPrice) : "—"}</td>
                <td className="px-3 py-3">{p.stock}</td>
                <td className="px-3 py-3">
                  <button
                    onClick={() => saveProduct({ ...p, visible: !p.visible })}
                    className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs ${p.visible ? "border-primary/50 text-primary" : "border-border text-muted-foreground"}`}
                  >
                    {p.visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    {p.visible ? "Visible" : "Masqué"}
                  </button>
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-1.5">
                    <button aria-label="Modifier" onClick={() => setEditing(p)} className="rounded-lg border border-border p-2 hover:text-primary">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button aria-label="Supprimer" onClick={() => confirm(`Supprimer ${p.name} ?`) && deleteProduct(p.id)} className="rounded-lg border border-border p-2 hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && <ProductModal product={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [p, setP] = useState(product);
  const [ingredients, setIngredients] = useState(product.ingredients.join(", "));
  const set = <K extends keyof Product>(k: K, v: Product[K]) => setP((prev) => ({ ...prev, [k]: v }));

  function onImage(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set("image", String(reader.result));
    reader.readAsDataURL(file);
  }

  function submit() {
    if (!p.name.trim() || p.price <= 0) return;
    const slug = p.slug || p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    saveProduct({ ...p, slug, ingredients: ingredients.split(",").map((s) => s.trim()).filter(Boolean) });
    onClose();
  }

  return (
    <div role="dialog" aria-modal className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-card p-5" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">{product.name ? "Modifier le produit" : "Nouveau produit"}</h2>
          <button aria-label="Fermer" onClick={onClose}><X className="h-5 w-5" /></button>
        </div>
        <div className="space-y-3 text-sm">
          <label className="block">Nom<input className={input} value={p.name} onChange={(e) => set("name", e.target.value)} /></label>
          <div className="grid grid-cols-3 gap-3">
            <label className="block">Prix (DH)<input type="number" min={0} className={input} value={p.price} onChange={(e) => set("price", Number(e.target.value) || 0)} /></label>
            <label className="block">Promo (DH)<input type="number" min={0} className={input} value={p.promoPrice ?? ""} onChange={(e) => set("promoPrice", e.target.value ? Number(e.target.value) : null)} /></label>
            <label className="block">Stock<input type="number" min={0} className={input} value={p.stock} onChange={(e) => set("stock", Number(e.target.value) || 0)} /></label>
            <label className="block">Catégorie<input className={input} value={p.category ?? ""} onChange={(e) => set("category", e.target.value)} /></label>
          </div>
          <label className="block">Description<textarea rows={3} className={input} value={p.description} onChange={(e) => set("description", e.target.value)} /></label>
          <label className="block">Ingrédients (séparés par des virgules)<input className={input} value={ingredients} onChange={(e) => setIngredients(e.target.value)} /></label>
          <label className="block">Image
            <input type="file" accept="image/*" className={input} onChange={(e) => onImage(e.target.files?.[0])} />
          </label>
          {p.image && <img src={p.image} alt="" className="h-32 rounded-lg border border-border object-contain" />}
        </div>
        <button onClick={submit} className="mt-5 w-full rounded-lg bg-primary py-2.5 font-semibold text-primary-foreground">Enregistrer</button>
      </div>
    </div>
  );
}
