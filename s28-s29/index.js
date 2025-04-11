const loginForm = document.querySelector("form");
const postIdInput = document.getElementById("postId");
const formSubmitButton = document.getElementById("formSubmitButton");

const postTitleDisplay = document.getElementById("postTitleDisplay");
const postBodyDisplay = document.getElementById("postBodyDisplay");
const postErrorDisplay = document.getElementById("postErrorDisplay");

postIdInput.value = "";

async function fetchFormById(id) {
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

async function onSubmit(e) {
  e.preventDefault();

  const postId = postIdInput.value;

  try {
    const post = await fetchFormById(postId);

    postIdInput.value = "";
    postTitleDisplay.innerText = `Title: ${post.title}`;
    postBodyDisplay.innerText = `Body: ${post.body}`;

    postErrorDisplay.style.display = "none";
  } catch (error) {
    postErrorDisplay.innerText = error.message;
    postErrorDisplay.style.display = "block";
  }
}

loginForm.addEventListener("submit", onSubmit);

postIdInput.addEventListener("input", (e) => {
  formSubmitButton.disabled = e.target.value.length == 0;
});
