const searchPostForm = document.getElementById("searchPostForm");
const searchPostIdInput = document.getElementById("searchPostIdInput");
const searchFormSubmitButton = document.getElementById(
  "searchFormSubmitButton",
);

const postTitleDisplay = document.getElementById("postTitleDisplay");
const postBodyDisplay = document.getElementById("postBodyDisplay");
const postErrorDisplay = document.getElementById("postErrorDisplay");

const addPostForm = document.getElementById("addPostForm");
const addPostTitleInput = document.getElementById("addPostTitleInput");
const addPostBodyInput = document.getElementById("addPostBodyInput");
const addPostSubmitButton = document.getElementById("addPostSubmitButton");

const editPostForm = document.getElementById("editPostForm");
const editPostIdInput = document.getElementById("editPostIdInput");
const editPostTitleInput = document.getElementById("editPostTitleInput");
const editPostBodyInput = document.getElementById("editPostBodyInput");
const editPostSubmitButton = document.getElementById("editPostSubmitButton");

const deleteAllPostsButton = document.getElementById("deleteAllPostsButton");

const postsContainer = document.getElementById("postsContainer");

let allPosts = [];
const userId = 1;

async function fetchPostById(id) {
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (data.status === 404) {
    throw new Error("Post not found!");
  }

  const response = await data.json();

  if (!response) {
    throw new Error("Unexpected error occurred!");
  }

  return response;
}

async function fetchPosts() {
  const data = await fetch(`https://jsonplaceholder.typicode.com/posts`);

  if (data.status === 404) {
    throw new Error("Posts not found!");
  }

  const response = await data.json();

  if (!response) {
    throw new Error("Unexpected error occurred!");
  }

  return response;
}

async function createPost(title, body) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });

  if (!response.ok) {
    throw new Error("Failed to create post!");
  }

  const data = await response.json();
  return data;
}

async function editPost(postId, updatedTitle, updatedBody) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: postId,
        title: updatedTitle,
        body: updatedBody,
        userId,
      }),
    },
  );

  if (postId > 100) {
    return { id: postId, title: updatedTitle, body: updatedBody };
  }

  if (!response.ok) {
    throw new Error("Failed to edit post!");
  }

  const data = await response.json();
  return data;
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete post!");
  }

  return { message: "Post deleted successfully" };
}

async function deleteAllPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete all posts!");
  }

  return { message: "All posts deleted successfully" };
}

function handleEditPostButtonClick(id) {
  const postContainer = document.querySelector(`#postId-${id}`);
  const postTitle = postContainer.querySelector("h3");
  const postBody = postContainer.querySelector("p");

  editPostIdInput.value = id;
  editPostTitleInput.value = postTitle.innerText;
  editPostBodyInput.value = postBody.innerText;
  editPostSubmitButton.disabled = false;
}

async function handleDeletePostButtonClick(id) {
  const response = await deletePost(id);

  const postContainer = document.querySelector(`#postId-${postId}`);
  postContainer.remove();

  const index = allPosts.findIndex((post) => post.id == id);
  allPosts.splice(index, 1);

  console.log(response);
  alert("Post deleted successfully!");
}

async function reloadPosts() {
  postsContainer.innerHTML = "";

  for (const post of allPosts) {
    const postElement = document.createElement("div");

    postElement.innerHTML = `
      <div id=\"postId-${post.id}\">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button onclick="handleEditPostButtonClick(${post.id})">Edit</button>
        <button onclick="handleDeletePostButtonClick(${post.id})">Delete</button>
      </div>
    `;

    postsContainer.appendChild(postElement);
  }
}

async function cleanAllInput() {
  searchPostIdInput.value = "";

  searchPostIdInput.value = "";
  postErrorDisplay.style.display = "none";

  addPostTitleInput.value = "";
  addPostBodyInput.value = "";

  editPostIdInput.value = "";
  editPostTitleInput.value = "";
  editPostBodyInput.value = "";
  editPostSubmitButton.disabled = true;
}

async function onLoad() {
  allPosts = await fetchPosts();
  reloadPosts();
  cleanAllInput();

  searchPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const postId = searchPostIdInput.value;
    try {
      const post = await fetchPostById(postId);
      postTitleDisplay.innerText = `Title: ${post.title}`;
      postBodyDisplay.innerText = `Body: ${post.body}`;
      cleanAllInput();
    } catch (error) {
      postErrorDisplay.innerText = error.message;
      postErrorDisplay.style.display = "block";
    }
  });
  searchPostIdInput.addEventListener("input", (e) => {
    searchFormSubmitButton.disabled = e.target.value.length == 0;
  });

  addPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const postTitle = addPostTitleInput.value;
    const postBody = addPostBodyInput.value;

    const response = await createPost(postTitle, postBody);
    allPosts.unshift(response);
    reloadPosts();
    cleanAllInput();

    alert("Post created successfully!");
  });

  editPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const postId = editPostIdInput.value;
    const updatedTitle = editPostTitleInput.value;
    const updatedBody = editPostBodyInput.value;

    const response = await editPost(postId, updatedTitle, updatedBody);

    const index = allPosts.findIndex((post) => post.id == postId);
    allPosts[index] = response;
    reloadPosts();
    cleanAllInput();

    console.log(`Post ${JSON.stringify(response)} updated successfully!`);
    alert("Post updated successfully!");
  });

  deleteAllPostsButton.addEventListener("click", async () => {
    await deleteAllPosts();

    allPosts = [];
    reloadPosts();
    alert("All posts deleted successfully!");
  });
}

onLoad();
