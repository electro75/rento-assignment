import React from 'react';
import {connect} from 'react-redux';

import {fetchAllUsers} from '../../actions';

class Users extends React.Component {

    componentDidMount() {        
        this.props.fetchAllUsers();        
    }

    render() {
        return (
            <div>Post List</div>
        )
    }

}

const mapStateToProps = (state) => {
    return { users : state.users }
}

export default connect(mapStateToProps, {fetchAllUsers})(Users);