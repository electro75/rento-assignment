import React from 'react';
import {connect} from 'react-redux';

import {fetchAllUsers} from '../../actions';
import {storeSingleUser} from '../../actions';
import {updateLocalState} from '../../actions';

class Users extends React.Component {
    
    state = {filterUsers : []}

    componentDidMount() {
        if(this.props.users.length === 0) {
            this.props.fetchAllUsers();
        }
        
        this.props.updateLocalState()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.updateLocal !== this.props.updateLocal) {
            this.setState({filterUsers : this.props.users.map(user => user)})
        }        
    }

    filterUsersByName(evt) {        
        this.setState({filterUsers : this.props.users.filter(user => {
            return user['name'].includes(evt.target.value)
        })})
    }

    filterUsersByCompany(evt) {
        this.setState({filterUsers : this.props.users.filter(user => {
            return user.company.name.includes(evt.target.value)
        })})
    }

    renderUserRow() {       
        if(this.state.filterUsers.length > 0) {
            return this.state.filterUsers.map(user => {
                return (<tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.company.name}</td>
                    <td><button className="ui primary medium button" onClick={()=>{
                        this.props.storeSingleUser({name : user.name, id: user.id})
                        this.props.history.push(`/user/${user.id}`)
    
                    }} >View Posts</button></td>
                    </tr>)
            })
        } else {
            return (
                <tr>
                    <td>No Users found.</td>
                    <td></td>
                    <td></td>
                </tr>
            )
        }         
                
    }

    renderUserTable() {
        if(this.props.users.length === 0 ) {
            return <div className="ui active centered loader"></div>
        } else {
            return (
                <div className="user-table" >
                    <table className="ui celled unstackable table" >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Company</th>
                                <th>Posts</th> 
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="ui input">
                                        <input type="text" placeholder="Filter Name" onChange={(e) => {this.filterUsersByName(e)}}/>
                                    </div>
                                </td>
                                <td>
                                    <div className="ui input">
                                        <input type="text" placeholder="Filter Company" onChange={(e) => {this.filterUsersByCompany(e)}}/>
                                    </div>
                                </td>
                                <td></td>
                            </tr>
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
    return { 
        users : state.users,
        updateLocal: state.updateLocal        
    }
}

export default connect(mapStateToProps, {fetchAllUsers, storeSingleUser, updateLocalState})(Users);