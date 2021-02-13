import React from 'react';

class UserPosts extends React.Component {
    componentDidMount() {
        const { match: { params } } = this.props;

        console.log(params);
    }

    render() {
        return <div>user</div>
    }
}

export default UserPosts