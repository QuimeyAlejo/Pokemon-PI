import './App.css';
import {BrowserRouter, Route} from "react-router-dom"
 import Home from './components/Home.jsx';
 import LandingPage from './components/LandingPage';
// import Form from './components/PokemonCreate'
import CreatePokemon from './components/PokemonCreate'
import Detail from './components/Detail';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path='/pokemons' component={CreatePokemon}/>
      <Route path='/home' component={Home}/>
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/pokemons/:id' render={({ match }) => <Detail id={match.params.id} />} />
    </div>
    </BrowserRouter>
  );
}

export default App;
