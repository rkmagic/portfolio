import { HomeMain } from "@/components/home-main";
import { HomePageClient } from "@/components/home-page-client";

export default function HomePage() {
  return (
    <HomePageClient>
      <HomeMain />
    </HomePageClient>
  );
}
