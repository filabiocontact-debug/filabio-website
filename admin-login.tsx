import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Lock, ShieldAlert } from "lucide-react";

export function AdminLogin({ onLogin }: { onLogin: (code: string) => boolean }) {
  const [code, setCode] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!onLogin(code)) {
      setError("Code d'accès incorrect.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/10">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Filabio <span className="text-primary">Para</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Espace d'administration privé</p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-black/20"
        >
          <label htmlFor="admin-code" className="mb-2 block text-sm font-medium text-foreground">
            Code d'accès
          </label>
          <div className="relative">
            <input
              id="admin-code"
              type={show ? "text" : "password"}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
              autoComplete="current-password"
              placeholder="••••••••••"
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 pe-10 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Masquer le code" : "Afficher le code"}
              className="absolute inset-y-0 end-0 grid w-10 place-items-center text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {error ? (
            <p className="mt-3 flex items-center gap-2 text-sm text-destructive">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="mt-5 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Entrer
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Les données de cet espace sont enregistrées dans ce navigateur uniquement.
        </p>
      </div>
    </div>
  );
}
