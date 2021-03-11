import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import ReviewForm from './ReviewForm'
import NotesForm from './NotesForm'
// import './Areview.css'


class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: '', notesInfo: [''], notes: [] , button: false ,formRenderer: false, noteMakerRenderer: false};
    this.handleBackEnd = this.handleBackEnd.bind(this)
    this.makeNotes = this.makeNotes.bind(this)
    this.settinPage = this.settinPage.bind(this)
    this.getbutton = this.getbutton.bind(this)
console.log(this.state.reviews)
  }


  handleBackEnd() {
    console.log("button clicked reviews")
    const url = '6041f5e00914901cdc48b5c7'
      // this.setState({booktitle: event.target.value});
      const baseUrl = `http://localhost:8080/notes/`
      axios(baseUrl).then((response) => {
         const info = (response.data)
         console.log(info)
           info.map((book) => {
             console.log(book.title)
             console.log(this.props.dataFromParent)
             if (book.title === this.props.dataFromParent){
               console.log(book.note)
               this.setState({notesInfo: book})
               this.setState({title: book.title})
               // this.setState({reviews: book.review})
               this.state.notes.push(book.note)
               this.setState({button: true})
             }else{
               this.setState({title: this.props.dataFromParent})
               this.setState({button: true})
             }
           })

      })
  }
  getNotesBackEnd() {
    console.log("button clicked reviews")
    const url = '6041f5e00914901cdc48b5c7'
      // this.setState({booktitle: event.target.value});
      const baseUrl = `http://localhost:8080/notes/`
      axios(baseUrl).then((response) => {
         const info = (response.data)
         console.log(info)
           info.map((book) => {
             console.log(book.title)
             // console.log(this.props.dataFromParent)
             if (book.title === this.props.dataFromParent){
               console.log(book.review)
               this.setState({reviewsInfo: book})
               this.setState({title: book.title})
               // this.setState({reviews: book.review})
               this.state.reviews.push(book.review)
               // this.setState({button: true})
             }else{
               this.setState({title: this.props.dataFromParent})
               // this.setState({button: true})
             }
           })

      })
  }

settinPage(){
  this.setState({title: this.props.dataFromParent } )
}

componentDidMount(){
// this.setState({title: this.props.dataFromParent } )
this.settinPage()
}

getbutton(){
  this.setState({button: true})
}
makeNotes(){
    this.setState({formRenderer: true})
}
// makeNotes(){
//   this.setState({noteMakerRenderer: true})
//   // this.setState({formRenderer: false})
// }

 render() {

  return (
  <div className="Notes-Container">
  <h1> <span class="d-block p-2 bg-dark text-white mx-auto" style={{ display: "flex", justifyContent: "center", fontSize: 45 }}> Notes </span> </h1>
  <h4>{this.props.dataFromParent}</h4>

  <div className="button-button-display">
  <button onClick={this.handleBackEnd} className="button1 p-2 bg-dark text-white mx-auto">Reviews</button>
  <button onClick={this.getNotesBackEnd} className="button2 p-2 bg-dark text-white mx-auto">Notes</button>
  </div>

<div className="create-review-notes">
{this.state.button ?
  <button onClick={this.makeReview} >Create Review</button>
:null}

<div>
{this.state.notes.map((note) =>
  <p key={note}> {note} </p>
)}
</div>
{this.state.formRenderer ? <NotesForm titleOfBook = {this.state.title}/> :null}



  </div>
  </div>
  )
 }
}
export default Notes;

// {this.state.formRenderer ? <ReviewForm data = {this.state.title}/> :null}
// {this.state.noteMakerRenderer ? <ReviewForm data = {this.state.title}/> :null}

// <div>
// {this.state.notes.map((note) =>
//   <p key={note}> {note} </p>
// )}
// </div>
