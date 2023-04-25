import { IPokemon } from "../card/interfaces.interface"

export interface IPropDrawer {
    show: boolean
    showDrawer: () => void
    pokemonsDetails: IPokemon[]
}