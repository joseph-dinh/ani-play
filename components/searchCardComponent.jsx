"use client"
import Link from "next/link";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

const SearchCardComponent = ( props ) => {
  const animeData = props.animeResults
  console.log(animeData)
  return (
    <div className="flex flex-col space-y-3 px-8 lg:px-[5%] xl:px-[10%] gap-y-6 pb-8">
          
      <div className="flex flex-row justify-between items-center lg:items-end">
        <div className="font-semibold text-2xl">{props.name}</div>
      </div>

      <div id="horizontalScroll" className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        
        {animeData && 
        animeData.map((results, i) => {
          return (
            <Link key={results.mappings.anilist} href={`/anime/${results.mappings.anilist}`} as={`/anime/${results.mappings.anilist}`} className="flex flex-col space-y-2 relative group">
                <div className="w-full h-full aspect-[9/14] bg-cover bg-center relative" style={{backgroundImage: `url(${results.coverImage})`}}>
                <div className="w-[104%] aspect-[9/14] h-[20%] transition-all duration-500 group-hover:h-full bg-gradient-to-t from-black to-transparent group-hover:from-10% absolute bottom-0 -left-1"/>
                <div className="absolute bottom-0 left-0 hidden group-hover:flex transition-all duration-500 space-x-1 justify-between px-2 items-center"><AiFillStar className="w-5 h-5 text-yellow-400"/><h1>{(results.averageScore/10 !== 0) ? (results.averageScore/10).toFixed(1) : "?"}</h1></div>
                </div>
                <div className="font-semibold hidden sm:flex">
                {results.title.english ? (results.title.english.length > 30 ?
                    results.title.english.slice(0,30) + "..." :
                    results.title.english) : (results.title.romaji.length > 30 ?
                    results.title.romaji.slice(0,30) + "..." :
                    results.title.romaji)
                }
                </div>
                <div className="font-semibold sm:hidden">
                {results.title.english ? (results.title.english.length > 15 ?
                    results.title.english.slice(0,15) + "..." :
                    results.title.english) : (results.title.romaji.length > 15 ?
                    results.title.romaji.slice(0,15) + "..." :
                    results.title.romaji)
                }
                </div>
            </Link>
          )
        })}

      </div>

    </div>
  );
};

export default SearchCardComponent;