"use client";

/**
 * Titular de seccion en Anton, con cada linea en su propia mascara para que suba al entrar
 * (revealSection en lib/motion). Las lineas las decide el contenido: dos como maximo por titular.
 */
export function Head({
  lines,
  as: Tag = "h2",
  className = "",
  lineClass = [],
}: {
  lines: string[];
  as?: "h2" | "h3";
  className?: string;
  lineClass?: string[];
}) {
  return (
    <Tag data-lines className={`display-head ${className}`}>
      {lines.map((line, i) => (
        <span key={line} className={`line-mask ${lineClass[i] ?? ""}`}>
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
