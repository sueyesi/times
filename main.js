
const API_KEY = `6aba51ea81af491aa6793d096958527f`;
let news = [];
//뉴스를 가져오는 함수 설정
const getLatestNews = async() =>{ 
    //const url = new URL( `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`); 
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`); 
    const response = await fetch(url); // await  fetch함수가 완료될 때까지 기다려준다
    const data = await response.json();// json파일형식
    news = data.articles;
    console.log("rrr",news);    
};


getLatestNews();


//URL 관련문서 https://developer.mozilla.org/en-US/docs/Web/API/URL
//await  비동기 함수 내에서 사용되며, 해당 함수가 완료될 때까지 기다리도록 하는 역할을 한다.