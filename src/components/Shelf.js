import React from 'react';
import axios from 'axios';
import './Shelf.css'
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import ReviewsNotesPage from './ReviewsNotesPage.js'
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

class Shelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: undefined, bookid: null , shelfBooks: [], };
      this.handleBackEnd = this.handleBackEnd.bind(this);
      this.deleteBook = this.deleteBook.bind(this);
  }


  handleBackEnd() {
    console.log("getting stuff from API")
      // this.setState({booktitle: event.target.value});
      const baseUrl = "https://zeibrary.herokuapp.com/books/"
      axios(baseUrl).then((response) => {
         const info = (response.data)
         console.log(info)

         // info.map((book) => {
         //   console.log(book.currentUser)
         //   console.log(this.props.dataFromParent)
         //   if (book.currentUser=== this.state.currentUser){
         //     console.log(book.title)
         //     this.setState({shelfBooks: info})
         //     // // this.setState({reviewsInfo: book})
         //     // this.setState({title: book.title})
         //     // this.setState({reviews: book.review})
         //     // this.state.reviews.push(book.review)
         //     // this.setState({button: true})
         //   }else{
         //     this.setState({title: this.props.dataFromParent})
         //     this.setState({button: true})
         //   }
         // })
         //



         this.setState({shelfBooks: info})
         // console.log(this.state.shelfBooks)
      })
  }

  componentWillMount(val){
    this.setState({counter: this.props.dataFromParent})
      // do not forget to bind getData in constructor
   this.handleBackEnd()
  }

  componentDidMount(){
    const user = AuthService.getCurrentUser();
    // console.log(user)
    this.setState({currentUser: user.username})
    setInterval(this.handleBackEnd, 2000)

  }
paramsbook(e){

  console.log(e.currentTarget.innerHTML)
  // const { history } = this.props;
  // const baseUrl = `http://localhost:3000/books/${e.currentTarget.innerHTML}`
  // axios(baseUrl).then((response) => {
  //    const info = (response.data)
  //    console.log(info)
  //    // const titleResponse = info[3]["title"]
  //    // const authorsResponse = info[3]["authors"]
  //    //
  //    // console.log(info)
  //    // console.log(titleResponse)
  //    // console.log(authorsResponse)
  //    // this.setState({shelfBooks: info})
  //    // console.log(this.state.shelfBooks)
  // })
  // this.setState({bookid: book._id})

}
deleteBook(e){
const bookId = e.target.getAttribute('value')

  const baseUrl = ``
  window.confirm(
      "Are you sure you wish to delete this book from your Shelf?"
    ) && axios.delete(`http://localhost:8080/books/${bookId}`)
        .then(res => {
          console.log(res);
          console.log(res.data);

        }).then(() => {
          const books = this.state.shelfBooks.filter(item => item._id !== bookId)
          this.setState({shelfBooks: books})
          console.log('deleted')
        })
}


stringToColour = (str) => {
let string = '0123456789ABCDEF'
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = "#";
    for (i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
  };
 render() {
    const { history } = this.props;

    const bookColor = {
      backgroundColor: this.stringToColour(this.state.bookid)
      // height: `${Math.floor(Math.random() * 20 + 180)}px`
    }

   const listBooks = this.state.shelfBooks.map((book) =>

     (

       <li key={book._id} className="Book">

       <a className="Text" href={'/reviews/'+book._id}  onClick={this.paramsbook.bind(this)}>{book.title}</a>
       <button onClick={(e) => this.deleteBook(e)} className="deleteBook" value = {book._id}> x </button>


       </li>

     )
   )
   console.log(listBooks)
   console.log(this.state.bookid)
  return (
  <div className="shelfContainer">
    <h1> <span class="d-block p-2 bg-dark text-white mx-auto" style={{ display: "flex", justifyContent: "center", fontSize: 45 }}> Book Shelf </span> </h1>


    <div className="bookShelf">
       <ul className="">
      {listBooks}
      </ul>
    </div>
    <Switch>
         <Route path="/ReviewsNotesPage/id" children={<ReviewsNotesPage />} />
       </Switch>
  </div>
  )
 }
}
export default Shelf;

// <button type="button" onClick={this.handleBackEnd}>Check Shelf</button>
//
// {this.props.data}
