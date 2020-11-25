import * as React from "react";
import {Button, Modal} from "react-bootstrap";

const INITIAL_STATE = {
    sensor: {id: '', name: ''}
};

class SensorModal extends React.Component {
    state = {
        sensor: { id: '', name: '' }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (prevProps !== this.props){
            this.setState({sensor: this.props.sensor});
        }
    }

    handleChange = (e) => {
        this.setState({
            sensor: { name: e.target.value }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ sensor: INITIAL_STATE.sensor });
        this.props.onSubmit(this.state.sensor);
    }

    handleHide = () => {
        this.setState({ sensor: INITIAL_STATE.sensor });
        this.props.onHide();
    }

    render() {
        return (
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
                        ? <label htmlFor="exampleInputPassword1">Opravdu chcete smazat senzor {<b>{this.props.sensor.name}</b>}?</label>
                        : <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Sensor</label>
                            <input name="name" className="form-control" placeholder="Name" value={this.state.sensor.name} onChange={this.handleChange} required />
                        </div>}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>{this.props.buttonText}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default SensorModal;