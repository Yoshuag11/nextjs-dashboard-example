import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";

export const metadata = {
  description: "The official Next.js Course Dashboard, built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
  title: {
    default: "Acme Dashboard",
    template: "%s | Acme Dashboard",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
