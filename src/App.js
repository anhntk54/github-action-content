import logo from './logo.svg';
import './App.css';
import a from './data/netWorkInfo.json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {Object.entries(a).map(([key, value]) => {
            return (
                <div>
                <p>{key}</p>
                <p>{value.usd}</p>
                <p>{value.total_size_network}</p>
                </div>
            )
        })}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
