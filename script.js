
document.body.innerHTML = `<div class="container">
<div class="row" id="header-row">
    <div class="col-md-12">
        <i class="gg-pokemon"></i>
    </div>
    <div class="col-md-8">
        <h1 class="title"></i>Pokémon Database</h1>

    </div>
          <div class="col-md-4">
            <div class="input-container">
             <label for="search">Search Pokemon</label>

              <input id="search" type="search" placeholder="Enter a name">

<button type="button" onclick="showResults(document.getElementById('search').value)" class="btn btn-outline-warning btn-lg">Search</button>
          </div>
<div id="result"></div>
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
        <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
             <div class="pokemon-img-container">
                   <img src="${image}" alt="pokemon-image" class="pokpic">
             </div>
                   <div class="about-pokemon-container">
                    <h1 class="pokemon-name">${titleCase(data.name)}</h1>
                    <br>
                    <p><span class="about-heading">Type:  </span><br>➢${typeArr}</p>
                      <hr>
                     <p><span class="about-heading">Ability:  </span><br>➢${abilities}</p>
                      <hr>
                     <p><span class="about-heading">Moves:  </span><br>➢${moveList}</p>
                      <hr>
                     <p><span class="about-heading">Height: </span><br>➢${height}cm</p>
                      <hr>
                    <p><span class="about-heading">Weight: </span><br>➢${weight}Kg</p>
                       <hr>
                    <p><span class="about-heading">Type: </span><br>➢${typeArr}</p>
                  </div>

        </div>
        `
    }


}

getData(61);

//To fetch a particular search result
async function showResults(searchres) {
    var lowerCaseName = searchres.toLowerCase();

    const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + lowerCaseName)
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
    typeArr = typeArr.join("\t\t\t➢")
    document.querySelector("#pokemon-content").innerHTML = ``;

    document.querySelector("#pokemon-content").innerHTML = `
        <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
             <div class="pokemon-img-container">
                   <img src="${image}" alt="pokemon-image" class="pokpic">
             </div>
                   <div class="about-pokemon-container">
                    <h1 class="pokemon-name">${titleCase(data.name)}</h1>
                    <br>
                    <p><span class="about-heading">Type:  </span><br>➢${typeArr}</p>
                      <hr>
                     <p><span class="about-heading">Ability:  </span><br>➢${abilities}</p>
                      <hr>
                     <p><span class="about-heading">Moves:  </span><br>➢${moveList}</p>
                      <hr>
                     <p><span class="about-heading">Height: </span><br>➢ ${height} cm</p>
                      <hr>
                    <p><span class="about-heading">Weight: </span><br>➢ ${weight} kg</p>
                       <hr>
                    <p><span class="about-heading">Type: </span><br>➢ ${typeArr}</p>
                  </div>

        </div>
        `

}