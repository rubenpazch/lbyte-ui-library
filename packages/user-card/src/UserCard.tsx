import React from "react";
import { Avatar } from "@rubenpazch/avatar";
import Menu, { type MenuItem } from "@rubenpazch/menu";
import styles from "./UserCard.module.css";

export interface UserCardProps {
  /** Nombre visible. */
  name: string;
  /** Dato secundario bajo el nombre: correo, documento, cargo… */
  subtitle?: React.ReactNode;
  /** Foto. Sin ella se muestran las iniciales del nombre. */
  avatarSrc?: string;
  /** Etiquetas (normalmente `Badge`): rol, estado, módulos… */
  badges?: React.ReactNode;
  /** Acciones principales visibles en el pie (una o dos `Button`). */
  actions?: React.ReactNode;
  /** Acciones secundarias en el menú ⋮ (editar contraseña, eliminar…). */
  menuItems?: MenuItem[];
  /** Texto accesible del botón ⋮. Por defecto "Más acciones para <nombre>". */
  menuLabel?: string;
  /** Contenido extra entre las etiquetas y el pie. */
  children?: React.ReactNode;
  /** Atenúa la tarjeta (p. ej. usuario inactivo). */
  muted?: boolean;
  as?: "article" | "li" | "div";
  className?: string;
}

/** Iniciales para el avatar: "Ana María Pérez" → "AP". */
export function initials(name: string): string {
  const partes = name.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  const primera = partes[0][0] ?? "";
  const ultima = partes.length > 1 ? (partes[partes.length - 1][0] ?? "") : "";
  return (primera + ultima).toUpperCase();
}

/**
 * Tarjeta de una persona: avatar, nombre, dato secundario, etiquetas y acciones.
 * Las acciones principales se ven en el pie; las secundarias van en un menú ⋮ para que la
 * tarjeta no se llene de botones.
 */
export default function UserCard({
  name,
  subtitle,
  avatarSrc,
  badges,
  actions,
  menuItems,
  menuLabel,
  children,
  muted = false,
  as: Tag = "article",
  className,
}: UserCardProps) {
  const tieneMenu = (menuItems?.length ?? 0) > 0;
  return (
    <Tag
      className={[styles.card, muted ? styles.muted : undefined, className]
        .filter(Boolean)
        .join(" ")}
      aria-label={name}
    >
      <div className={styles.head}>
        <Avatar
          src={avatarSrc}
          alt={avatarSrc ? name : undefined}
          className={styles.avatar}
        >
          {initials(name)}
        </Avatar>
        <div className={styles.identity}>
          <p className={styles.name}>{name}</p>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {tieneMenu && (
          <div className={styles.menu}>
            <Menu
              items={menuItems!}
              label={menuLabel ?? `Más acciones para ${name}`}
              align="end"
            />
          </div>
        )}
      </div>
      {badges && <div className={styles.badges}>{badges}</div>}
      {children && <div className={styles.extra}>{children}</div>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </Tag>
  );
}
