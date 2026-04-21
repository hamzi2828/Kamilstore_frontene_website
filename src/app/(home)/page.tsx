import HeroBanner from "./components/HeroBanner";
import PromoBanner from "./components/PromoBanner";
import TrustBadges from "@/components/home/TrustBadges";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FlashDeals from "@/components/home/FlashDeals";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TopVendors from "@/components/home/TopVendors";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 pt-4 sm:pt-5 pb-20 sm:pb-28">
      <HeroBanner />
      <TrustBadges />
      <FeaturedCategories />
      <FlashDeals />
      <PromoBanner />
      <FeaturedProducts />
      <TopVendors />
      <Newsletter />
    </div>
  );
}
