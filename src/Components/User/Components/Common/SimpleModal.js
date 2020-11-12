import * as React from "react";
import {Button, Modal} from "react-bootstrap";

class SimpleModal extends React.Component {
    state = {
        hodnota: ''
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state.hodnota);
        this.handleHide();
    }

    handleHide = () => {
        //this.setState({hodnota: ''});
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
                        I will not close if you click outside me. Don't even try to press escape key. <br />
                        <input name="hodnota" value={this.state.hodnota} onChange={this.handleChange} />
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

export default SimpleModal;