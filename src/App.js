import React, {useState} from 'react';
import './recipe.css';
import Axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import Recipe from './components/Recipe';
import Alert from './components/Alert';


function App() {

  const[search, setSearch] = useState('');
  const[recipes, setRecipes] = useState([]);
  const[alert, setAlert] = useState('');

  // const url =`https://api.edamam.com/search?q=${search}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`;
  const url =`https://api.edamam.com/api/recipes/v2?q=${search}&app_key=${process.env.REACT_APP_APP_KEY}&type=public&app_id=${process.env.REACT_APP_APP_ID}`;

  // async function getData() {
  //   let result = await Axios.get(url);
  //   setRecipes(result.data.hits)
  //   console.log(result.data);
  // }
  const getData = async() => {
      if(search !== '') {
        const result = await Axios.get(url)
        .catch(function (error) {
        if(!result.data.more) {
          return setAlert('No results found 😔');
        }})
        setRecipes(result.data.hits)
        console.log(result);
        setAlert('');
        setSearch('');
      } else {
        setAlert('Please fill out the form 😉')
      }
  }

  // const onChange = (e) => {
  //   setSearch(e.target.value)
  // }

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };


  return (
    <div className="finder">
      <h1>Recipe Finder</h1>
      <form className = 'search-form' onSubmit={onSubmit}>
        <input 
        className='search' 
        type='text' 
        placeholder ='Search Recipes' 
        autoComplete='off' 
        // onChange={onChange} 
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        />
        <input 
        className='submit-button' 
        type='submit' 
        value='search'
        />
      </form>

      {alert !== '' && <Alert alert = {alert}/>}

      <div className='recipes'>
        {/* {recipes !== [] &&  */}
          {recipes.map(recipe => {
            return <Recipe key={uuidv4()} recipe={recipe}/>
            })}
        {/* {recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe}/>)} */}
      </div>
    </div>
  );
}

export default App;
