import Toolbar from './components/Toolbar';
import Rect from './components/Rect'
import Circle from './components/Circle'
import Line from './components/Line'
import Star from './components/Star'

function App() {
  return (
    <div className="App">
      <Toolbar />
      <section className="content-wrapper">
        <Rect />
        <Circle />
        <Star />
        <Line />
      </section>
    </div>
  );
}

export default App;
