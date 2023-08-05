import React from "react"
import {useParams, Link} from 'react-router-dom'



function EquipmentsMain(){
    const {equipmentCategory, equipmentName} = useParams()

    let main_guns = ['구축함포', '경순양함포', '중순양함포', '대형순양함포', '전함포']
    let ex_guns = ['대공포', '어뢰', '잠수함용 어뢰']
    let planes = ['전투기', '뇌격기', '폭격기', '수상기']
    let ex_equipment = ['설비', '대잠장비', '적재']

    return(
        <div>
            <div>{equipmentCategory}</div>
            <div>{equipmentName}</div>
            <Equipments></Equipments>

            <div>
            {main_guns.map((equip) => <Link to={'/equipments/' + equip}><div>{equip}</div></Link>)}
            </div>
            <div>
            {ex_guns.map((equip) => <Link to={'/equipments/' + equip}><div>{equip}</div></Link>)}
            </div>
            <div>
            {planes.map((equip) => <Link to={'/equipments/' + equip}><div>{equip}</div></Link>)}
            </div>
            <div>
            {ex_equipment.map((equip) => <Link to={'/equipments/' + equip}><div>{equip}</div></Link>)}
            </div>

            <Link to='/'>main</Link>
        </div>
    )
}

function Equipments(){
    return(
      <div>
        Epuipments
      </div>
    )
  }

export default EquipmentsMain
