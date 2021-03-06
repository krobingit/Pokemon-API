
document.body.innerHTML = `<div class="container">
<div class="row" id="header-row">
    <div class="col-md-12">
        <i class="gg-pokemon"></i>
    </div>
    <div class="col-md-9" id="header-img-title">
        <img alt="pikachu"src="https://c.tenor.com/5MEXa0INxSUAAAAi/pikachu-pokemon.gif" class="header-img">
        <a onClick="window.location.reload()"><h1 class="title">Pokémon Database</h1></a>

    </div>
          <div class="col-md-3">
            <div class="input-container">
             <label for="search">Search Pokemon</label>

              <input id="search" type="search" placeholder="Enter a name">

            <button id="srchbtn" type="button"
 onclick="showResults(document.getElementById('search').value)" class="btn btn-outline-warning btn-lg">Search
</button>
          </div>
<div id="getDataAgain">
        </div>

    </div>
</div>
</div>

<div class="container">
   <div class="row" id="pokemon-content">

    </div>
</div>`



//to Get all the data with the help of FETCH and perform DOM operation
async function getData(value) {
    var noOfPokemon = value;
    for (var id = 1; id < noOfPokemon; id++) {

        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id)
        const data = await response.json();


        // getting json data from API through fetch promise method
        const abilities = data.abilities.map((list) => list.ability.name).join("\t\t\t➢")
        const titleCase = (string) =>
            string.toLowerCase().split(" ").map((str) => str.charAt(0).toUpperCase() + str.slice(1))


        const moves = data.moves.map((moveData) => moveData.move.name)
        var moveList = moves.join("\t\t\t➢");
        var image = data.sprites.other.dream_world.front_default;
        var height = data.height * 10;
        var weight = data.weight / 10;
        var typeArr = data.types.map((data) => data.type.name);
        typeArr = typeArr.join("\t\t\t➢")
        //Getting all the relevant data necessary from the API and further displaying it on screen

        document.querySelector("#pokemon-content").innerHTML += `
        <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12" id="pokemon-container">
             <div class="pokemon-img-container">
                   <img src="${image}" alt="pokemon-image" class="pokpic">
             </div>
                   <div class="about-pokemon-container">
                    <h1 class="pokemon-name">${titleCase(data.name)}</h1>
                    <br>
                    <p><span class="about-heading">Types:  </span><br>➢${typeArr}</p>
                      <hr>
                     <p><span class="about-heading">Ability:  </span><br>➢${abilities}</p>
                      <hr>
                    <div id="viewMore">
                      <button type="button" id="togglebtn" onclick="toggleMore(${id})"
                   class="btn btn-outline-warning btn-lg togglebtn${id}">View More 🡫</button>

                    </div>
                    </div>
                    <div class="toggleDetails${id}" style="display:none">
                     <p><span class="about-heading">Height: </span><br>➢${height}cm</p>
                      <hr>
                    <p><span class="about-heading">Weight: </span><br>➢${weight}Kg</p>
                      <hr>
                     <p><span class="about-heading">Moves:  </span><br>➢${moveList}</p>
                      <hr>

                     </div>


        </div>

        `


    }


}

getData(100);

const nores = document.createElement("h1");   //creating element to display no-result message
nores.className="noresmsg"


//To fetch a particular search result
async function showResults(searchres) {
    const pokemonNames = [];
    for (var id = 1; id < 100; id++) {

        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id)
        const data = await response.json();
        pokemonNames.push(data.name)
    }
    var lowerCaseSearchRes = searchres.trim().toLowerCase();  //lowercasing the input data for fetching purpose


    if (searchres === "")
    {
                nores.innerText="No results found."
                document.getElementById('getDataAgain').append(nores)
    }

if (pokemonNames.every((name) => (name.includes(lowerCaseSearchRes) == false)))
{
    nores.innerText="No results found."
    document.getElementById('getDataAgain').append(nores);
}

    else {

        document.querySelector("#pokemon-content").innerHTML = ``;
        for (var i = 0; i < pokemonNames.length; i++) {
            if (pokemonNames[i].includes(lowerCaseSearchRes)) {  /*checking the names against the input given
                                                               if its true,it will get the relevant data*/

                var pokemonName = pokemonNames[i];
                const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName)
                const data = await res.json();

                const abilities = data.abilities.map((list) => list.ability.name).join("\t\t\t➢")
                const titleCase = (string) =>
                    string.toLowerCase().split(" ").map((str) => str.charAt(0).toUpperCase() + str.slice(1))
                const moves = data.moves.map((moveData) => moveData.move.name)
                var moveList = moves.join("\t\t\t➢");
                var image = data.sprites.other.dream_world.front_default;
                var height = data.height * 10;
                var weight = data.weight / 10;
                var typeArr = data.types.map((data) => data.type.name);
                typeArr = typeArr.join("\t\t\t➢");



                document.querySelector("#pokemon-content").innerHTML += `
        <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12" id="pokemon-container">
             <div class="pokemon-img-container">
                   <img src="${image}" alt="pokemon-image" class="pokpic">
             </div>
                   <div class="about-pokemon-container">
                    <h1 class="pokemon-name">${titleCase(data.name)}</h1>
                    <br>
                    <p><span class="about-heading">Types:  </span><br>➢${typeArr}</p>
                      <hr>
                     <p><span class="about-heading">Ability:  </span><br>➢${abilities}</p>
                      <hr>
                    <div id="viewMore">
                      <button type="button" id="togglebtn" onclick="toggleMore(${data.id})"
                   class="btn btn-outline-warning btn-lg togglebtn${data.id}">View More</button>
                    </div>
                    </div>
                    <div class="toggleDetails${data.id}" style="display:none">
                    <p><span class="about-heading">Height: </span><br>➢${height}cm</p>
                      <hr>
                    <p><span class="about-heading">Weight: </span><br>➢${weight}Kg</p>
                      <hr>
                     <p><span class="about-heading">Moves:  </span><br>➢${moveList}</p>
                      <hr>

                     </div>


        </div>

        `

            }


    }
    if (nores.innerText = "No results found.")
        nores.innerText = "";

    }



}

function toggleMore(id)
{
      var details=document.querySelector(`.toggleDetails${id}`)
       details.classList.add("toggle")
    var btn = document.querySelector(`.togglebtn${id}`);
    if (details.style.display == "none")
    {
        details.style.display = "block";
        btn.innerText="View Less 🡡"

    }
    else
    {
        details.style.display = "none";
        btn.innerText = "View More 🡫";
    }

}
