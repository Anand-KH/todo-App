import './App.css';
import TodoApp from './component/TodoApp';

function App() {
  return (
    <div className="App">
      <h2 className="text-center mt-5 font-weight-bold">Todo App</h2>
      <div className="mt-5">
        <TodoApp/>
      </div>
    </div>
  );
}

export default App;
