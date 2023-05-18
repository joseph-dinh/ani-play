import { GetAnimeSource } from "@/lib/GetAnimeSource";
import { VideoPlayer } from "@/components";
import { GetAnimeEpisodes } from "@/lib/getAnimeEpisodes";
import Link from "next/link";
import { MdOutlinePersonalVideo } from "react-icons/md"

export default async function WatchAnimePage( params ) {
    // console.log("poooooasfdoaofdsofaosdfoasdofadfadfasfasd!!#@#@!", params)
    const anime_id = params.params.anime;
    const episode_id = params.params.id;
    const currentEpisode = params.searchParams.ep;
    const altSourceId = params.searchParams.alt;
    var prevEpisode = null;
    var nextEpisode = null;
    var currentEpisodeData = null;

    const animeData = await GetAnimeEpisodes("anilist", anime_id)
    const sourceData = await GetAnimeSource(episode_id);
    const altSourceData = await GetAnimeSource(altSourceId)
    const episodeSource = sourceData.url;
    const episodeData = animeData.episodes;
    const altEpisodeSource = altSourceData.url;

    const proxyUrl = 'http://localhost:8088/' + episodeSource;
    const proxyUrlAlt = 'http://localhost:8088/' + altEpisodeSource;

    if (episodeData) {
        episodeData.forEach((episode, episodeIndex) => {
            if (episodeIndex == currentEpisode - 1) {
                currentEpisodeData = episode
            }
            if (episodeIndex == currentEpisode - 2) {
                prevEpisode = episode
            }
            if (episodeIndex == currentEpisode) {
                nextEpisode = episode
            }
        });
    };

    console.log(currentEpisodeData)

    return (
        <main className="min-h-screen bg-black text-white">
            <div className="min-w-full lg:px-[5%] xl:px-[10%]">
                <VideoPlayer params={{main: proxyUrl, alt: proxyUrlAlt}}/>
            </div>

            <div className="flex flex-col min-w-full px-8 lg:px-[5%] xl:px-[10%] gap-5">
                <div className="flex flex-col sm:flex-row min-w-full gap-3 py-5 justify-between">
                    <div className="block text-sm sm:max-w-[75%]">
                        <h2 className="font-medium text-neutral-400">{animeData.title.english ? animeData.title.english : animeData.title.romaji}</h2>
                        <h1 className="text-xl font-semibold">{currentEpisodeData.title}</h1>
                        <h1 className="text-neutral-400">Episode {currentEpisodeData.number}</h1>
                        <div>{currentEpisodeData.description}</div>
                    </div>
                    <div className="flex flex-col gap-3 sm:max-w-[25%]">
                        {nextEpisode && 
                        <div className="block space-y-2">
                            <h1 className="text-lg font-semibold">Next Episode</h1>
                            <Link key={nextEpisode.number} href={`watch/${animeData.anilistId}/${nextEpisode.sources[1].id}?ep=${nextEpisode.number}&alt=${nextEpisode.sources[0].id}`} as={`watch/${animeData.anilistId}/${nextEpisode.sources[1].id}?ep=${nextEpisode.number}&alt=${nextEpisode.sources[0].id}`} className="flex flex-row gap-2 justify-start items-center hover:bg-neutral-900 hover:brightness-110 hover:rounded-sm">
                                <img className="flex aspect-video w-[45%]" src={nextEpisode.image ? nextEpisode.image : "/UnknownImage.png"}/>
                                <div className="block">
                                    <h2 className="text-xs text-neutral-400">Episode {nextEpisode.number}</h2>
                                    <h1 className="text-sm text-ellipsis line-clamp-2">
                                    {nextEpisode.title}
                                    </h1> 
                                </div>
                            </Link>
                        </div>}

                        {prevEpisode && 
                        <div className="block space-y-2">
                            <h1 className="text-lg font-semibold">Previous Episode</h1>
                            <Link key={prevEpisode.number} href={`watch/${animeData.anilistId}/${prevEpisode.sources[1].id}?ep=${prevEpisode.number}&alt=${prevEpisode.sources[0].id}`} as={`watch/${animeData.anilistId}/${prevEpisode.sources[1].id}?ep=${prevEpisode.number}&alt=${prevEpisode.sources[0].id}`} className="flex flex-row gap-2 justify-start items-center hover:bg-neutral-900 hover:brightness-110 hover:rounded-sm">
                                <img className="flex aspect-video w-[45%]" src={prevEpisode.image ? prevEpisode.image : "/UnknownImage.png"}/>
                                <div className="block">
                                    <h2 className="text-xs text-neutral-400">Episode {prevEpisode.number}</h2>
                                    <h1 className="text-sm text-ellipsis line-clamp-2">
                                    {prevEpisode.title}
                                    </h1> 
                                </div>
                            </Link>
                        </div>}

                        {(nextEpisode || prevEpisode) && <Link href={`/anime/${animeData.anilistId}`} className="flex p-1 min-w-full justify-center items-center hover:bg-neutral-900 hover:brightness-110 hover:rounded-sm border-white border-2"><span> See More Episodes</span></Link>}
                    </div>
                </div>

            </div>
        </main>
    )
}