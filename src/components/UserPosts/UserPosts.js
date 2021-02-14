import React from 'react';
import {connect} from 'react-redux';
import './UserPosts.css';
import {fetchSingleUserPosts, fetchSingleUser} from '../../actions';
import {updateLocalState} from '../../actions';

class UserPosts extends React.Component {

    state = {filterPosts : []}

    getUser() {
        const {match : {params}} = this.props;

        return this.props.singleUser[params.userId]
    }

    getId() {
        const {match:{params}} = this.props;

        return params.userId;
    }

    componentDidMount() {        
        let user = this.getUser();

        if(!user || !user.posts) {
            // call api action                        
            this.props.fetchSingleUserPosts(this.getId(), 0);
        } else {
            this.props.updateLocalState()
        }
        
        
    }

    componentDidUpdate(prevProps) {
        let user = this.getUser();        
        if(!user.name) {
            // call api action to get user and store user                                       
            this.props.fetchSingleUser(this.getId());            
        }
        
        
        if(prevProps.updateLocal !== this.props.updateLocal) {
            let userId = this.getId();            
            this.setState({filterPosts : this.props.singleUser[userId].posts.map(post => post)})
        }
        
    }

    filterPostsByTitle(ev) {
        let user = this.getUser();
        this.setState({filterPosts : user.posts.filter(post => {
            return post.title.includes(ev.target.value);
        })})
    }

    getNextPage() {
        let userPosts = this.getUser().posts;
        
        this.props.fetchSingleUserPosts(this.getId(), userPosts.length);        
    }

    renderPostsTable() {        
        return (
            <table className="ui celled unstackable table" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Read</th>
                    </tr>                    
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <div className="ui input">
                                <input type="text" placeholder="Filter Title" onChange={(e) => {this.filterPostsByTitle(e)}}/>
                            </div>
                        </td>
                        <td></td>
                    </tr>
                    {this.state.filterPosts.map((post, index) => {
                        return (
                            <tr key={index} >
                                <td>{index + 1}</td>
                                <td>{post.title}</td>
                                <td><button className="ui primary medium button" onClick={()=>this.props.history.push(`/post/${post.id}`)} >Read Post</button></td>
                            </tr>
                        )
                    })}

                    <tr>
                        <td></td>
                        <td>
                            <button className="ui primary medium button" onClick={() => this.getNextPage()} > Load More Posts</button>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        )

        
    }

    render() {        
        let user = this.getUser();        
        if(!user || !user.name || !user.posts) {
            return <div className="ui active centered loader"></div>
        } else {
            return (
                <div className="user-posts" >
                    <div className="user-header-container" >
                        <button className="ui icon button back-button" onClick={() => {this.props.history.push('/')}} >
                            <i className="angle left icon " ></i>
                        </button>                        
                        <h2 className='user-name' > {user.name}'s Posts </h2>
                    </div>
                    <div className="ui divider"></div>

                    <div>
                        {this.renderPostsTable()}
                    </div>                    

                </div>
                
                
            )
        }
        
    }
}

const mapStateToProps = (state) => {
    return { 
        singleUser : state.singleUser, 
        updateLocal : state.updateLocal
    }
}

export default connect(mapStateToProps, {fetchSingleUserPosts, fetchSingleUser, updateLocalState})(UserPosts);