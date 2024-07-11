
const API_KEY = `6aba51ea81af491aa6793d096958527f`;
let newsList = [];
//뉴스를 가져오는 함수 설정
const getLatestNews = async() =>{ 
    //const url = new URL( `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`); 
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`); 
    const response = await fetch(url); // await  fetch함수가 완료될 때까지 기다려준다
    const data = await response.json();// json파일형식
    newsList = data.articles;
    render();
    console.log("rrr",newsList);    
};

//버튼클릭시 해당 카테고리 뉴스 호출
document.querySelectorAll('.menus button').forEach(button => {
    button.addEventListener('click', function() {
        let category = this.textContent.toLowerCase(); 
       
        categoryNews(category);
    });
});

const render =()=>{
    const newsHTML = newsList.map(news=>`
        <div class="row news">
                <div class="col-lg-4">
                    <img class="newsImgSize" src=${news.urlToImage || '../images/noImage.png'}  onError="this.src='../images/noImage.png'" />
                </div>
                <div  class="col-lg-8">
                    <dl>
                        <dt>${news.title}</dt>                        
                        <dd>${news.description.length > 0 ? (news.description.length > 200 ? news.description.slice(0, 200) + '...' : news.description) : '내용없습니다'}</dd>
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


function categoryNews(category) {
    // 여기에 해당 카테고리에 대한 뉴스를 가져와서 표시하는 코드 작성
    // API를 사용하여 해당 카테고리에 대한 뉴스를 가져올 수 있습니다
}


getLatestNews();
// 삼항조건연산자 A ? B : C (A는 참이면 B 거짓이면 C를 실행)
////news.description.length > 0 조건을 사용하여 description이 비어있지 않은 경우에는 말줄임 표시, 비어있는 경우에는 내용없음 표시
//URL 관련문서 https://developer.mozilla.org/en-US/docs/Web/API/URL
//await  비동기 함수 내에서 사용되며, 해당 함수가 완료될 때까지 기다리도록 하는 역할을 한다.