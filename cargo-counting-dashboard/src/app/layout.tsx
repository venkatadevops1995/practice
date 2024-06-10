import "~/styles/globals.css";

import { Providers } from "./providers";
import { ApplicationProvider } from "./context";

export const metadata = {
  title: "Cargo Couting",
  description: "Dashboard",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`inter`}
    >
      <body>
        <ApplicationProvider>
           <Providers>{children}</Providers>
        </ApplicationProvider>
      </body>
    </html>
  );
}
