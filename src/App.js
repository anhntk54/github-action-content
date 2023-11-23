import './App.css';
const pkgJson = require('../package.json');
function App() {
  return (
    <div className="App">
      <header className="App-header">
        Build Number: {pkgJson.buildNumber}
          <p>Nhanh main dev</p>
      </header>
    </div>
  );
}

export default App;
