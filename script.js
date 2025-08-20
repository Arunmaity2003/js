const apiKey = 'fc86cd1da53e4684964cf3acded29d58';

const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById("search-input");

const searchBtn = document.getElementById("search-btn");

async function fetchRandomNews(){
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`

        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles;
    } catch (error) {
        console.error("Error in finding random news",error);
        return [];
    }
}

searchBtn.addEventListener("click",async () => {
    const query = searchField.value.trim()
    if(query !== ""){
        try {
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        } catch (error) {
            console.log("Error fetching news by query",error);
        }
    }
})

async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`

        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles;
    } catch (error) {
        console.error("Error in finding query",error);
        return [];
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML = ""
    articles.forEach((articles) => {
        const blogCard = document.createElement("div")
        blogCard.classList.add("blog-card")
        const img = document.createElement("img")
        img.src = articles.urlToImage
        img.alt = articles.title
        const title = document.createElement("h2")
        const truncatedTitle = articles.title.length > 30 ? articles.title.slice(0,30) + "....":articles.title
        title.textContent = truncatedTitle

        const description = document.createElement("p")
        const truncatedDes = articles.description.length > 100 ? articles.description.slice(0,100) + "....":articles.description
        description.textContent = truncatedDes

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)

        blogCard.addEventListener("click",() => {
            window.open(articles.url,"_blank");
        })

        blogContainer.appendChild(blogCard)
    })
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles)
    } catch (error) {
        console.error("Error in finding random news",error);
    }
})();