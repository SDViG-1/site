import type { Metadata, Viewport } from "next";
import { Inter, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const display = Lora({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sdvig.app"),
  title: {
    default: "SDViGApp — Вытащи себя из хаоса",
    template: "%s · SDViGApp",
  },
  description:
    "Спокойный инструмент продуктивности: утро/вечер, фокус, wellbeing и финансы. Игровая механика, приватность на устройстве.",
  openGraph: {
    title: "SDViGApp — Вытащи себя из хаоса",
    description:
      "Спокойный инструмент продуктивности: утро/вечер, фокус, wellbeing и финансы.",
    type: "website",
    locale: "ru_RU",
  },
  applicationName: "SDViGApp",
  keywords: [
    "продуктивность",
    "фокус",
    "wellbeing",
    "дофамин",
    "геймификация",
    "привычки",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-teal-200/40">
        {children}
      </body>
    </html>
  );
}
