import * as React from "react";

class BookListItem extends React.Component {
    state = {
        id: this.props.key,
        name: this.props.name
    };

    render() {
        return (
            <tr>
                <th scope="row">{this.state.id}</th>
                <td>{this.state.name}</td>
            </tr>
        );
    }
}

export default BookListItem;