import React, {useEffect} from "react"
import {useParams, Link} from 'react-router-dom'

import realships from '../json/realship.json'



function RealShip(){
    let {realshipName} = useParams()
    let now_ship = realships.filter((ship) => ship.ship_name === realshipName)[0]    

    function titler(){
        const htmlTitle = document.querySelector('title')
        htmlTitle.innerHTML = 'Azur Lane Real Ship : ' + realshipName
    }
    useEffect(titler)


    return(
        <div className="reaship-pages">
            <div className='top-nav-characterpage'>
                <Link to="/"><div className='top-title charactors-top-title'>Azur Lane - 벽람항로</div></Link>
            </div>
            <div className="information-container">
                <div><a href={now_ship.source} target="_blank" rel="noopener noreferrer">위키피디아</a>에서 발췌.</div>
                <h1>
                    {'"' + now_ship.ship_class.split('/')[0] + '급" ' + realshipName + '(' + now_ship.lauched + ')'}
                </h1>

                <img className="realship-mainImg" src={"/realship/" + realshipName + '.png'} alt={realshipName}></img>
                <div className="subContainer">
                    <h2>개요</h2>
                    {now_ship.summary.split('\n').map((summary) => <p>{summary}</p>)}
                </div>
                <div className="subContainer">
                    <h2>배경</h2>
                    {now_ship.background.split('\n').map((back) => <p>{back}</p>)}
                </div>
                <div className="subContainer">
                    <h2>설계</h2>
                    {now_ship.design.split('\n').map((designed) => <p>{designed}</p>)}
                </div>
            </div>
        </div>
    )
}


export default RealShip
