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
    rightWrong: "",
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
      rightWrong: "",
    });
    this.renderImage()
  }
  handleIncrement = () => {
    const newScore = this.state.count + 1;
    this.setState({
      count: newScore,
      rightWrong: ""
    });
    if (newScore >= this.state.highscore) {
      this.setState({ highscore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ rightWrong: "You win!" });
    }
    this.handleShuffle();
  };

  renderImage = () => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return this.state.teams.map(team => <img src = {team.image} id = {team.team} onClick = {this.handleClick} />)  
  }


  // handles the clicking of the logos
  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.setState({ clicked: this.state.clicked.concat(id) });
      this.handleIncrement();
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
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;

