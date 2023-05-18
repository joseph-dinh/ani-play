"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiFillStar } from "react-icons/ai";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { useState, useEffect } from "react";
import EpisodesComponent from "./episodesComponent";
import { VideoPlayer } from ".";

const SummaryComponent = ( props ) => {
  const animeData = props.data.info
  const episodeData = props.data.episodes.episodes
  const episodeDatatest = props.data.episodes
  const router = useRouter()

  // Regex for removing any html tags, or source
  const tagRegex = /(<([^>]+)>)/gi;
  const sourceRegex = /\(Source: .+?\)/g;

  const [classes, setClasses] = useState('text-ellipsis line-clamp-5')

  const viewMore = () => {
    if (classes.includes('text-ellipsis line-clamp-5')) {
      setClasses('')
    }
    else {
      setClasses('text-ellipsis line-clamp-5')
    }
  }

  return (
    <div className="flex flex-col">

      <div className="flex min-w-full aspect-[9/12] bg-cover sm:hidden relative" style={{backgroundImage: `url(${animeData.coverImage.extraLarge})`}}>
          <div className="w-full h-[100%] bg-gradient-to-t from-black to-transparent absolute bottom-0">
          <button onClick={() => {router.back()}} className="absolute left-5 top-10 flex justify-center items-center rounded-full w-12 h-12">
            <div className="relative flex min-w-full min-h-full bg-black rounded-full opacity-90"/>
            <FiChevronLeft className="absolute h-8 w-8"/>
          </button>
              <div className="flex flex-col min-w-full min-h-full justify-end items-center text-center space-y-3 pb-10">
                  <h1 className="text-2xl font-semibold max-w-[80%]">{animeData.title.romaji}</h1>
                  <h2 className="flex flex-row space-x-1 text-xs justify-center items-center text-neutral-400">
                      <p>{animeData.startDate.year}</p>
                      <div className="rounded-full w-1 h-1 bg-neutral-400"/>
                      <p>{animeData.type}</p>
                      <div className="rounded-full w-1 h-1 bg-neutral-400"/>
                      <p>{animeData.format}</p>
                  </h2>
                  <div className="inline-flex justify-center items-center space-x-1">
                      <div className="inline-flex space-x-1 items-center justify-center"><AiFillStar className="w-5 h-5 text-yellow-400"/><h1>{(animeData.averageScore/10 !== 0) ? (animeData.averageScore/10).toFixed(1) : "?"}</h1></div>
                      {animeData.rankings[0] && <div className="inline-flex space-x-[2px] items-center justify-center text-xs text-neutral-400">(<p>#</p><p>{animeData.rankings[0].rank} All Time)</p></div>}
                  </div>
              </div>
          </div>
      </div>

      <div className="hidden sm:flex flex-row bg-blue-400 bg-cover min-w-full h-56 mb-5" style={{backgroundImage: `url(${animeData.bannerImage})`}}>
        <div className="flex min-w-full min-h-full"></div>
      </div>

      <div className="flex flex-col min-w-full px-8 lg:px-[5%] xl:px-[10%] gap-y-6 pb-8">
          <div className="block space-y-5">
              <h1 className="hidden sm:flex text-3xl font-semibold">{animeData.title.english ? animeData.title.english : animeData.title.romaji}</h1>
              <div className="text-xl font-semibold sm:hidden">Synopsis</div>
              <button onClick={viewMore} className="flex text-start text-xs sm:text-sm text-neutral-400">
                  <p className={classes}>{animeData.description?.replace(tagRegex, "").replace(sourceRegex, "")}</p>
              </button>
              <div className="flex flex-col lg:max-w-[55%] relative">
                <ul className="text-sm">
                  <li className="flex justify-between items-center border-b-[1px] py-1 border-neutral-800"><div className="font-medium">Studios</div><div>{animeData.studios ? animeData.studios.nodes.map(studio => studio.name).join(', ') : "Unknown"}</div></li>
                  <li className="flex justify-between items-center border-b-[1px] py-1 border-neutral-800"><div className="font-medium">Status</div><div>{animeData.status ? (animeData.status.toLowerCase().charAt(0).toUpperCase() + animeData.status.toLowerCase().slice(1)) : "Unknown"}</div></li>
                  <li className="flex justify-between items-center border-b-[1px] py-1 border-neutral-800"><div className="font-medium">Season</div><div>{animeData.season ? (animeData.season.toLowerCase().charAt(0).toUpperCase() + animeData.season.toLowerCase().slice(1)) : "?"} {animeData.seasonYear ? (animeData.seasonYear) : "?"}</div></li>
                  <li className="flex justify-between items-center border-b-[1px] py-1 border-neutral-800"><div className="font-medium">Episodes</div><div>{animeData.episodes ? animeData.episodes : "Unknown"}</div></li>
                  <li className="flex justify-between items-center border-b-[1px] py-1 border-neutral-800"><div className="font-medium">Aired</div><div>{animeData.startDate.month ? animeData.startDate.month : "Unknown"} {animeData.startDate.year ? animeData.startDate.year : "Unknown"}</div></li>
                </ul>
              </div>
          </div>
          <EpisodesComponent data={{episode: episodeData, anime: animeData}} name={`Episodes`}/>

          {/* {episodeSource && <VideoPlayer src={proxyUrl}/>} */}
      </div>

    </div>
  );
};

export default SummaryComponent;

// text-ellipsis line-clamp-3