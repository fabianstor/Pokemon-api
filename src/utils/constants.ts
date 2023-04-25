import { IPokemon } from "../components/card/interfaces.interface";
import { IStatColor, ITypeColor } from "./interface.interface";

export const typeColor: ITypeColor = {
    'normal': '#a8a878',
    'fire': '#f08030',
    'water': '#6890f0',
    'grass': '#78c850',
    'electric': '#f8d030',
    'ice': '#98d8d8',
    'fighting': '#c03028',
    'poison': '#a040a0',
    'ground': '#e0c068',
    'flying': '#a890f0',
    'psychic': '#f85888',
    'bug': '#a8b820',
    'rock': '#b8a038',
    'ghost': '#705898',
    'dragon': '#7038f8',
    'dark': '#705848',
    'steel': '#b8b8d0',
    'fairy': '#ee99ac'
  }

  export const statColor: IStatColor = {
    hp: '#FF4136',
    attack: '#FF851B',
    defense: '#2ECC40',
    specialAttack: '#0074D9',
    specialDefense: '#FFDC00',
    speed: '#7FDBFF'
  }

export const initialState: IPokemon = {
    abilities: [],
    height: 0, 
    weight: 0, 
    sprites: '',
    types: [],
    stats: [],
    localization: ''
}