import { Card, Row, Col, Typography, Tag, Image } from 'antd'
import { IPropsPokemon } from './interfaces.interface'
import { usePokemonFetch } from '../../hooks/usePokemonFetch'
import useLocalizationPokemonFetch from "../../hooks/useLocalizationPokemonFetch"
import { typeColor } from '../../utils/constants'
import { useEffect, useState } from 'react'
import Popup from '../popup/Popup'
import './index.css'
function PokemonCard(props: IPropsPokemon) {
    const { infoPokemon, loading } = usePokemonFetch(props.url)
    const { localization } = useLocalizationPokemonFetch(infoPokemon.localization)
    const [popUp, setPopUp] = useState(false)

    const handleShow = () => {
        setPopUp(!popUp)
    }

    useEffect(() => {
        const pokemonsDetails = props.pokemonDetails
        const exists = props.pokemonDetails.some((data) => data.url === props.url)
        if (infoPokemon.abilities.length > 0 && !exists) {
            infoPokemon.url = props.url
            pokemonsDetails.push(infoPokemon)
            props.handlePokemonDetails(pokemonsDetails)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infoPokemon])

    return (
        <div>
            <Card className='card-pokemon' hoverable onClick={handleShow} loading={loading} style={{ background: infoPokemon?.types.length > 1 ? `linear-gradient(to bottom, ${infoPokemon.types.map((type) => typeColor[type]).join(',')})` : typeColor[infoPokemon?.types[0] ?? 'normal'] }}>
                <Row className='row-card'>
                    <Col className='col-text'>
                        <Typography className='txt-name'>{props.name}</Typography>
                        <Typography>Height: {infoPokemon?.height}</Typography>
                        <Typography>Weight: {infoPokemon?.weight}</Typography>
                        <Typography className='txt-abilities'>Abilities: {infoPokemon?.abilities.join(', ')}</Typography>
                        {infoPokemon?.types.map((type) => <Tag key={type} color={typeColor[type] || 'default'}>{type}</Tag>)}
                    </Col>
                    <Col className='col-sprites'>
                        <Image
                            width={115}
                            height={100}
                            src={infoPokemon?.sprites}
                            preview={false}
                        />
                    </Col>
                </Row>
            </Card>
            {popUp && <Popup localization={localization} show={popUp} handleShow={handleShow} stats={infoPokemon.stats} image={infoPokemon.sprites}></Popup>}
        </div>
    )
}

export default PokemonCard