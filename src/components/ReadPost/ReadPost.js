import React from 'react';
import {connect} from 'react-redux';
import {fetchPostDetails, fetchPostComments, deletePost} from '../../actions';
import Comments from './Comments/Comments';
import './ReadPost.css';

class ReadPost extends React.Component {

    state = {showComments : false}

    getId() {
        const {match : {params}} = this.props;

        return params;
    }

    getPost() {
        return {...this.props.singlePost[this.getId().postId]}
    }
    
    componentDidMount() {
        let postId = this.getId().postId;

        if(!this.props.singlePost[postId]) {
            this.props.fetchPostDetails(postId);
        }
    }

    componentDidUpdate() {
        if(this.props.error) {
            this.props.history.push('/404');
        }
    }    

    getComments() {
        let post= this.getPost();
        if(post.comments && post.comments.length > 0) {
            this.setState({showComments: true})
        } else {            
            this.props.fetchPostComments(this.getId().postId);
            this.setState({showComments: true})
        }
    }

    renderCommentSection() {
        if(this.state.showComments) {
            return (
                <div>
                    <button className="ui primary button" onClick={()=> this.setState({showComments : false})} >Hide Comments</button>
                    <div className="comments-section" >
                        <Comments comments={this.getPost().comments} />
                    </div>
                </div>
            )
        } else {
            return (
                <button className="ui primary button" onClick={()=> this.getComments()}>Show Comments</button>
            )
        }
    }

    handleDelete(post) {        
        this.props.deletePost({postId : post.id, userId : post.userId});
        this.props.history.push(`/user/${post.userId}`);
    }


    render() {                
        if(!this.props.singlePost[this.getId().postId]) {
            return <div className="ui active centered loader"></div>
        } else {
            let post = this.getPost();
            return (
                <div className="post-details" >
                    <div className="header-container" >
                        <div style={{display:'flex'}} >
                            <button className="ui icon button" onClick={()=> { this.props.history.push(`/user/${post.userId}`) }} >
                                <i className="angle left icon" ></i>
                            </button>                                                    
                            <h2 className="post-title" >
                                {post.title}
                            </h2>
                        </div>
                        <div className="del-btn" >
                            <button className="ui negative icon button labeled" onClick={() => this.handleDelete(post)}>
                                <i className="trash white icon"></i>
                                Delete Post
                            </button>
                        </div>
                    </div>
                    <div className="ui divider" ></div>

                    <div className="ui segment" >
                        <p className="post-body" >{post.body}</p>
                    </div>

                    <div className="ui divider" ></div>
                    <div className="comments-section" >
                        {this.renderCommentSection()}
                    </div>
                    
                </div>
            )
        }

        
    }
}

const mapStateToProps = (state) => {
    return { 
        singlePost : state.singlePost, 
        error: state.error       
    }
}

export default connect(mapStateToProps, {fetchPostDetails, fetchPostComments, deletePost})(ReadPost);