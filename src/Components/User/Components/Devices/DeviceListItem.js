import * as React from "react";

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
                <td>Add/Edit/Remove</td>
            </tr>
        );
    }
}

export default DeviceListItem;