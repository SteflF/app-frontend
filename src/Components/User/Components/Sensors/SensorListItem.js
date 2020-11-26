import * as React from "react";
import {Button} from "react-bootstrap";

class SensorListItem extends React.Component {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.sensor.id}</th>
                <td>{this.props.sensor.name}</td>
                <td>{this.props.sensor.measurement}</td>
                <td>
                    <Button className="btn-secondary mr-1" onClick={() => this.props.onButtonClick(this.props.sensor, 'edit')}>Edit</Button>
                    <Button className="btn-danger" onClick={() => this.props.onButtonClick(this.props.sensor, 'remove')}>Remove</Button>
                </td>
            </tr>
        );
    }
}

export default SensorListItem;