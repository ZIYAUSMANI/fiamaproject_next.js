
import { banners1, banners2 } from "@/data/bannerdata";
import { Fragment } from "react";
import HeroSlider from "./_home_component/HeroSilder";
import FeatureSection from "./_home_component/FeatureSection";
import BannerSection from "./_home_component/BannerSection";
import LatestNews from "./_home_component/LatestNews";
import NewItem from "./_home_component/NewItem";
import TopProduct from "./_home_component/TopProduct";


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
function Home() {
    return (
        <Fragment>
            <HeroSlider />
            <FeatureSection />
            <BannerSection banners={banners1} />
            <NewItem />
            <BannerSection banners={banners2} largeBanner />
            <TopProduct />
            <LatestNews />

        </Fragment>
    );
}

export default Home;