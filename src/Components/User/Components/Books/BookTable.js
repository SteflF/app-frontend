import * as React from "react";
import BookListItem from "./BookListItem"

class BookTable extends React.Component {
    state = {
        books: this.props.books
    };

    render() {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                </tr>
                </thead>
                <tbody>
                    {this.state.books.map(book => (
                        <BookListItem key={book.id} name={book.name}></BookListItem>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default BookTable;