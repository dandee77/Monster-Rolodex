import { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters : [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        this.setState(() => {
          return { monsters: users };
        });
      })
      .catch(error => console.error('Error fetching data:', error));  
  }

  render() {

    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(this.state.searchField.toLowerCase());
    });

    return (
      <div className="App">
        <input 
          className='search-box' 
          type='search' 
          placeholder='search monsters' 
          onChange={(event) => {
            const searchField = event.target.value.toLowerCase();
            this.setState({ searchField: searchField });
          }}
        />
        {
          filteredMonsters.map((monster) => {
            return (
              <div key={monster.id} className="monster-card">
                <h2>{monster.name}</h2>
              </div> 
            )
          })
        }
      </div>
    );
  }
}

export default App;
