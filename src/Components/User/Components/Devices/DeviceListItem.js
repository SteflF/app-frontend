import * as React from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

class DeviceListItem extends React.Component {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.device.id}</th>
                <td><Link to={"/device/" + this.props.device.id}>{this.props.device.name}</Link></td>
                <td>
                    <Button className="btn-secondary mr-1" onClick={() => this.props.onButtonClick(this.props.device, 'edit')}>Edit</Button>
                    <Button className="btn-danger" onClick={() => this.props.onButtonClick(this.props.device, 'remove')}>Remove</Button>
                </td>
            </tr>
        );
    }
}

export default DeviceListItem;