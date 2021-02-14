import { BrowserRouter, Route } from 'react-router-dom';
import Users from '../Users/Users';
import UserPosts from '../UserPosts/UserPosts';
import './App.css';
import ReadPost from '../ReadPost/ReadPost';

function App() {
  return (
    <div className="app-container" >
      <BrowserRouter>
        <Route path="/" exact component={Users} />
        <Route path="/user/:userId" component={UserPosts} />
        <Route path="/post/:postId" component={ReadPost} />
      </BrowserRouter>
    </div>
    
  );
}

export default App;
