import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import axios from 'axios';

class Books extends Component {



  state = {
    books: [],
    title: "",
    author: "",
    synopsis: "",
    searchTerm: "",

  };









  // componentDidMount() {
  //   this.loadBooks();
  // }

  // loadBooks = () => {
  //   API.getBooks()
  //     .then(res =>
  //       this.setState({ books: res.data, title: "", author: "", synopsis: "" })
  //     )
  //     .catch(err => console.log(err));
  // };

  

loadBooks = searchItem => {
    //let test = "jaws"
    //console.log(searchItem)
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchItem}`)
  
    //.then(json => console.log(json))

  
    .then(json => json.data.items.map(result =>   (
      
      {
        bookId: `${result.id}`,
        title: `${result.volumeInfo.title}`,
        author: `${result.volumeInfo.authors}`,
        published: `${result.volumeInfo.publishedDate}`,
        
       
      })))
    .then(newData => this.setState({books: newData}))
    //.then(res => this.loadBooks())
    .catch(error => alert(error))
  };


deleteBook = id => {
  API.deleteBook(id)
    .then(res => this.loadBooks())
    .catch(err => console.log(err));
};








handleInputChange = event => {
  const { name, value } = event.target;
  this.setState({
    [name]: value
  });
};

handleFormSubmit = event => {
  event.preventDefault();
  
    
    this.loadBooks(this.state.title);
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
            <h1>Google books API</h1>
          </Jumbotron>
          <form>
            <Input
              value={this.state.title}
              onChange={this.handleInputChange}
              name="title"
              placeholder="Title to search"
            />
            {/* <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              /> */}
            {/* <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}
            <FormBtn
              disabled={!(this.state.title)}
              onClick={this.handleFormSubmit}
            >
              Search Google Books API
              </FormBtn>
          </form>
        
          <Jumbotron>
            <h1>Results</h1>
          </Jumbotron>
          {this.state.books.length ? (
            <List>
              {this.state.books.map(book => (
                <ListItem key={book._id}>
                  <Link to={"/books/" + book.id}>
                    <strong>

                    <div><img 
                  alt={`${book.title} book`}
                  src={`http://books.google.com/books/content?id=${
                    book.bookId
                  }&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                /></div> 

                      {book.title} by {book.author} published on {book.published}
                     
                    
                    </strong>
                  </Link>
                  <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                </ListItem>
              ))}
            </List>
          ) : (
              <h3>No Results to Display</h3>
            )}
        </Col>
      </Row>
    </Container>
  );
          }}


export default Books;
