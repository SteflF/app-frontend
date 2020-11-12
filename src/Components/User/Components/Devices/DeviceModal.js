import * as React from "react";
import {Button, Modal} from "react-bootstrap";

const INITIAL_STATE = {
    deviceName: ''
};

class DeviceModal extends React.Component {
    state = {
        deviceName: ''
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state.deviceName);
        this.handleHide();
    }

    handleHide = () => {
        this.setState({ ...INITIAL_STATE });
        this.props.onHide();
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    show={this.props.show}
                    onHide={this.handleHide}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Device name</label>
                            <input name="deviceName" className="form-control" placeholder="Name" value={this.state.deviceName} onChange={this.handleChange} required />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleHide}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>{this.props.buttonText}</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

export default DeviceModal;