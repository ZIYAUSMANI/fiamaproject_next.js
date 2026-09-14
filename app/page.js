
import { banners1, banners2 } from "@/data/bannerdata";
import { Fragment } from "react";
import HeroSlider from "./_home_component/HeroSilder";
import FeatureSection from "./_home_component/FeatureSection";
import BannerSection from "./_home_component/BannerSection";
import LatestNews from "./_home_component/LatestNews";
import NewItem from "./_home_component/NewItem";
import TopProduct from "./_home_component/TopProduct";


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