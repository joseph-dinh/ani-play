"use client"
import Link from "next/link";
import { BiChevronRight } from "react-icons/bi"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

const CardComponent = ( props ) => {
  const animeData = props.data.media
  // console.log(animeData)

  return (
    <div className="flex flex-col space-y-3">
          
      <div className="flex flex-row justify-between items-center lg:items-end">
        <div className="font-semibold text-2xl">{props.name}</div>
        {/* <button className="font-semibold text-2xl rounded-full bg-neutral-800 lg:hidden">
          <BiChevronRight className="h-8 w-8"/>
        </button> */}
        <div className="font-light text-[14px]">
          View All
        </div>
      </div>

      <div id="horizontalScroll" className="grid grid-flow-col overflow-x-scroll gap-3 items-start justify-start">
        
        {animeData && 
        animeData.map((card, i) => {
          return (
            <Link key={card.id} href={`/anime/${card.id}`} as={`/anime/${card.id}`} className="flex flex-col w-32 sm:w-40 md:w-48 space-y-2 relative group">
              <div className="w-full h-full aspect-[9/14] bg-cover bg-center relative" style={{backgroundImage: `url(${card.coverImage.extraLarge})`}}>
                <div className="w-[104%] aspect-[9/14] h-[20%] transition-all duration-500 group-hover:h-full bg-gradient-to-t from-black to-transparent group-hover:from-10% absolute bottom-0 -left-1"/>
                <div className="absolute bottom-0 left-0 hidden group-hover:flex transition-all duration-500 space-x-1 justify-between px-2 items-center"><AiFillStar className="w-5 h-5 text-yellow-400"/><h1>{(card.averageScore/10 !== 0) ? (card.averageScore/10).toFixed(1) : "?"}</h1></div>
                {/* <div className="absolute bottom-0 right-0 hidden group-hover:flex transition-all duration-500 space-x-1 justify-between px-2 items-center"><h1>11/13</h1></div> */}
              </div>
              <div className="font-semibold hidden sm:flex">
                {card.title.english ? (card.title.english.length > 30 ?
                  card.title.english.slice(0,30) + "..." :
                  card.title.english) : (card.title.romaji.length > 30 ?
                  card.title.romaji.slice(0,30) + "..." :
                  card.title.romaji)
                }
              </div>
              <div className="font-semibold sm:hidden">
                {card.title.english ? (card.title.english.length > 15 ?
                  card.title.english.slice(0,15) + "..." :
                  card.title.english) : (card.title.romaji.length > 15 ?
                  card.title.romaji.slice(0,15) + "..." :
                  card.title.romaji)
                }
              </div>
            </Link>
          )
        })}

      </div>

    </div>
  );
};

export default CardComponent;