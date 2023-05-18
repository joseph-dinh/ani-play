export async function GetAnimeEpisodes(providerName, anime_id) {
    const url = `https://api.enime.moe/mapping/${providerName}/${anime_id}`
  
    const data = await fetch(url)
      .then(handleResponse)
      .then(handleData)
      .catch(handleError);
  
    function handleResponse(response) {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    }
  
    function handleData(data) {
        // console.log(data)
      return data;
    }
  
    function handleError(error) {
      console.error('Error, check console');
      console.error(error);
      return (error);
    }

    // Sort episodes by number ascending
    if (data.episodes) {
      data.episodes.sort(function(a, b){return a.number-b.number})
    }
    
    return data;
  }
  