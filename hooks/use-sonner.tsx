"use client";

import * as React from "react";
import { toast } from "sonner";

/**
 * Hook: useSonner
 * Wrapper para sonner (shadcn) que facilita mostrar toasts con
 * título o texto, ícono y colores.
 *
 * API principal:
 * - show(options): muestra un toast genérico con soporte para
 *   title, text (description), icon, color, className y style.
 * - success/error/warning/info(messageOrOptions, opts?): helpers con variantes comunes.
 * - dismiss(id?): cierra un toast (o todos si no se pasa id).
 *
 * Recomendación: asegúrate de renderizar el <Toaster /> de sonner,
 * por ejemplo el wrapper en components/ui/sonner.tsx, en tu layout.
 */

type Variant = "default" | "success" | "error" | "warning" | "info" | "custom";

export type UseSonnerShowOptions = {
  /**
   * Título del toast. Si sólo pasas `text`, se usará como mensaje principal.
   */
  title?: string;
  /**
   * Descripción o texto secundario del toast.
   */
  text?: string;
  /**
   * Ícono a mostrar en el toast (puede ser un elemento React, por ejemplo un icono de lucide).
   */
  icon?: React.ReactNode;
  /**
   * Variante/color del toast:
   * - "success" | "error" | "warning" | "info": usa los helpers nativos de sonner.
   * - "default": estilo por defecto de sonner.
   * - "custom": usar tu propio estilo/color vía `style` o `className`.
   * - También puedes pasar un color CSS (p. ej. "#0ea5e9", "tomato") que se tratará como "custom"
   *   y se aplicará a `style.backgroundColor`.
   */
  color?: Variant | string;
  /**
   * Clase(s) CSS para personalizar el toast. Útil con Tailwind (bg-*, text-*, etc.).
   */
  className?: string;
  /**
   * Estilos inline para personalizar el toast (por ejemplo, backgroundColor).
   */
  style?: React.CSSProperties;
  /**
   * Duración del toast en milisegundos.
   */
  duration?: number;
  /**
   * ID opcional para controlar/dismiss un toast específico.
   */
  id?: string | number;
};

type MessageOrOptions =
  | string
  | (UseSonnerShowOptions & { title?: string; text?: string });

function resolveMessageAndDescription(opts: UseSonnerShowOptions) {
  // Si hay title y text, title será el mensaje principal y text la descripción.
  // Si sólo hay text, lo usamos como mensaje principal.
  // Si sólo hay title, lo usamos como mensaje principal.
  const hasTitle = typeof opts.title === "string" && opts.title.trim().length > 0;
  const hasText = typeof opts.text === "string" && opts.text.trim().length > 0;

  if (hasTitle && hasText) {
    return { message: opts.title as string, description: opts.text as string };
  }

  if (hasTitle) {
    return { message: opts.title as string, description: undefined };
  }

  if (hasText) {
    return { message: opts.text as string, description: undefined };
  }

  // Fallback si no se pasó ni title ni text.
  return { message: "", description: undefined };
}

function isCssColor(value?: string): value is string {
  if (!value) return false;
  // Heurística simple: si contiene # o parece un color conocido (palabra sin espacios) lo tratamos como CSS color.
  return /^#([0-9a-fA-F]{3,8})$/.test(value) || /^[a-zA-Z]+$/.test(value) || /^rgb|hsl/.test(value);
}

export function useSonner() {
  /**
   * Muestra un toast con soporte para título/texto, ícono y colores.
   */
  const show = React.useCallback((options: UseSonnerShowOptions) => {
    const { message, description } = resolveMessageAndDescription(options);
    let variant: Variant = "default";

    if (options.color) {
      if (
        options.color === "success" ||
        options.color === "error" ||
        options.color === "warning" ||
        options.color === "info" ||
        options.color === "default"
      ) {
        variant = options.color;
      } else {
        // Si se pasó un string de color CSS, lo tratamos como "custom"
        // y lo aplicamos a style.backgroundColor
        variant = "custom";
      }
    }

    const baseOpts = {
      description,
      icon: options.icon,
      duration: options.duration,
      id: options.id,
      className: options.className,
      style: options.style,
    } as const;

    if (variant === "success") {
      return toast.success(message, baseOpts);
    }
    if (variant === "error") {
      return toast.error(message, baseOpts);
    }
    if (variant === "warning") {
      // sonner no tiene warning dedicado, usamos toast.message con estilos o toast.custom si prefieres.
      return toast.message(message || "Advertencia", {
        ...baseOpts,
        className:
          baseOpts.className ??
          "border border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
      });
    }
    if (variant === "info") {
      // Similar a warning, una variante informativa estilizada.
      return toast.message(message || "Información", {
        ...baseOpts,
        className:
          baseOpts.className ??
          "border border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400",
      });
    }

    if (variant === "custom") {
      const style: React.CSSProperties = { ...(baseOpts.style || {}) };
      if (isCssColor(String(options.color))) {
        style.backgroundColor = String(options.color);
        // Mejora contraste por defecto si el color es oscuro/claro (simple heurística: si es hex)
        if (/^#/.test(String(options.color))) {
          // No calculamos contraste real, pero puedes ajustar textColor si gustas.
          style.color = style.color ?? "white";
        }
      }
      return toast(message, { ...baseOpts, style });
    }

    // default
    return toast(message, baseOpts);
  }, []);

  const toOptions = (messageOrOptions: MessageOrOptions, opts?: Partial<UseSonnerShowOptions>): UseSonnerShowOptions => {
    if (typeof messageOrOptions === "string") {
      return { title: messageOrOptions, ...(opts || {}) };
    }
    return messageOrOptions;
  };

  const success = React.useCallback(
    (messageOrOptions: MessageOrOptions, opts?: Partial<UseSonnerShowOptions>) => {
      const options = toOptions(messageOrOptions, opts);
      const { message, description } = resolveMessageAndDescription(options);
      return toast.success(message, {
        description,
        icon: options.icon,
        duration: options.duration,
        id: options.id,
        className: options.className,
        style: options.style,
      });
    },
    []
  );

  const error = React.useCallback(
    (messageOrOptions: MessageOrOptions, opts?: Partial<UseSonnerShowOptions>) => {
      const options = toOptions(messageOrOptions, opts);
      const { message, description } = resolveMessageAndDescription(options);
      return toast.error(message, {
        description,
        icon: options.icon,
        duration: options.duration,
        id: options.id,
        className: options.className,
        style: options.style,
      });
    },
    []
  );

  const warning = React.useCallback(
    (messageOrOptions: MessageOrOptions, opts?: Partial<UseSonnerShowOptions>) => {
      const options = toOptions(messageOrOptions, opts);
      const { message, description } = resolveMessageAndDescription(options);
      return toast.message(message || "Advertencia", {
        description,
        icon: options.icon,
        duration: options.duration,
        id: options.id,
        className:
          options.className ??
          "border border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
        style: options.style,
      });
    },
    []
  );

  const info = React.useCallback(
    (messageOrOptions: MessageOrOptions, opts?: Partial<UseSonnerShowOptions>) => {
      const options = toOptions(messageOrOptions, opts);
      const { message, description } = resolveMessageAndDescription(options);
      return toast.message(message || "Información", {
        description,
        icon: options.icon,
        duration: options.duration,
        id: options.id,
        className:
          options.className ??
          "border border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400",
        style: options.style,
      });
    },
    []
  );

  const dismiss = React.useCallback((id?: string | number) => {
    if (typeof id === "undefined") return toast.dismiss();
    return toast.dismiss(id);
  }, []);

  return {
    show,
    success,
    error,
    warning,
    info,
    dismiss,
  };
}
