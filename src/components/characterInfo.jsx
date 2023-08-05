import React, {useEffect} from "react"
import {useParams, Link} from 'react-router-dom'

import characters from '../json/datas.json'
import illust from '../json/illust.json'

import pixiv_icon from '../json/pixiv.png'
import twitter_icon from '../json/twitter.png'
import weibo_icon from '../json/weibo.png'
import bcy_icon from '../json/bcy.png'
import fb_icon from '../json/facebook.png'
import as_icon from '../json/artstation.png'
import bili_icon from '../json/bilibili.png'



function CharacterInfo(){
    window.onkeydown = function(event){
        switch(event.keyCode){
            case 116:
                event.returnValue = true
                break
            case 66:
                window.history.back()
                break
            default:
        }
    }


    let parameters = useParams().characterName
    let character_unit = parameters.split('+')[0]
    let character_name = parameters.split('+')[1]
    let datas = characters

    function titler(){
        const htmlTitle = document.querySelector('title')
        htmlTitle.innerHTML = 'Azur Lane Character : ' + character_name
    }
    useEffect(titler)



    function special_letter(txt){
        txt = txt.replace('(?)', '')
        txt = txt.replace('?', '')
        txt = txt.replace('%', '')
        txt = txt.replace(':', '')

        return txt
    }

    let data = datas.filter((data) => (data.cname === character_name) && (data.unit.split('/')[0]) === character_unit)[0]


    let unit = data.unit.split('/')
    let classShipName = data.shipclass.split('/')[0]
    let shipclass = data.shipclass !== "" ? ' "' + data.shipclass.split('/')[0] + '급" ' + data.shipclass.split('/')[1] + '번' : "-"

    let rare = ['DR', 'PR', 'UR', 'SSR', 'SR', 'R', 'N']
    let rareclass = rare[data.rareness]

    let unit_ = unit[0] === 'PRAN' ? 'ROC' : unit[0]
    let character_dir = '/characters/' + unit_ + '/' + data.cname + '/'


    return(
        <div className="character-pages">
            <div className='top-nav-characterpage'>
                <Link to="/"><div className='top-title charactors-top-title'>Azur Lane - 벽람항로</div></Link>
            </div>

            <div className="information-container">
                <div className="subContainer">
                    <h1>
                        <span className={'rare-class rare-class-' + rareclass}>{rareclass}</span>
                        {unit[0] + ' ' + character_name + ' (' + unit[0] + ' ' + data.originalName + ')'}
                    </h1>
                    <MainImage data={data} unit={unit[0]} character_dir={character_dir}></MainImage>
                    <Basic data={data} shipclass={shipclass}></Basic>
                </div>
                <div className="subContainer">
                    <h2>개요</h2>
                    <Description data={data}></Description>
                </div>
                <div className="subContainer">
                    <h2>자매 {'"' + data.shipclass.split('/')[0] + '급"'}</h2>
                    <Sisters datas={datas} data={data} unit_={unit_} classShipName={classShipName}></Sisters>
                </div>
                <div className="subContainer">
                    <h2>스킬</h2>
                    <Skills datas={datas} data={data} character_dir={character_dir} special_letter={special_letter}></Skills>
                </div>
                <div className="subContainer">
                    <h2>스킨</h2>
                    <Skins datas={datas} data={data} character_dir={character_dir} special_letter={special_letter}></Skins>
                </div>
            </div>
        </div>
    )
}



function MainImage(props){
    const {characterName} = useParams()
    let data = props.data

    if(characterName === '부린'){
        let image_main_dir = '/characters/' + characterName + '/'

        return(
            <div className="character-mainImgs">
                {data.burin.map((burin) =>
                <div>
                    <img className="character-mainImg" src={'/characters/부린/' + burin + '.png'} alt={burin}></img>
                    <img className="character-mainImgSD" src={'/characters/부린/' + burin + 'SD.png'} alt={burin + ' SD'}></img>
                    <div>{burin}</div>
                </div>
                )}
            </div>
        )
    }else{
        let image_main_dir = props.character_dir + data.cname

        return(
            <div className="character-mainImgs">
                <div>
                    <img className="character-mainImg" src={image_main_dir + '.png'} alt={data.cname}></img>
                    <img className="character-mainImgSD" src={image_main_dir + 'SD.png'} alt={data.cname + ' SD'}></img>
                    <div>기본</div>
                </div>
                {data.retrofit ? 
                    <div>
                        <img className="character-mainImg" src={image_main_dir + ' - 개장.png'} alt={data.cname + ' 개장'}></img>
                        <img className="character-mainImgSD" src={image_main_dir + ' - 개장SD.png'} alt={data.cname + ' 개장SD'}></img>
                        <div>개장</div>
                    </div> : null}
            </div>
        )
    }
}
function Basic(props){
    let data = props.data
    let unit = data.unit.split('/')[0] === "" ? "-" : data.unit
    let positions = data.position

    let illustrator = illust.filter((il) => data.illustrator === il.artist)[0]
    let pixiv_dir = illustrator.pixiv ? 'https://www.pixiv.net/users/' + illustrator.pixiv : null
    let twitter_dir = illustrator.twitter ? 'https://twitter.com/' + illustrator.twitter : null
    let weibo_dir = illustrator.weibo ? 'https://weibo.com/' + illustrator.weibo : null
    let bcy_dir = illustrator.bcy ? 'https://bcy.net/' + illustrator.bcy : null
    let fb_dir = illustrator.facebook ? 'https://www.facebook.com/' + illustrator.facebook : null
    let as_dir = illustrator.artstation ? 'https://www.artstation.com/' + illustrator.artstation : null
    let bili_dir = illustrator.bilibili ? 'https://space.bilibili.com/' + illustrator.bilibili + '/dynamic': null


    return(
        <div className="characters-basic">
        <div className="characters-basic-column">
            <div className="characters-basic-title">이름</div>
            <div className="characters-basic-detail">
                {data.cname + ' (' + data.originalName + ')'}{/*<Link to={'/realship/' + data.cname}>{data.cname}</Link>*/}
            </div>
            <div className="characters-basic-title">진영</div>
            <div className="characters-basic-detail">{unit}</div>
            <div className="characters-basic-title">위치</div>
            <div className="characters-basic-detail">{positions.includes('/') ? data.line + '/' + positions[0] + '→' + positions[1] : data.line + '/' + positions}</div>
            <div className="characters-basic-title">함급</div>
            <div className="characters-basic-detail">{props.shipclass}</div>

            <div className="characters-basic-title">작가</div>
            <div className="characters-basic-detail">{illustrator.artist}
                {illustrator.pixiv ? <Link to={pixiv_dir} target="_blank"><img src={pixiv_icon} alt="pixiv_link"></img></Link> : null}
                {illustrator.twitter ? <Link to={twitter_dir} target="_blank"><img src={twitter_icon} alt="twitter_link"></img></Link> : null}
                {illustrator.weibo ? <Link to={weibo_dir} target="_blank"><img src={weibo_icon} alt="weibo_link"></img></Link> : null}
                {illustrator.bcy ? <Link to={bcy_dir} target="_blank"><img src={bcy_icon} alt="bcy_link"></img></Link> : null}
                {illustrator.facebook ? <Link to={fb_dir} target="_blank"><img src={fb_icon} alt="facebook_link"></img></Link> : null}
                {illustrator.artstation ? <Link to={as_dir} target="_blank"><img src={as_icon} alt="artstation_link"></img></Link> : null}
                {illustrator.bilibili ? <Link to={bili_dir} target="_blank"><img src={bili_icon} alt="bilibili_link"></img></Link> : null}
            </div>
            <div className="characters-basic-title">성우</div>
            <div className="characters-basic-detail">{data.actor}</div>
        </div>
        <div className="characters-basic-column">
            <div className="characters-basic-title">장비</div>
            <div className="characters-basic-detail">{data.armour}</div>
            <div className="characters-basic-equip">
                {data.equipment.map((equip) => 
                    <div className="characters-basic-detail">
                        {equip.includes('/') ?
                            equip.split('/').map(
                                (eq) => eq.includes('-') ?
                                    <span><Link to={'/equipments/' + eq.split('-')[0]}>{eq.split('-')[0]}</Link>→<Link to={'/equipments/' + eq.split('-')[1]}>{eq.split('-')[1]}</Link></span>
                                    : <span><Link to={'/equipments/' + eq}>{eq}</Link>/</span>
                            ) :
                            <Link to={'/equipments/' + equip}>{equip}</Link>
                        }
                    </div>)
                }
            </div>
        </div>
        </div>
    )
}
function Description(props){
    let data = props.data
    let description = data.description.split('\n')

    return(
        <div className="character-description">
            {description.map((describe) => <p>{describe}</p>)}
        </div>
    )
}
function Sisters(props){
    let datas = props.datas
    let no_empty = datas.filter((data) => data.shipclass !== "")
    let sisters = no_empty.filter((data) => data.shipclass.split('/')[0] === props.data.shipclass.split('/')[0])
    sisters.sort((a, b) => a.shipclass.split('/')[1] !== b.shipclass.split('/')[1] ? a.shipclass.split('/')[1] - b.shipclass.split('/')[1] : a.cname - b.cname)


    return(
        <div className="character-sisters">
            {sisters.length !== 0 ? sisters.map((sister) => sister.shipclass.split('/')[1] === '1' ?
            <Link to={"/characters/" + sister.unit.split('/')[0] + '+' + sister.cname} className="character-sisters-cell fst-sister">
                <div>
                    <img src={'/characters/' + (sister.unit.split('/')[0] === 'PRAN' ? 'ROC' : sister.unit.split('/')[0]) + '/' + sister.cname + '/' + sister.cname + ' - icon.png'} alt={sister.cname}></img>
                    <div>{sister.cname}</div>
                </div>
            </Link> : 
            <Link to={"/characters/" + sister.unit.split('/')[0] + '+' + sister.cname} className="character-sisters-cell">
                <div>
                    <img src={'/characters/' + (sister.unit.split('/')[0] === 'PRAN' ? 'ROC' : sister.unit.split('/')[0]) + '/' + sister.cname + '/' + sister.cname + ' - icon.png'} alt={sister.cname}></img>
                    <div>{sister.cname}</div>
                </div>
            </Link>
            ): <p>자매 없음</p>}
        </div>
    )
}
function Skills(props){
    let data = props.data
    let skills = data.skills
    let skill_dir = props.character_dir + 'skills/'


    return(
        <div>
            {skills.map((skill) => 
            <div className="characters-skills">
                <img src={skill_dir + props.special_letter(skill.skillname) + '.png'} alt={skill.skillname}></img>
                <div>{skill.skillname}</div>
                <div>{skill.skilldetail.split('\n').map((detail) => <p>{detail}</p>)}</div>
            </div>
            )}
        </div>
    )
}
function Skins(props){
    let data = props.data


    return(
        <div className="characters-skins">
            {data.skins.length !== 0 ? data.skins.map((skin) => 
            <div>
                <div className="character-skins-name">{skin}</div>
                <img className="character-skin" src={props.character_dir + data.cname + ' - ' + props.special_letter(skin) + '.png'} alt={skin}></img>
                <img className="character-skin-sd" src={props.character_dir + data.cname + ' - ' + props.special_letter(skin) + 'SD.png'} alt={skin + 'SD'}></img>
            </div>
            ) : <p>스킨 없음</p>}
        </div>
    )
}


export default CharacterInfo
