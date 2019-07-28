import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import axios from 'axios';
import SaveBtn from "../components/SaveBtn";

class Books extends Component {



  state = {
    books: [],
    buttontext: "save"
    
  
  };



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
        description: `${result.volumeInfo.description}`,
        saved: ""
        
       
      })))
    .then(newData => this.setState({books: newData}))
    //.then(res => this.loadBooks())
    .catch(error => alert(error))
  };


addBook = book=> {
  
    API.saveBook({
    title: book.title,
    author: book.author,
    description: book.description,
    published: book.published,
    bookId: book.bookId,
    saved: "true",
    
  })
  
    //.then(update => this.setState({books.book_Id: update}))
      .catch(err => console.log(err))
    };

Booksaved = tosave=> {

  
 
}


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
            <h1>Google books API</h1>
          </Jumbotron>
          <form>
            <Input
              value={this.state.title}
              onChange={this.handleInputChange}
              name="title"
              placeholder="Title to search"
            />
           
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
                    
                    
                    
                 
                  < SaveBtn value={""} onClick={() => {this.addBook(book)
                
                }
                   
                   
                       }  />
                                     
                                  

                 
                   
                  </div>
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
