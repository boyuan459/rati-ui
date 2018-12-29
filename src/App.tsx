import * as React from 'react';
import './App.css';
import Affix from './components/affix';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{position: 'relative', left: 100}}>
          <div style={{position: 'relative', left: 200}}>
            <Affix />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
