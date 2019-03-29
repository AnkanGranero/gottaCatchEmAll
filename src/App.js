import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { Z_FILTERED } from 'zlib';
import { isAbsolute } from 'path';
const API_URL = "https://pokeapi.co/api/v2/"






function getPokemonImage(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}






class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: true
    }
  }
  openModal() {
    this.setState({
      showModal: true
    })

  }

  closeModal() {
    this.setState(
      {
        showModal: false
      }
    )
  }


  render() {

    const modalStyle = {
      height: "100vh",
      width: "100vh",
      position: "absolute",
      float: "center",
      backgroundColor: "rgb(3, 4, 2, 0.3)",

    }
    const imageStyle = {
      alignContent: "center"
    }

    const showPokemon = this.props.showPokemon

    const id = this.props.pokemonId
    const pokeInfo = <div style={modalStyle}
      onClick={this.closeModal.bind(this)}>
      <h1>{}></h1>
      <img src={getPokemonImage(this.props.pokemonId)} style={imageStyle}></img>
      <h2>Abilities</h2>
      <ul>{showPokemon}</ul>
    </div>

    return this.state.showModal && <div>{pokeInfo}</div>
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pokemons: [],
      search: "",
      showModal: false,
      modalId: "",
      showPokemon: [],
    }

  }


  componentDidMount() {

    this.gottaCatchEmAll()
  }

  gottaCatchEmAll() {
    return fetch(API_URL + "pokemon/?limit=70")
      .then(response => response.json())
      .then(data => this.setState({ pokemons: data.results }))

  }
  gottaCatchTypes(field) {
    return fetch(`${API_URL}type/${field}`)
      .then(response => response.json())
      .then(data => this.myKindOfData)
  }
  myKindOfData(data) {
    let sum = [];
    let arrOfPokes = data.pokemon
    arrOfPokes.forEach(item => sum.push(item.pokemon))
    return sum
  }

  handleFilterButtons(field, event) {

    if (!field) {
      this.gottaCatchEmAll()
      return
    }

    fetch(`https://pokeapi.co/api/v2/type/${field}`)
      .then(response => response.json())
      .then(data => this.myKindOfData(data))
      .then(data => this.setState({
        pokemons: data
      }))

  }



  handleOpenModal(id) {

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data => data.abilities)
      .then(data => this.setState({ showPokemon: data }))

    this.setState({
      showModal: true,
      modalId: id,

    })


  }
  handleCloseModal() {
    this.setState({
      showModal: false
    })
  }

  handleSearch() {
    this.setState({ search: this.refs.searchInput.value })
  }

  getIdFromUrl(url) {
    return url.split('/')[6]
  }


  render() {
    console.log(this.state.showModal);


    const styles = {
      display: "flex",
      flexWrap: "wrap",
      alignContent: "flex-start"

    };

    const pokeStyle = {
      margin: "10px",
      borderStyle: "dotted",
      textAlign: "center"
    };


    const pokemons = this.state.pokemons.slice()
      .filter(pokemon => !this.state.filter ?
        true : pokemon.type == this.state.filter)
      .filter(pokemon => !this.state.search ?
        true : pokemon.name == this.state.search)
      .map((item) => <div style={pokeStyle}>
        <div onClick={this.handleOpenModal.bind(this, this.getIdFromUrl(item.url))}>
          <p>{item.name}</p>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.getIdFromUrl(item.url)}.png`}></img>

        </div>
      </div>)

    const showPokemon = this.state.showPokemon
      .slice()
      .map(item => !item.ability.name ? true :
        <li>{item.ability.name}
        </li>)




    return (
      <div class="wrapper">
        <div class="filter">
          <button onClick={this.handleFilterButtons.bind(this, "10")}>Fire</button>
          <button onClick={this.handleFilterButtons.bind(this, "12")}>Grass</button>
          <button onClick={this.handleFilterButtons.bind(this, "7")}>Bug</button>
          <button onClick={this.handleFilterButtons.bind(this, "3")}>Flying</button>
          <button onClick={this.handleFilterButtons.bind(this, "1")}>Normal</button>
          <button onClick={this.handleFilterButtons.bind(this, "")}>All</button>
        </div>
        <div class="search">
          <input type="text" ref="searchInput"></input>
          <button onClick={this.handleSearch.bind(this)}>Search
          </button></div>
        {this.state.showModal && (<Modal
          onClose={this.handleCloseModal}
          pokemonId={this.state.modalId}
          showPokemon={showPokemon}>
        </Modal>)
        }
        <div style={styles}>
          {pokemons}
        </div>
      </div >
    );
  }
}


export default App;



// height : 100vh (view hight)
/* position: absolute:
left 0
top 0

backgroundColor: rbg(0,0,0,1) (sista värdet är ett alfavärde som är transparans från 0 till 1) */
/*
inital state : loading...
const {data } = this.stae  */