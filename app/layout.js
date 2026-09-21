import { Montserrat } from "next/font/google";
import "../styles/theme.scss";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import BrandLogo from "@/component/BrandLogo";
import Navigation from "@/component/Navigation";
import ScrollToTop from "@/component/ScrollToTop";
import ReduxProvider from "@/provider/ReduxProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Fiama - Flower Shop eCommerce",
    template: "%s | Fiama Flower Shop",
  },

  description:
    "Shop beautiful flowers, bouquets, gifts, and floral arrangements online with Fiama Flower Shop. Find the perfect flowers for every special occasion.",

  keywords: [
    "Fiama Flower Shop",
    "online flower shop",
    "buy flowers online",
    "flower bouquets",
    "flower delivery",
    "flower gifts",
    "fresh flowers",
    "floral arrangements",
    "birthday flowers",
    "wedding flowers",
  ],

  authors: [
    {
      name: "Fiama Flower Shop",
    },
  ],

  creator: "Fiama Flower Shop",
  publisher: "Fiama Flower Shop",

  robots: {
    index: false,
    follow: true,
  },

  twitter: {
    card: "summary",
    title: "Fiama - Flower Shop eCommerce",
    description:
      "Shop beautiful flowers, bouquets, and gifts online with Fiama Flower Shop.",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable} data-scroll-behavior="smooth">
      <body>
        <ReduxProvider>
          <Header />
          <Navigation />
          {children}
          <BrandLogo />
          <Footer />
          <ScrollToTop />
        </ReduxProvider>
      </body>
    </html>
  );
}