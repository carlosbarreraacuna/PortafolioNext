import type { Metadata, Viewport } from "next";
import { Anton, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { I18nProvider } from "@/componentes/portfolio/I18nProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

// Titular gigante del hero: condensada y pesada, como un cartel.
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carlos Barrera Acuña | Full Stack Developer",
  description: "Ingeniero de Sistemas y desarrollador Full Stack en Cartagena, Colombia. Laravel, Next.js y PostgreSQL.",
  openGraph: {
    title: "Carlos Barrera Acuña | Full Stack Developer",
    description: "Plataformas web empresariales con Laravel, Next.js y PostgreSQL.",
    images: ["/carlos-toon.png"],
    locale: "es_CO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFF4E2" },
    { media: "(prefers-color-scheme: dark)", color: "#141A2B" },
  ],
};

// Fija el tema antes del primer pintado para evitar el destello. Orden: preferencia guardada, luego sistema.
const themeScript = `(function(){try{var t=localStorage.getItem("cb-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","dark")}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${jakarta.variable} ${anton.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
