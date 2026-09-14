import { Montserrat } from "next/font/google";
import "../styles/theme.scss";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import BrandLogo from "@/component/BrandLogo";
import Navigation from "@/component/Navigation";
import ScrollToTop from "@/component/ScrollToTop";
import ReduxProvider from "@/component/ReduxProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "Flower Shop",
  description: "Fresh flowers and gifts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
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