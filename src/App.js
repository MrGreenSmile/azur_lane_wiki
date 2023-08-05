/*  eslint-disable  */

//https://www.youtube.com/watch?v=xGkftwkoJK4


//https://namu.wiki/w/%EB%B2%BD%EB%9E%8C%ED%95%AD%EB%A1%9C/%ED%95%A8%EC%84%A0/%ED%95%A8%EC%A2%85%EB%B3%84%20%EB%B6%84%EB%A5%98
//https://azurlane.koumakan.jp/wiki/Yuudachi



//https://en.wikipedia.org/wiki/Gridley-class_destroyer
//https://en.wikipedia.org/wiki/Benson-class_destroyer
//https://en.wikipedia.org/wiki/List_of_Fletcher-class_destroyers
//https://en.wikipedia.org/wiki/Cannon-class_destroyer_escort



import './App.css';
import {Routes, Route} from 'react-router-dom'

import CharactersMain from './components/characterMain'
import CharacterInfo from './components/characterInfo'
import RealShip from './components/realshipInfo'
import EquipmentsMain from './components/equipmentList'



function App() {
  return(
    <div className="App">
    <Routes>
      <Route path="/" element={<CharactersMain/>}></Route>
      <Route path="/characters/:characterName" element={<CharacterInfo/>}></Route>
      <Route path="/realship/:realshipName" element={<RealShip></RealShip>}></Route>
      <Route path="/equipments/:equipmentCategory" element={<EquipmentsMain></EquipmentsMain>}></Route>
      <Route path="/equipments/:equipmentCategory/:equipmentName" element={<EquipmentsMain></EquipmentsMain>}></Route>
      <Route path="*" element={<NotFound/>}></Route>
    </Routes>
    </div>
  )
}


function NotFound(){
  var time = 5
  setTimeout(()=>{location.href='/'}, time * 1000)

  return(
    <div>
      <h1>404 Not Found</h1>
      <p>no articles or pages. you'll return in {time} seconds.</p>
    </div>
  )
}

export default App;
