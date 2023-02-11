import "./App.css";
import TodoList from "./components/index"
// import 'bootstrap/dist/css/bootstrap.min.css'
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import background from "./white.jpg"; //background image

function App() {
  return (
    <div className="App" style={{ backgroundImage: `url(${background})`}}>
      <TodoList />
    </div>
  );
}

export default App;
