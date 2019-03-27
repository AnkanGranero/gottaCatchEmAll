import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import axios from "axios";
import { Z_FILTERED } from 'zlib';
import { isAbsolute } from 'path';
const API_URL = "https://pokeapi.co/api/v2/pokemon/?limit=1000"
const API_URL2 = "https://pokeapi.co/api/v2/type/"



/* function gottaCatchEmAll() {
  return axios.get(API_URL)
    .then(({ data }) => data.results)
    .then(({ data }) => this.setState({ data }))
    .catch((err) => console.log(err));;
} */



/* const axios = require('axios'); */

function getPokemonImage(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}
/* function getPokemonInfo(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(data => App.this.myKindOfData(data.abilities)) }*/

/*  this.myKindOfData(data) */




class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pokemons: [],
            search: "",
            showModal: false,
            modalId: ""
        }

    }


    componentDidMount() {

        this.gottaCatchEmAll()
    }

    gottaCatchEmAll() {
        return fetch(API_URL)
            .then(response => response.json())
            .then(data => this.setState({ pokemons: data.results }))

    }
    gottaCatchTypes(field) {
        return fetch(`https://pokeapi.co/api/v2/type/${field}`)
            .then(response => response.json())
            .then(data => this.myKindOfData)

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
    myKindOfData(data) {
        let sum = [];
        let arrOfPokes = data.pokemon
        arrOfPokes.forEach(item => sum.push(item.pokemon))
        return sum
    }


    handleOpenModal(id) {

        this.setState({
            showModal: true,
            modalId: id
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
        }
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

        const modal = <div style={modalStyle}
            onClick={this.handleCloseModal.bind(this)}>
            <h1>{this.state.modalId}></h1>

            <img src={getPokemonImage(this.state.modalId)} style={imageStyle}></img>

        </div>


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
                {this.state.showModal && (modal)}
                <div style={styles}>
                    {pokemons}
                </div>
            </div>
        );
    }
}

export default App;

/*{showModal && (<div styles={modalStyles}>
<p>showing modal</p>
<button onClick= this.handleclose modal
</div>)}
*/

// height : 100vh (view hight)
/* position: absolute:
left 0
top 0

backgroundColor: rbg(0,0,0,1) (sista värdet är ett alfavärde som är transparans från 0 till 1) */
/*
inital state : loading...
const {data } = this.stae  */