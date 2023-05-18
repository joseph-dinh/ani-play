import { GetAnimeById } from "@/lib/getAnimeById"
import { GetAnimeEpisodes } from "@/lib/getAnimeEpisodes"
import { NavBarComponent, SummaryComponent } from "@/components"

export default async function AnimePage({ params }) {
    const { id } = params;
    const animeInfoData = await GetAnimeById(id);
    const animeEpisodeData = await GetAnimeEpisodes("anilist", id);

    return (
        <main className="min-h-screen bg-black text-white relative">
            <NavBarComponent/>
            <SummaryComponent data={{info: animeInfoData, episodes: animeEpisodeData}}/>
        </main>
    )
}