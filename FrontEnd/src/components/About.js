import React, { Component } from "react";

function NewlineText(props) {
    const text = props.text;
    return text.split('\n').map(str => <p>{str}</p>);
}
class About extends Component {
    render() {

        return (
            <div className="col-md-12 text-center" style={{height: '800px' }} >
                <h1 className="display-3 mb-4">About Us</h1>
                <hr />
                <NewlineText text={'Bookeroo is a online platform to exchange books between users and publishers'} />














            </div>



        );
    }
}

export default About;