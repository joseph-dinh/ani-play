export async function GetAnimeSource(episode_id) {
    // const url = `https://api.jikan.moe/v4/anime?q=${q}`;
    const url = `https://api.enime.moe/source/${episode_id}`
  
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
    
    return data;
  }
  