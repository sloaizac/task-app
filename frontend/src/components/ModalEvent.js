import React from "react";


export default class ModalEvent extends React.Component {

    render() {
        if (this.props.show) {


            console.log("aca");

            // The gray background
            const backdropStyle = {
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.3)'
            };

            // The modal "window"
            const modalStyle = {
                position: "initial",
                borderRadius: 5,
                maxWidth: 500,
                minHeight: 300,
                margin: '0 auto',
                padding: 30,
                display: "block"
            };

            return (
                <div className="backdrop" style={backdropStyle}>
                    <div className="modal" style={modalStyle}>
                        <div className="card">
                            <div className="card-header">
                                <h3>Create event</h3>
                            </div>
                            <div className="card-body">
                                <form className="m-2">
                                    <div className="form-group">
                                        <input name="title" type="text" className="form-control" placeholder="Event title" />
                                    </div>
                                    <div className="form-group">
                                        <textarea name="description"  className="form-control" placeholder="description" ></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-secondary" onClick={this.props.onClose}>
                                    Close
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            )
        }
        return null;
    }
}