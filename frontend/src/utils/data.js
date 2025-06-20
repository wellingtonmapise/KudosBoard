const BASE_URL = "http://localhost:3000";
const apiKey = import.meta.env.VITE_APP_API_KEY;

//fetching gifs
export async function getGifs(searchQuery) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchQuery}&limit=25&offset=0&rating=g&lang=en`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error.message);
  }
}

//getting all the boards
export async function getBoards(search = "", category = "") {
  const url = new URL(`${BASE_URL}/boards`);

  if (search) {
    url.searchParams.append("search", search);
  }
  if (category) {
    url.searchParams.append("category", category);
  }
  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

//route for creating a new board
export async function postBoards(data) {
  const url = `${BASE_URL}/boards`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

//delete board and its cards
export async function deleteBoards(id) {
  const url = `${BASE_URL}/boards/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

//get all cards for a board
export async function getCards(boardId) {
  const url = `${BASE_URL}/boards/${boardId}/cards`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

//create a card for a board
export async function postCards(data, boardId) {
  const url = `${BASE_URL}/boards/${boardId}/cards`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

//delete card
export async function deleteCards(cardId) {
  const url = `${BASE_URL}/cards/${cardId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

//upvote a card
export async function upvoteCards(cardId) {
  const url = `${BASE_URL}/cards/${cardId}/upvote`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

//change pins status
export async function getPins(cardId) {
  const url = `${BASE_URL}/cards/${cardId}/pinned`;
  try {
    const response = await fetch(url, {
      method: "PUT",

    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

//fetch comments for a card
export async function getComments(cardId) {
  const url = `${BASE_URL}/cards/${cardId}/comments`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      return json;
  }
  catch (error) {
    console.error(error.message);
}
}

//post a comment for a card
export async function postComments(data, cardId) {
  const url = `${BASE_URL}/cards/${cardId}/comments`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}
