import React, { Component } from 'react'

export default class Post extends Component {

    state = {
        post: []
    }

    async componentDidMount() {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        this.setState({
            post: data
        });
    }

    render() {
        return (
            <div>
                <h1>Post</h1>
                {
                    this.state.post.map((e) => {
                        return <div key={e.id}>
                            <h3>{e.title}</h3>
                            <p>{e.body}</p>
                        </div>
                    })
                }
            </div>
        )
    }
}

