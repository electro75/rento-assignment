import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Users from '../Users/Users';
import UserPosts from '../UserPosts/UserPosts';
import './App.css';
import ReadPost from '../ReadPost/ReadPost';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <div className="app-container" >
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Users} />
          <Route path="/user/:userId" component={UserPosts} />
          <Route path="/post/:postId" component={ReadPost} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404"/>
        </Switch>        
      </BrowserRouter>
    </div>
    
  );
}

export default App;
