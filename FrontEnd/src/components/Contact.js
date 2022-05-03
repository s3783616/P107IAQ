import React, { Component } from "react";

function NewlineText(props) {
    const text = props.text;
    return text.split('\n').map(str => <p>{str}</p>);
}
class Contact extends Component {

    render() {

        return (
            <div className="col-md-12 text-center" style={{height: '800px' }} >
                <h1 className="display-3 mb-4">Contact Us</h1>
                <hr />
                <NewlineText text={'Phone: XXXXXXXXXX\nEmail: contact@bookeroo.com'} />














            </div>



        );
    }
}

export default Contact;