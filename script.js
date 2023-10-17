const postsContainerEl = document.getElementById('posts-container');
const loaderEl = document.getElementById('loader');
const filterEl = document.getElementById('filter');

const limit = 10;
let page = 1;
let loaderIndicator = false;
let storage = [];

const renderItem  = (post) => {
    const {id,title,body} = post;

    const item =`
    <div class="post">
  <div class="number">${id}</div>
  <div class="post_info">
    <h2> ${title}</h2>
    <p class="post_body">${body}</p>
  </div>
</div>    
    `;

    return item;
};

const getTemplate = (posts) => {
    let template = '';

    for (const post of posts) {
        template += renderItem(post);
        
    }

    return template;
};

 const getData = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await response.json();
    storage = [...storage,...data]
    page +=1;
     
    return data;
 };

 const showPosts = async () => {
    loaderEl.classList.add('show');
    loaderIndicator = true;

    const posts = await getData();
    const template = getTemplate(posts);
    postsContainerEl.innerHTML += template;

    loaderEl.classList.remove('show');
    loaderIndicator = false;
 };

const onWindowScroll = () => {
  if (loaderIndicator) {
    return;
  }

const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
const endScrolled = scrollTop + clientHeight + 5;

if (endScrolled >= scrollHeight) {
  showPosts();
}
};

const onSearch = (event) => {
  const term = event.target.value.toLowerCase();

  const filteredPosts = storage.filter((el) => 
  el.title.toLowerCase().includes(term)||
  el.body.toLowerCase().includes(term)||
  el.id.toString().includes(term)
  );
  const template = getTemplate(filteredPosts);
  postsContainerEl.innerHTML = template;
};

 showPosts();

window.addEventListener('scroll', onWindowScroll);
filterEl.addEventListener('input', onSearch);