const BASE_URL = 'http://localhost:3000';

//getting all the boards
export async function getBoards() {
  const url = `${BASE_URL}/boards`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
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
    body: JSON.stringify(data)
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

//delete boards and its cards
export async function deleteBoards() {
  const url = `${BASE_URL}/boards/:id`;
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
export async function getCards() {
  const url = `${BASE_URL}/boards/:id/cards`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}


//create a card for a board
export async function postCards(data) {
  const url = `${BASE_URL}/boards/:id/cards`;
  try {
    const response = await fetch(url, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
  },
    body: JSON.stringify(data)
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


//delete card
export async function deleteCards() {
  const url = `${BASE_URL}/cards/:id`;
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

//upvote a card
export async function upvoteCards() {
  const url = `${BASE_URL}/cards/:id/upvote`;
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

