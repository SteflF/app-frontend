import * as React from "react";
import BookTable from "./Books/BookTable"
import {BookController_GetUserBooks} from "../../../ApiClient/routes"
import http from "../../../Kernel/Networking/HttpService";
import {Helmet} from "react-helmet";

class UserBooksList extends React.Component {
    state = {
        books: [
            {id: 1, name: "kniha1"},
            {id: 2, name: "kniha2"},
            {id: 3, name: "kniha3"}
        ]
    }

    async componentDidMount(){
        const { data: books } = await http.get(BookController_GetUserBooks());

        console.log("knihy: ", books);

        this.setState({ books: books.result });
    }

    render() {
        return(
            <React.Fragment>
                <Helmet>
                    <title>Books</title>
                </Helmet>
                <BookTable books={this.state.books}>
                </BookTable>
            </React.Fragment>
        )
    }
}

export default UserBooksList;