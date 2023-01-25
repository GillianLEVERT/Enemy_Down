const PageDetail = (argument) => {
  const preparePage = () => {
    document.getElementById("text-hide").style.display = "none";
    document.getElementById("show-more").style.display = "none";

    const cleanedArgument = argument.trim().replace(/\s+/g, "-");



    const fetchGame = (url, argument) => {
      fetch(`${url}/${argument}?key=6890f09875e944998f7d81bdccecfaca`)
        .then((response) => response.json())
        .then((responseData) => {
          displayGame(responseData);
        });
    };

    const displayGame = (gameData) => {
      let icons = ["",`<i class="fab fa-windows icon-platform" id="1"></i>`,`<i class="fab fa-playstation icon-platform" id="2"></i>`,`<i class="fab fa-xbox icon-platform" id="3"></i>`,`<i class="fab fa-app-store-ios icon-platform" id="4"></i>`,`<i class="fab fa-apple icon-platform" id="5"></i>`,`<i class="fab fa-linux icon-platform" id="6"></i>`, `<i class="fab fa-nintendo-switch icon-platform" id="7"></i>`, `<i class="fab fa-android icon-platform" id="8"></i>`];

      const {
        background_image,
        website,
        name,
        rating,
        ratings_count,
        description,
        released,
        developers,
        platforms,
        publishers,
        genres,
        tags,
        stores,
        slug,
        id,
      } = gameData;
     
      const articleDOM = document.querySelector(".page-detail .article");
      articleDOM.querySelector("h1.title").innerHTML = name;
      articleDOM.querySelector("img").src = background_image;
      articleDOM.querySelector("p.release-date span").innerHTML = released;
      articleDOM.querySelector("p.description").innerHTML = description;
      articleDOM.querySelector(
        "p.rating"
      ).innerHTML = `${rating}/5 - ${ratings_count} votes`;
      articleDOM.querySelector(
        "p.platform"
      ).innerHTML = `<strong>Plateform</strong> </br> ${platforms
        .map((x) => x.platform.name)
        .join(", ")}`;
      articleDOM.querySelector("p.devs").innerHTML = `<strong>Studio</strong> </br> ${developers
        .map((x) => x.name)
        .join(", ")}`;
      articleDOM.querySelector("a#website").setAttribute("href", website);
      articleDOM.querySelector("p.tags").innerHTML = `<strong>Tags</strong> </br> ${tags
        .map((x) => x.slug)
        .join(", ")}`;
      articleDOM.querySelector("p.genre").innerHTML = `<strong>Genre</strong></br> ${genres
        .map((x) => x.name)
        .join(", ")}`;
      articleDOM.querySelector("p.editor").innerHTML = `<strong>Publishers</strong> ${publishers
        .map((x) => x.name)
        .join(", ")}`;
  

      articleDOM.querySelector("p.store").innerHTML = stores.map(store => `<a href="https://www.${store.store.domain}" target="_blank">${store.store.name} ${icons[store.store.id]? icons[store.store.id] : ""}</a><br>`).join("");


      fetch(
        `https://api.rawg.io/api/games/${id}/movies?key=6890f09875e944998f7d81bdccecfaca`
      )
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.count > 0) {
            document.getElementById("video").innerHTML = `
                      <h2 class="rating mt-3">TRAILER</h2>
                        <video controls style="width:100%">
                            <source src="${responseData.results[0].data.max}" type="video/mp4">
                        </video>`;
          }
        })
        .catch((error) => {
          console.error(error);
        });

      fetch(
        `https://api.rawg.io/api/games/${slug}/screenshots?key=6890f09875e944998f7d81bdccecfaca`
      )
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.count > 0) {
            document.getElementById("screenshot").innerHTML = `
                      <h2>SCREENSHOTS</h2>
                      <div id="gridscreen"></div>`;

            responseData.results.slice(0, 4).forEach((screen) => {
              document.getElementById("gridscreen").innerHTML += `
                          <img src="${screen.image}">`;
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });

     // SIMILAR GAME
    /* fetch(
        `https://api.rawg.io/api/games?key=APIAREMETTREAUCASOU&genres=${genres[0].id}&page_size=6&dates=2015-12-01,2022-12-31&ordering=-released`
      )
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.count > 0) {
            document.getElementById("similar").innerHTML = `
                      <h2 class="rating mt-5">SIMILAR GAMES</h2>
                      <div id="gridsimilar" class="row justify-content-around g-4"></div>`;

            responseData.results.forEach((article) => {
              document.getElementById("gridsimilar").innerHTML += `
                        <div class="col-lg-4 col-md-4 col-sm-6 my-3 alist" style="width:400px">
                        <article class="cardGame opacity">
                        <a href="#game/${article.id}">
                        <h5 class="card-title my-3" style="background-color:black, height">${
                          article.name
                        }</h5>
                          <div class="imgbox">            
                            <div class="info novideo">
                              <p>${dayjs(article.released).format(
                                "MMM DD, YYYY"
                              )}</p>
                              <p id="${article.id}"></p>
                            </div>
 
                            <div style="height:200px; background : url(${
                              article.background_image
                                ? `${article.background_image}`
                                : "https://wallpaperaccess.com/full/1588750.jpg"
                            }); background-size:cover; background-position:center; position:relative; z-index:-1"></div>
                          </div>
                          
                        </a>
                          
                        </article>
                      </div>
                        `;
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
        */
    };

    fetchGame("https://api.rawg.io/api/games", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
        <div class="header">
       
          <img src="" alt="game image">
          <div class="background"><a id="website" href="" target="_blank">Check Website ></a></div>
         
        <div class="trheader">
          <h1 class="title"></h1>
          <p class="rating"></p> 
        </div> 

          <p style="margin:0"></p>
          <p class="description"></p>

        <div class="rdpp"> 
          <p class="release-date"><strong>Release date</strong> </br> <span></span></p>
          <p class="devs"></p>
          <p class="platform"></p>
          <p class="editor"></p>
          </div>
          <div class="genretags"> 
          <p class="genre"></p>
          <p class="tags"></p>       
          </div>    
        
          <h2>BUY</h2>
          <div class="stores">
          <p class="store"><span></span></p>
          </div>
          <div id="video"></div>
          
          <div id="similar"></div>
          
        </div>
        <div class="gridscr">
          <div id="screenshot"></div>
        </div>
        </div>                                           
      </section>
    `;

    preparePage();
  };

  render();
};

export default PageDetail;
