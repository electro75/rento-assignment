import { BrowserRouter, Route } from 'react-router-dom';
import Users from '../Users/Users';


function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Users} />
    </BrowserRouter>
  );
}

export default App;
