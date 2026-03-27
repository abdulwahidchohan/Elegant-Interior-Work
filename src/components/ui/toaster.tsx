"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  durationMs?: number;
};

type ToastItem = {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
};

const TOAST_EVENT = "elegant:toast";

export function pushToast(input: ToastInput) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<ToastInput>(TOAST_EVENT, {
      detail: input,
    })
  );
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const timeouts = new Map<number, number>();

    const onToast = (event: Event) => {
      const customEvent = event as CustomEvent<ToastInput>;
      const payload = customEvent.detail;
      const id = Date.now() + Math.floor(Math.random() * 10000);
      const variant = payload.variant ?? "info";
      const durationMs = payload.durationMs ?? 4000;

      setToasts((current) => [
        ...current,
        {
          id,
          title: payload.title,
          description: payload.description,
          variant,
        },
      ]);

      const timeoutId = window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
        timeouts.delete(id);
      }, durationMs);

      timeouts.set(id, timeoutId);
    };

    window.addEventListener(TOAST_EVENT, onToast as EventListener);

    return () => {
      window.removeEventListener(TOAST_EVENT, onToast as EventListener);
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeouts.clear();
    };
  }, []);

  return (
    <div className="fixed top-20 right-4 z-[80] flex w-[min(420px,calc(100vw-2rem))] flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon =
            toast.variant === "success"
              ? CheckCircle2
              : toast.variant === "error"
              ? AlertCircle
              : Info;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className={cn(
                "rounded-2xl border p-4 shadow-2xl backdrop-blur",
                "bg-background/90",
                toast.variant === "success" && "border-emerald-500/35",
                toast.variant === "error" && "border-red-500/35",
                toast.variant === "info" && "border-primary/35"
              )}
            >
              <div className="flex items-start gap-3">
                <Icon
                  className={cn(
                    "mt-0.5 h-5 w-5 shrink-0",
                    toast.variant === "success" && "text-emerald-500",
                    toast.variant === "error" && "text-red-500",
                    toast.variant === "info" && "text-primary"
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-5">{toast.title}</p>
                  {toast.description ? (
                    <p className="mt-1 text-sm text-muted-foreground leading-5">
                      {toast.description}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setToasts((current) =>
                      current.filter((item) => item.id !== toast.id)
                    )
                  }
                  className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Dismiss notification"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
