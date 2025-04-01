import React, {useState, useEffect} from "react"
import {Link} from 'react-router-dom'

import characters from '../json/datas.json'



function CharactersMain(){
  characters.sort((a, b) => {
    if(a.rareness < b.rareness) return -1;
    if(a.rareness === b.rareness){
      if(a.shipclass < b.shipclass) return -1;
      if(a.shipclass === b.shipclass){
        if(a.cname < b.cname) return -1;
      }
    }return 1
  })

  function titler(){
    const htmlTitle = document.querySelector('title')
    htmlTitle.innerHTML = 'Azur Lane Wiki'
  }
  useEffect(titler)




  let [datas, redatas] = useState(characters)
  let [temp_datas, ] = useState(characters)
  let [modal1, modaless1] = useState(false)
  let [modal2, modaless2] = useState(false)

  window.onkeydown = function(event){
    switch(event.keyCode){
        case 27:
          modaless1(!modal1)
          break
        case 116:
          event.returnValue = false
          restore()
          break
        case 66:
          window.history.back()
          break
        case 72:
          window.location.href = '/'
          break
        default:
    }
}


  let rareness = ['DR', 'PR', 'UR', 'SSR', 'SR', 'R', 'N']
  let units = ['META', 'USS', 'HMS', 'KMS', 'IJN', 'FFNF', 'MNF', 'SN', 'RN', 'ROC', '기타']
  let ex_units = ['HDN', 'UWM', 'HOL', 'DOA', 'BILI', 'KA', 'IM', 'RA', 'SGM']
  let position = [
    ["구축함", "경순양함", "중순양함", "대형순양함", "운송함"],
    ["순양전함", "전함", "항공모함", "경항공모함", "모니터함"]
  ]


  function unit_sorter(){
    let copy = [...temp_datas]

    copy.sort((a, b) => {
      if(a.unit > b.unit) return -1;
      if(a.unit === b.unit){
        if(a.rareness < b.rareness) return -1;
      }return 1
    })
    redatas(copy)
  }
  function position_sorter(){
    let copy = [...datas]

    copy.sort((a, b) => {
      if(a.position > b.position) return -1;
      if(a.position === b.position){
        if(a.rareness < b.rareness) return -1;
      }return 1
    })
    redatas(copy)
  }
  function rare_sorter(){
    let copy = [...datas]

    copy.sort((a, b) => {
      if(a.rareness < b.rareness) return -1;
      return 1
    })
    redatas(copy)
  }


  function restore(){
    let checked = document.querySelectorAll("input:checked")
    checked.forEach((che) => che.checked = false)

    redatas([...temp_datas])
  }
  function unit_checker(){
    let re_data = [...temp_datas]
    let unit_checked = document.querySelectorAll("input[name='unit']:checked")
    let rare_checked = document.querySelectorAll("input[name='rare']:checked")
    let line_checked = document.querySelectorAll("input[name='line']:checked")
    let position_checked = document.querySelectorAll("input[name='position']:checked")

    let unit_list = []
    let rare_list = []
    let line_list = []
    let position_list = []
    unit_checked.forEach((el) => {unit_list.push(el.value)})
    rare_checked.forEach((el) => {rare_list.push(el.value)})
    line_checked.forEach((el) => {line_list.push(el.value)})
    position_checked.forEach((el) => {position_list.push(el.value)})
    

    let new_data = []

    let unit_data = []
    let rare_data = []
    let line_data = []
    let position_data = []
    if(unit_list.includes('기타')){
      re_data.forEach((data) => ex_units.includes(data.unit.split('/')[0]) ? unit_data.push(data) : null)
    }
    re_data.forEach((data) => unit_list.includes(data.unit.split('/')[0] === 'PRAN' ? data.unit.split('/')[0].replace('PRAN', 'ROC') : data.unit.split('/')[0]) ? unit_data.push(data) : null)
    re_data.forEach((data) => rare_list.includes(rareness[data.rareness]) ? rare_data.push(data) : null)
    re_data.forEach((data) => line_list.includes(data.line) ? line_data.push(data) : null)
    re_data.forEach((data) => position_list.includes(data.position) ? position_data.push(data) : null)


    if(rare_list.length !== 0){
      new_data = rare_data
      if(unit_list.length !== 0){
        new_data = new_data.filter((data) => unit_data.includes(data))
        if(position_list.length !== 0){
          new_data = new_data.filter((data) => position_data.includes(data))
        }
      }else if(position_list.length !== 0){
        new_data = new_data.filter((data) => position_data.includes(data))
        if(unit_list.length !== 0){
          new_data = new_data.filter((data) => unit_data.includes(data))
        }
      }
    }
    if(unit_list.length !== 0){
      new_data = unit_data
      if(rare_list.length !== 0){
        new_data = new_data.filter((data) => rare_data.includes(data))
        if(position_list.length !== 0){
          new_data = new_data.filter((data) => position_data.includes(data))
        }
      }else if(position_list.length !== 0){
        new_data = new_data.filter((data) => position_data.includes(data))
        if(unit_list.length !== 0){
          new_data = new_data.filter((data) => unit_data.includes(data))
        }
      }
    }
    if(position_list.length !== 0){
      new_data = position_data
      if(rare_list.length !== 0){
        new_data = new_data.filter((data) => rare_data.includes(data))
        if(unit_list.length !== 0){
          new_data = new_data.filter((data) => unit_data.includes(data))
        }
      }else if(unit_list.length !== 0){
        new_data = new_data.filter((data) => unit_data.includes(data))
        if(rare_list.length !== 0){
          new_data = new_data.filter((data) => rare_data.includes(data))
        }
      }
    }

    function empty_ships(){
      alert('no ships. restored.')
      restore()
    }

    new_data.sort((a, b) => a.rareness - b.rareness)
    new_data.length === 0 ? empty_ships() : redatas(new_data)
  }

  return (
    <div className="App">
      <div className='top-banner'>
        <div className='top-nav'>
          <div className='top-title'>Azur Lane - 벽람항로</div>
        </div>

        <div className='menubar'>
          <button className="sorterBtn" onClick={()=>modaless1(!modal1)}>필터</button>
            {modal1 ? <UnitIndexer datas={datas} units={units} unit_checker={unit_checker} rareness={rareness} position={position} restore={restore}/> : null}
          <button className="sorterBtn" onClick={()=>modaless2(!modal2)}>정렬</button>
            {modal2 ? <Sorters position_sorter={position_sorter} unit_sorter={unit_sorter} rare_sorter={rare_sorter}/> : null}
          <button className="sorterBtn" onClick={restore}>초기화</button>
        </div>
      </div>


      <div className='main-container'>
        {datas.map((data)=><Link to={'/characters/' + data.unit.split('/')[0] + '+' + data.cname}><Characters datas={datas} data={data} rare={rareness}></Characters></Link>)}
      </div>
    </div>
  );
}




function UnitIndexer(props){
  return(
    <div className='indexer'>
      <div className='indexer-culomn'>
        <div className='indexer-culomn-title'>진영</div>
        {props.units.map((unit)=><div><input type="checkbox" id={unit + '-id'} name='unit' value={unit} onClick={props.unit_checker}></input><label htmlFor={unit + '-id'}>{unit}</label></div>)}
      </div>
      <div className='indexer-culomn'>
        <div className='indexer-culomn-title'>레어</div>
        {props.rareness.map((rare)=><div><input type="checkbox" id={rare + '-id'} name='rare' value={rare} onClick={props.unit_checker}></input><label htmlFor={rare + '-id'}>{rare}</label></div>)}
      </div>
      <div className='indexer-culomn'>
        <div className='indexer-culomn-title'>함종(전열)</div>
        {props.position[0].map((position)=><div><input type="checkbox" id={position + '-id'} name='position' value={position} onClick={props.unit_checker}></input><label htmlFor={position + '-id'}>{position}</label></div>)}
      </div>
      <div className='indexer-culomn'>
        <div className='indexer-culomn-title'>함종(후열)</div>
        {props.position[1].map((position)=><div><input type="checkbox" id={position + '-id'} name='position' value={position} onClick={props.unit_checker}></input><label htmlFor={position + '-id'}>{position}</label></div>)}
      </div>
      <button className="clearBtn" onClick={() => props.restore()}>초기화</button>
    </div>
  )
}
function Sorters(props){
  return(
    <div className='indexer'>
      <button className="sorterBtn" onClick={props.position_sorter}>함종*</button>
      <button className="sorterBtn" onClick={props.unit_sorter}>진영*</button>
      <button className="sorterBtn" onClick={props.rare_sorter}>레어*</button>
    </div>
  )
}




function Characters(props){
  let unit = props.data.unit.split('/')
  unit = unit[0] === 'PRAN' ? 'ROC' : unit[0]
  let character_dir = "./characters/" + unit + '/' + props.data.cname + '/'
  let icon_dir = character_dir + props.data.cname + ' - icon.png'
  let rareness = props.rare[props.data.rareness]


  return(
    <div className='character-list'>
      <div>{props.data.cname}</div>
      <img className={"character-icon rareness rareness-" + rareness} src={icon_dir} alt={props.data.cname}></img>
    </div>
  )
}


export default CharactersMain
