import "./globals.css";

export const metadata = {
  title: "Chronic Seed Vault V2",
  description: "Chronic Seed Vault V2 proof-of-concept shell",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
