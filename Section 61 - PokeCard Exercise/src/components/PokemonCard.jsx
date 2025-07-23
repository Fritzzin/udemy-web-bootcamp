import "./PokemonCard.css"

function pickNewPokemon() {
    const randomNumber = Math.floor((Math.random() * 151) + 1);
    const imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomNumber}.png`
    console.log(randomNumber);


    return (
        <div className="PokemonCard">
            <h1>Pokemon Number: {randomNumber}</h1>
            <img src={imageSource} alt="Pokemon's image" />
        </div>
    )
}

export default pickNewPokemon