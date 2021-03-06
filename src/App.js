import React, {Component} from 'react';
import './App.css';
import teams from './teams.json'
import Logos from './components/Logos';
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";

function shuffleLogos(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  state = {
    teams,
    clicked: [],
    count: 0,
    highscore: 0,
  };

  handleShuffle = () => {
    let logosShuffle = shuffleLogos(teams);
    this.setState({ teams: logosShuffle });
  };

  handleReset = () => {
    this.setState({
      teams,
      clicked: [],
      count: 0,
      highscore: this.state.highscore,
    });
    this.handleShuffle()
  }
  handleIncrement = () => {
    const newScore = this.state.count + 1;
    this.setState({
      count: newScore,
    });
    if (newScore >= this.state.highscore) {
      this.setState({ highscore: newScore });
    }
    else if (newScore === 12) {
      this.handleReset();
    }
    this.handleShuffle();
  };


  // handles the clicking of the logos
  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };


  render() {
    return (
      <Wrapper>
        <Header score={this.state.count} highscore={this.state.highscore}>Clicky Game</Header>
        {this.state.teams.map(team => (
          <Logos
            clickCount={this.handleClick}
            key={team.id}
            team={team.team}
            image={team.image}
            id = {team.id}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;

