import { IStatPokemon } from "../card/interfaces.interface"

export interface IPropsPopup {
    show: boolean
    handleShow: (event: React.MouseEvent<HTMLButtonElement>) => void
    stats: IStatPokemon[]
    image: string
    localization: string[]
}