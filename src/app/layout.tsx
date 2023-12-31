import SideBar from "@/components/Sidebar/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/context/theme-context";
import DataDeliveryWrapper from "@/context/data-delivery-wrapper";
import NextTopLoader from "nextjs-toploader";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar/Navbar";
import dynamic from "next/dynamic";

const rubik = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plasma Knights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(rubik.className, "overflow-y-hidden")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          themes={["light", "dark"]}
        >
          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          {/* <SocketProvider> */}
          <DataDeliveryWrapper>
            <div className="overflow-hidden lg:grid lg:grid-cols-[320px_1fr]">
              <SideBar />
              <div className="max-h-screen overflow-y-scroll w-full">
                <Navbar />
                <div className="py-8 px-16">{children}</div>
              </div>
            </div>
          </DataDeliveryWrapper>
          {/* </SocketProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
