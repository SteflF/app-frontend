import * as React from "react";
import {Button, Modal} from "react-bootstrap";

const INITIAL_STATE = {
    device: {id: '', name: ''}
};

class DeviceModal extends React.Component {
    state = {
        device: { id: '', name: ''}
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (prevProps !== this.props){
            console.log("zavolano componentchange: ", this.state.device);
            this.setState({device: this.props.device});
        }
    }

    handleChange = (e) => {
        //this.setState({[e.target.name]: e.target.value});
        console.log("zavolano zmena: ", e.target.value);
        this.setState(prevState => ({
            device: {
                ...prevState.device,
                name: e.target.value
            }
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.device);
        this.handleHide();
    }

    handleHide = () => {
        this.setState({ device: INITIAL_STATE });
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
                        {this.props.action === "remove"
                            ? <label htmlFor="exampleInputPassword1">Opravdu chcete smazat zařízení {<b>{this.props.device.name}</b>}?</label>
                            : <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Device name</label>
                                <input name="deviceName" className="form-control" placeholder="Name" value={this.state.device.name} onChange={this.handleChange} required />
                            </div>}

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