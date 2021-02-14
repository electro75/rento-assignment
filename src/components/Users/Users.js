import React from 'react';
import {connect} from 'react-redux';

import {fetchAllUsers} from '../../actions';
import {storeSingleUser} from '../../actions';

class Users extends React.Component {

    componentDidMount() {        
        this.props.fetchAllUsers();        
    }

    renderUserRow() {                
        return this.props.users.map(user => {
            return (<tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.company.name}</td>
                <td><button className="ui primary medium button" onClick={()=>{
                    this.props.storeSingleUser({name : user.name, id: user.id})
                    this.props.history.push(`/user/${user.id}`)

                }} >View Posts</button></td>
                </tr>)
        })        
    }

    renderUserTable() {
        if(this.props.users.length === 0 ) {
            return <div>Fetching</div>
        } else {
            return (
                <div className="user-table" >
                    <table className="ui celled table" >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Company</th>
                                <th>Posts</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderUserRow()}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="Users" >
                <h2 className="ui header" >Users</h2>
                <div className="ui divider" ></div>
                {this.renderUserTable()}    
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { users : state.users }
}

export default connect(mapStateToProps, {fetchAllUsers, storeSingleUser})(Users);