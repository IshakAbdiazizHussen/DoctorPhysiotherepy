import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata = {
  title: "DoctorPhysio | Modern Rehabilitation Clinic",
  description:
    "Premium physiotherapy, rehabilitation, pain relief, mobility recovery, and appointment booking for modern healthcare experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const storageKey = "doctorphysio-theme";
                const root = document.documentElement;
                const body = document.body;
                const stored = localStorage.getItem(storageKey);
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const theme = stored || (prefersDark ? "dark" : "light");
                root.classList.toggle("dark", theme === "dark");
                if (body) body.classList.toggle("dark", theme === "dark");
                root.style.colorScheme = theme;
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[var(--bg)] text-[var(--text)]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
