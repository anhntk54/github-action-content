import './App.css';
const pkgJson = require('../package.json');
function App() {
  return (
    <div className="App">
      <header className="App-header">
        Build Number: {pkgJson.buildNumber}
          nhanhs dev 11
      </header>
    </div>
  );
}

export default App;
