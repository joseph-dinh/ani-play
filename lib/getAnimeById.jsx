export async function GetAnimeById(anime_id) {
    // GraphQL query
    var query = `
    query ($id: Int) {
        Media (id: $id, type: ANIME) {
            id
            idMal
            title {
                romaji
                english
                native
            }
            coverImage {
                extraLarge
                color
            }
            averageScore
            episodes
            description
            genres
            bannerImage
            streamingEpisodes {
                title
                thumbnail
                url
            }
            nextAiringEpisode {
                episode
            }
            airingSchedule{
                nodes
                {
                    episode
                    airingAt
                }
            }
            startDate {
                year
                month
            }
            endDate {
                year
                month
            }
            type
            status
            duration
            popularity
            source
            rankings {
                id
                rank
                allTime
                type
                year
            }
            format
            season
            seasonYear
            trailer {
                site
                thumbnail
                id
            }
            seasonInt
            episodes
            studios (isMain: true) {
                nodes {
                    name
                    siteUrl
                }
                edges {
                    isMain
                }
            }
        }
    }
    `;

    var variables = {
        id: anime_id
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
            // console.log(data.data.Media)
            return (data.data.Media)
        }
    
        function handleError(error) {
            console.error('Error, check console');
            console.error(error);
            return (error)
        }

        if (data.startDate) {
            switch (data.startDate.month) {
                case 1:
                    data.startDate.month = "January";
                    break;
                case 2:
                    data.startDate.month = "February";
                    break;
                case 3:
                    data.startDate.month = "March";
                    break;
                case 4:
                    data.startDate.month = "April";
                    break;
                case 5:
                    data.startDate.month = "May";
                    break;
                case 6:
                    data.startDate.month = "June";
                    break;
                case 7:
                    data.startDate.month = "July";
                    break;
                case 8:
                    data.startDate.month = "August";
                    break;
                case 9:
                    data.startDate.month = "September";
                    break;
                case 10:
                    data.startDate.month = "October";
                    break;
                case 11:
                    data.startDate.month = "November";
                    break;
                case 12:
                    data.startDate.month = "December";
                    break;
                default:
                    break;
            }        
        }
  
        return (data)
  
    }