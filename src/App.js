import { StoreProvider } from './contexts/Store.context'
import Home from "./pages/Home"
import Toolbar from './components/Toolbar';

export default function App() {
  // console.log("App rendering...")
  document.title = "Shaperr"

  return (
    <div className="App">
      <main>
        <StoreProvider>
          <Toolbar />
          <Home />
        </StoreProvider>
      </main>
      <div className="footer">
        <p>Made with ❤ by <span>Elduwani</span></p>
      </div>
    </div>
  );

}