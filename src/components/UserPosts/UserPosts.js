import React from 'react';
import {connect} from 'react-redux';
import './UserPosts.css';
import {fetchSingleUserPosts, fetchSingleUser} from '../../actions';

class UserPosts extends React.Component {

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
            this.props.fetchSingleUserPosts(this.getId());
        }                         
    }

    componentDidUpdate() {
        let user = this.getUser();
        if(!user.name) {
            // call api action to get user and store user                                       
            this.props.fetchSingleUser(this.getId());
            
        } 
    }

    renderPostsTable() {
        let user = this.getUser();
        let posts = user.posts
        return (
            <table className="ui celled table" >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Read</th>
                    </tr>                    
                </thead>
                <tbody>
                    {posts.map((post, index) => {
                        return (
                            <tr key={index} >
                                <td>{index + 1}</td>
                                <td>{post.title}</td>
                                <td><button className="ui primary medium button"  >Read Post</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )

        
    }

    render() {          
        let user = this.getUser()
        if(!user || !user.name || !user.posts) {
            return <div className="ui active centered loader"></div>
        } else {
            return (
                <div className="user-posts" >
                    <div className="header-container" >
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
    return { singleUser : state.singleUser }
}

export default connect(mapStateToProps, {fetchSingleUserPosts, fetchSingleUser})(UserPosts);