export async function GetTrendingAnime(currPage, numPerPage, varSort, varStatus) {
  // GraphQL query
    var query = `
        query ($id: Int, $page: Int, $perPage: Int, $sort: [MediaSort], $status: MediaStatus) {
            Page (page: $page, perPage: $perPage) {
                pageInfo {
                    total
                    currentPage
                    lastPage
                    hasNextPage
                    perPage
                }
                media (id: $id, sort: $sort, type: ANIME, status: $status) {
                    id
                    title {
                        romaji
                        english
                    }
                    coverImage {
                        extraLarge
                        color
                    }
                    averageScore
                }
            }
        }
      `;
  
      var variables = {
        page: currPage,
        perPage: numPerPage,
        sort: varSort,
        status: varStatus
      };
  
      var url = 'https://graphql.anilist.co',
          options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              query: query,
              variables: variables
            })
          };
  
      const data = await fetch(url, options)
        .then(handleResponse)
        .then(handleData)
        .catch(handleError);
  
      function handleResponse(response) {
        return response.json().then(function (json) {
          return response.ok ? json : Promise.reject(json);
        });
      }
  
      function handleData(data) {
        // console.log(data.data.Page)
        return (data.data.Page)
      }
  
      function handleError(error) {
        console.error('Error, check console');
        console.error(error);
        return (error)
      }

      return (data)

  }