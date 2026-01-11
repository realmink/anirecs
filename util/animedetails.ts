export async function fetchAnimeDetails(title: string) {
    var query = `
        query ($search: String!) {
            Page {
                media(search: $search, type: ANIME) {
                    id
                    coverImage {
                        large
                    }
                    title {
                        romaji
                        english
                        native
                    }
                }
            }
        }
    `;

    var variables = {
        search: title
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

    const res = await fetch(url, options);
    const json = await res.json();

    if(json.data && json.data.Page && json.data.Page.media[0]) {
        return json.data.Page.media[0];
    } else {
        return null;
    }
}