import { useState } from "react"
import Rect from './components/Rect'

function App() {
  const [state, setState] = useState(0)

  return (
    <div className="App">
      <header>this is the header</header>
      <section className="content-wrapper">
        <div className="shape-wrapper">
          <Rect />
        </div>
        <p style={{ color: "white" }}>Content area</p>
      </section>
    </div>
  );
}

export default App;
