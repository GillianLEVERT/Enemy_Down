//on utilise des cards avec noms + plateforme
// au hover sur la card on peut voir la date de sortie, editeur, genre, et sa note qui "écrase l'image"
/*
Il existe plusieurs manières afin de retourner sur cette page :

Au clic sur le nom d'un studio de développement ou un développeur ou un éditeur, on affiche les jeux qu'il a faits
Au clic sur le nom d'une plateforme, on affiche les jeux disponibles sur la plateforme les plus récemment sortis
*/
import dayjs from "dayjs";



const PageList = (argument = "") => {
  const preparePage = () => {
    document.getElementById("text-hide").style.display = "block";
    document.getElementById("show-more").style.display = "block";


    
    const cleanedArgument = argument.trim().replace(/\s+/g, "-");


    const displayResults = (articles) => {
      let icons = [
        "",
        `<i class="fab fa-windows icon-platform" id="1"></i>`,
        `<i class="fab fa-playstation icon-platform" id="2"></i>`,
        `<i class="fab fa-xbox icon-platform" id="3"></i>`,
        `<i class="fab fa-app-store-ios icon-platform" id="4"></i>`,
        `<i class="fab fa-apple icon-platform" id="5"></i>`,
        `<i class="fab fa-linux icon-platform" id="6"></i>`,
        `<i class="fab fa-nintendo-switch icon-platform" id="7"></i>`,
        `<i class="fab fa-android icon-platform" id="8"></i>`,
      ];
      

      const resultsContent = articles.map(
        (article) =>
        
         `<div class="cardGame">
              <div class="cardheader"> 
               <img src='${article.background_image}'>

                <div class="imgbox">
                  <p>Release date : ${dayjs(article.released).format('MMM DD, YYYY')}</p>
                  <p>Notes :${article.rating}/5 with ${article.ratings_count} votes</p>
                  <p>Genre : ${article.genres.map(genre => `${genre.name}, `)}</p>
                </div>
              </div>
                  <div class="link"><a href="#pagedetail/${article.id}">${article.name}</a></div>         
                  <p> ${article.parent_platforms ? article.parent_platforms.map((platform) => icons[platform.platform.id]).join(" "): "  "} </p>
          </div>
         
          `
          
        
      );
      const resultsContainer = document.querySelector(".page-list .articles");
      resultsContainer.innerHTML = resultsContent.join("\n");
      
    };

    const fetchList = (url, argument) => {
      const finalURL = argument ? `${url}&search=${argument}` : url;
      fetch(finalURL)
        .then((response) => response.json())
        .then((responseData) => {
          displayResults(responseData.results);
        });
    };

    fetchList(
      `https://api.rawg.io/api/games?key=6890f09875e944998f7d81bdccecfaca&page_size=9`,
      cleanedArgument
    );
  };


  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">Loading...</div>
      </section>
    `;

    
    preparePage();
  };

  render();
};

export default PageList;
