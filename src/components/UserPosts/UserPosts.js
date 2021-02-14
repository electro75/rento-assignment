import React from 'react';
import {connect} from 'react-redux';

import {fetchSingleUserPosts, fetchSingleUser} from '../../actions';

class UserPosts extends React.Component {

    getParams() {
        const {match : {params }} = this.props;

        return params;
    }

    componentDidMount() {
        let params = this.getParams();

        if(!this.props.singleUser || !this.props.singleUser[params.userId] || !this.props.singleUser[params.userId].posts) {
            // call api action
            this.props.fetchSingleUserPosts(params.userId);
        }                         
    }

    componentDidUpdate() {
        let params = this.getParams();
        if(!this.props.singleUser[params.userId].name) {
            // call api action to get user and store user                        
            this.props.fetchSingleUser(params.userId);
            
        } 
    }

    render() {      
        let userId = this.getParams().userId  
        if(!this.props.singleUser[userId] || !this.props.singleUser[userId].name) {
            return <div className="ui loading"></div>
        } else {
            return (
                <h2 className='ui header' > {this.props.singleUser[userId].name}'s Posts </h2>
            )
        }
        
    }
}

const mapStateToProps = (state) => {
    return { singleUser : state.singleUser }
}

export default connect(mapStateToProps, {fetchSingleUserPosts, fetchSingleUser})(UserPosts);