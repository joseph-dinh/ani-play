import { GetSearchAnime } from "@/lib/getSearchAnime";
import { Link } from "next/link"
import { AiFillStar } from "react-icons/ai";
import { SearchCardComponent } from "@/components";

export default async function SearchPage( props ) {
    const searchQuery = props.params.query;
    const searchResultData = await GetSearchAnime(searchQuery)
    const animeResults = searchResultData.data

    // console.log(animeResults)
    return (
        <main className="min-h-screen bg-black text-white relative">
            <SearchCardComponent animeResults={animeResults} name={`Results`}/>
        </main>
    )
}