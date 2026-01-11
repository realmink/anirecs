export async function anilistUser(username: string) {
    var query = `
        query ($name: String) { 
            User (name: $name) {
                name
        }
    }
    `;

    var variables = {
        name: username
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

    if(json.data && json.data.User) {
        return true;
    } else {
        return false;
    }
}

export async function userList(username: String) {
    var query = `
        query ($userName: String) { 
            MediaListCollection (userName: $userName, type: ANIME) { 
                lists {
                    entries {
                        score
                        media {
                            id
                            title {
                                romaji
                                english
                            }
                        }
                    }
                }
            }
        }
    `;


    var variables = {
        userName: username
    };


    var url = 'https://graphql.anilist.co';
        var options = {
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

    console.log("Fetching list for username:", username);
    console.log("API Response:", json);
    return json.data.MediaListCollection.lists;
}
