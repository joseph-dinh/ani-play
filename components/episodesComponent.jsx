"use client"
import Link from "next/link";

const EpisodesComponent = ( props ) => {
    const episodeData = props.data.episode
    const animeData = props.data.anime
    
    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-xl font-semibold">{props.name}</h1>
            
            <div className="flex flex-col gap-2 sm:hidden">
                {episodeData && 
                    episodeData.map((episode, i) => {
                    return (
                        <Link key={episode.number} href={`watch/${animeData.id}/${episode.sources[1].id}?ep=${episode.number}&alt=${episode.sources[0].id}`} as={`watch/${animeData.id}/${episode.sources[1].id}?ep=${episode.number}&alt=${episode.sources[0].id}`} className="flex flex-row space-x-2 justify-enter items-center hover:bg-neutral-950 hover:brightness-110">
                            <img className="flex aspect-video w-[45%]" src={episode.image ? episode.image : "/UnknownImage.png"}/>
                            <div className="block">
                                <h2 className="text-xs text-neutral-400">Episode {episode.number}</h2>
                                <h1 className="text-sm text-ellipsis line-clamp-2">
                                {episode.title}
                                </h1> 
                            </div>

                        </Link>
                    )
                })}
            </div>

            <div className="hidden sm:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
                {episodeData && 
                    episodeData.map((episode, i) => {
                    return (
                        <Link key={episode.number} href={`watch/${animeData.id}/${episode.sources[1].id}?ep=${episode.number}&alt=${episode.sources[0].id}`} as={`watch/${animeData.id}/${episode.sources[1].id}?ep=${episode.number}&alt=${episode.sources[0].id}`} className="flex flex-col gap-2 justify-start items-start p-1 hover:bg-neutral-950 hover:brightness-110 hover:rounded-sm">
                            <img className="flex aspect-video" src={episode.image ? episode.image : "/UnknownImage.png"}/>
                            <div className="block">
                                <h2 className="text-xs text-neutral-400 gr">Episode {episode.number}</h2>
                                <h1 className="text-sm text-ellipsis line-clamp-2">
                                {episode.title}
                                </h1> 
                            </div>
                        </Link>
                    )
                })}
            </div>

    </div>
    );
};

export default EpisodesComponent;