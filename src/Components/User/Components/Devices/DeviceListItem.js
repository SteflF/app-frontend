import * as React from "react";
import {Link} from "react-router-dom";

class DeviceListItem extends React.Component {
    state = {
        id: this.props.id,
        name: this.props.name
    };

    render() {
        return (
            <tr>
                <th scope="row">{this.state.id}</th>
                <td>{this.state.name}</td>
                <td>
                    <Link className="mr-1" to="">Add</Link>
                    <Link className="mr-1" to="">Edit</Link>
                    <Link to="">Remove</Link>
                </td>
            </tr>
        );
    }
}

export default DeviceListItem;