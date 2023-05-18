import { NavBarComponent, CardComponent } from "@/components"
import { GetTrendingAnime } from "@/lib/getTrendingAnime"
import { GetRecentAnime } from "@/lib/getRecentAnime";

//currPage, numPerPage, varStatus, varSort

export default async function Home() {
  const trendingAnimeNowData = await GetTrendingAnime(1, 20, "TRENDING_DESC");
  const currentlyAiringData = await GetTrendingAnime(1, 20, "POPULARITY_DESC", "RELEASING");
  const highestScoreData = await GetTrendingAnime(1, 20, "SCORE_DESC");
  const recentAnimeData = await  GetRecentAnime();

  console.log(recentAnimeData )
  // const animeEpisodesData = await GetAnimeEpisodes("jigokuraku")
  // console.log(animeEpisodesData);
  
  return (
    <main className="min-h-screen bg-black p-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-56 text-white">
      <div className="flex flex-col space-y-8">
        <NavBarComponent/>
        <CardComponent data={trendingAnimeNowData} name={`Trending Now`}/>
        <CardComponent data={currentlyAiringData} name={`Currently Airing`}/>
        <CardComponent data={highestScoreData} name={`Highest Rated`}/>

      </div>
    </main>
  )
}

