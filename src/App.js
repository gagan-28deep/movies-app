import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import MovieList from './components/MovieList'

import {BrowserRouter  ,  Route , Routes} from 'react-router-dom'
import Favourites from './components/Favourites';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path='/' element = {<><Banner/><MovieList /></>}></Route>
        <Route path='/favourites' element = {<Favourites/>}></Route>
        

      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
