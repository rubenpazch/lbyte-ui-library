import React from "react";
import styles from "./Card.module.css";

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** outlined (borde, por defecto) o elevated (sombra). */
  variant?: "outlined" | "elevated";
  /** Relleno interno cuando no se usan CardHeader/CardBody: none, sm, md (por defecto) o lg. */
  padding?: "none" | "sm" | "md" | "lg";
  /** Etiqueta HTML: div (por defecto), section, article o li. */
  as?: "div" | "section" | "article" | "li";
  /** Si se pasa, la tarjeta es clicable (sombra al pasar y foco con teclado). */
  onClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
}

/** Contenedor con borde o sombra para agrupar información. Usa CardHeader, CardBody y CardFooter. */
const Card = React.forwardRef<HTMLElement, CardProps>(function Card(
  {
    variant = "outlined",
    padding = "none",
    as: Tag = "div",
    onClick,
    onKeyDown,
    role,
    tabIndex,
    className,
    children,
    ...rest
  },
  ref,
) {
  const interactive = Boolean(onClick);
  return React.createElement(
    Tag,
    {
      ...rest,
      ref,
      className: cx(
        styles.card,
        styles[variant],
        padding !== "none" && styles[`pad-${padding}`],
        interactive && styles.interactive,
        className,
      ),
      onClick,
      role: interactive ? (role ?? "button") : role,
      tabIndex: interactive ? (tabIndex ?? 0) : tabIndex,
      onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
        if (interactive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          (e.currentTarget as HTMLElement).click();
        }
        onKeyDown?.(e);
      },
    },
    children,
  );
});
Card.displayName = "Card";

export interface CardHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** Título de la tarjeta. */
  title?: React.ReactNode;
  /** Texto secundario bajo el título. */
  subtitle?: React.ReactNode;
  /** Acciones a la derecha (botones, menú). */
  actions?: React.ReactNode;
}

/** Cabecera de Card con título, subtítulo y acciones. */
export function CardHeader({
  title,
  subtitle,
  actions,
  className,
  children,
  ...rest
}: CardHeaderProps) {
  return (
    <div className={cx(styles.header, className)} {...rest}>
      <div className={styles.headings}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}

/** Cuerpo de Card. */
export function CardBody({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(styles.body, className)} {...rest} />;
}

/** Pie de Card (botones o totales). */
export function CardFooter({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cx(styles.footer, className)} {...rest} />;
}

export default Card;
