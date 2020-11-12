import Toolbar from './components/Toolbar';
import Rect from './components/Rect'

function App() {
  return (
    <div className="App">
      <Toolbar />
      <section className="content-wrapper">
        <Rect />
        <Rect />
      </section>
    </div>
  );
}

export default App;
