import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";



import DeleteBtn from "../components/DeleteBtn";


import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";







class Books extends Component {
  // Setting our component's initial state
  state = {
    books: [],
    title: "",
    author: "",
    description: "",
    published: "",
    bookId: "",
    saved: ""
  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadBooks();
  }
  
  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", description: "", published:"", bookId:"", })
      )
      .catch(err => console.log(err));
  };


  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-2">
            <Link to="/">search</Link>
          </Col>

          <Col size="md-2">
            <Link to="/saved">saved</Link>
          </Col>
        </Row>



        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Saved Books</h1>
              
              
            </Jumbotron>
          </Col>
          </Row>
        
        
        {this.state.books.length ? (
              <List>
                {this.state.books.map(book => {
                  return (
                    <ListItem key={book._id}>
                      <div>
                    <strong>

                    <div><img 
                  alt={`${book.title} book`}
                  src={`http://books.google.com/books/content?id=${
                    book.bookId
                  }&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                /></div> 

                      {book.title} by {book.author} published  {book.published}
                      </strong>
                     <div>{book.description} </div> 
                    
                    
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    </div>
                    </ListItem>
                    
                  );
                })}
              </List>) : (
              <h3>No Results to Display</h3>
            )}

          
        
        
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Search</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
