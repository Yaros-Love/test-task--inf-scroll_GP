const postsList = document.querySelector(`.posts-list`);
let count = 1;

async function fetchPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos/?_page=' + count);
    const data = await response.json();
    count++;
    document.addEventListener(`scroll`, scrollHandler);
    return data;
  } catch (error) {
    console.log(error);
  }
};

let posts = fetchPosts();

const scrollHandler = (evt) => {
  if (evt.target.scrollingElement.scrollHeight - (evt.target.scrollingElement.scrollTop + window.innerHeight) < 100) {
    fetchPosts().then(posts => renderPosts(posts));
    document.removeEventListener(`scroll`, scrollHandler);
  }
}

const getPostTemplate = (data) => {
  return (
    `<figure id="${data.id}" class="post">
      <img src="${data.url}"/>
      <figcaption>${data.title}</figcaption>
    </figure>`
  );
};


const renderPosts = (posts) => {
  posts.forEach(post => postsList.insertAdjacentHTML(`beforeEnd`, getPostTemplate(post)));
};

fetchPosts().then(posts => renderPosts(posts))

