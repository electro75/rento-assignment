import { BrowserRouter, Route } from 'react-router-dom';
import Users from '../Users/Users';
import UserPosts from '../UserPosts/UserPosts';

function App() {
  return (
    <div className="ui" >
      <BrowserRouter>
        <Route path="/" exact component={Users} />
        <Route path="/user/:userId" component={UserPosts} />
      </BrowserRouter>
    </div>
    
  );
}

export default App;
