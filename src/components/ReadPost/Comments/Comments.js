import React from 'react';

const Comments = (props) => {    
    if(!props.comments) {
        return <div className="ui active centered loader"></div>
    } else if(props.comments.length === 0){
        return (
            <div>No Comments Yet!</div>
        )
    } else {
        return props.comments.map(comment => {
            return (
                <div className="ui relaxed list" key={comment.id}>
                    <div className="item">
                        <i className="user icon"></i>
                        <div className="content">
                            <div className="header">{comment.email}</div>
                            <div className="description">{comment.body}</div>
                        </div>
                    </div>
                </div>
            )
        })
        
    }
    
}

export default Comments