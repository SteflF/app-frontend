import * as React from "react";
import {Button} from "react-bootstrap";

class DeviceListItem extends React.Component {
    state = {
        device: this.props.device
    };

    render() {
        return (
            <tr>
                <th scope="row">{this.state.device.id}</th>
                <td>{this.state.device.name}</td>
                <td>
                    <Button className="btn-secondary mr-1" onClick={() => this.props.onButtonClick(this.state.device, 'edit')}>Edit</Button>
                    <Button className="btn-danger" onClick={() => this.props.onButtonClick(this.state.device, 'remove')}>Remove</Button>
                </td>
            </tr>
        );
    }
}

export default DeviceListItem;