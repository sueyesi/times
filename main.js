
const API_KEY = `6aba51ea81af491aa6793d096958527f`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");//버튼을 가져온다
const searchInput = document.getElementById("searchInput");
//console.log("eee",menus)
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsCategory(event)));
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`); 
//let url = new URL( `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`)


const getArticles = async()=>{
    const response = await fetch(url); // await  fetch함수가 완료될 때까지 기다려준다
    const data = await response.json();// json파일형식
    newsList = data.articles;
    render();
}

//뉴스를 가져오는 함수 설정
const getLatestNews = async() =>{ 
    //url = new URL( `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`); 
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`); 
    getArticles();
    console.log("rrr",newsList); 
       
};

const getNewsCategory = async(event) => {
    //console.log("category");   
    const category = event.target.textContent.toLowerCase();
    console.log("category",category);
    //url = new URL( `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`); 
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?category=${category}`);     
    console.log("ddd",data);
    getArticles();
}
//
const getNewsByKeyword=async()=>{    
    const keyword = document.getElementById("searchInput").value;
    //console.log("keyword", keyword)
     //url = new URL( `https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`); 
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}`); 
    let searchValue = searchInput.value;

    const response = await fetch(url);
    const data = await response.json();
    if (data.articles.length === 0) {
        alert("검색된 키워드가 없습니다."); 
        searchInput.value = '';
        return;        
    }
    if(searchValue == ''){
        alert("키워드가 입력되지 않았습니다.");
        return;
    }
    //console.log("keyword",data);
    newsList = data.articles;
    render();
    searchInput.value = '';
    
}
searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});
const render =()=>{
    const newsHTML = newsList.map(news=>`
        <div class="row news">
                <div class="col-lg-4 imgArea">
                    <img class="newsImgSize" src=${news.urlToImage || '../images/noImage.png'}  onError="this.src='../images/noImage.png'" />
                </div>
                <div  class="col-lg-8">
                    <dl>
                        <dt>${news.title}</dt>                        
                        <dd>${news.description ? (news.description.length > 200 ? news.description.slice(0, 200) + '...' : news.description) : '내용없습니다'}</dd>
                        <dd>                        
                        ${news.source ? `<span>${news.source.name}</span>` : '<span>출처가 없습니다.</span>'}
                        <span class="date">
                        ${moment(news.publishedAt).format()};
                        </span>
                        </dd>
                    </dl>
                </div>
            </div>
        `)
        .join("");
        //console.log("html", newsHTML)
    document.getElementById("newsBoard").innerHTML = newsHTML;
}

let openNav = () =>{
    document.getElementById("mySidenav").style.width = "50%";  
}

let closeNav = () =>{
    document.getElementById("mySidenav").style.width = "0";
}
/*
let searchBtn = document.querySelector('.searchBtn');
let searchClicked = false;
let openSearch = () => {
    if(searchClicked === false) {
      searchClicked = true;
      searchArea.style.width = '35%';
      searchArea.style.opacity = '1';
    } else if (searchClicked === true) {
      searchClicked = false;
      searchArea.style.width = '0';
      searchArea.style.opacity = '0';
    }
  }
  searchBtn.addEventListener("click", openSearch)
*/
 

getLatestNews();
// 삼항조건연산자 A ? B : C (A는 참이면 B 거짓이면 C를 실행)
////news.description.length > 0 조건을 사용하여 description이 비어있지 않은 경우에는 말줄임 표시, 비어있는 경우에는 내용없음 표시
//URL 관련문서 https://developer.mozilla.org/en-US/docs/Web/API/URL
//await  비동기 함수 내에서 사용되며, 해당 함수가 완료될 때까지 기다리도록 하는 역할을 한다.