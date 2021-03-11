import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import Header from './Header';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import Areview from './Areview.js'
import Notes from './Notes'
import './ReviewsNotesPage.css'

class ReviewsNotesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {Areview: false, Anote: false, currentURL: '', url: '', title: '', authors: [], cover: '', description: ''};
    this.updateState = this.updateState.bind(this)
    this.Areview = this.Areview.bind(this)
    this.Anote = this.Anote.bind(this)
      console.log("current url is: " + this.state.currentURL)
  }

  updateState(childData){
    console.log("button clicked")
    this.setState({currentURL: childData})
  }

  // fetchpage(){
  //   const baseUrl = `http://localhost:3000/books/${this.state.result}`
  // this.state.result &&  axios.get(baseUrl).then((response) => {
  //      const info = (response.data)
  //      console.log(info)
  //
  //
  // }
  // )
  //
  // }
  componentDidMount() {
    const currentPath = window.location.pathname
    const result = currentPath.slice(9);
    console.log(result)
    this.setState({url: result})

    const baseUrl = `http://localhost:8080/books/${result}`
    axios.get(baseUrl).then((response) => {
      const info = (response.data)
      console.log(info)

      const titleResponse = info["title"]
      const authorsResponse = info["authors"]
      console.log(authorsResponse)
      const coverResponse = info["cover"]
      const descriptionResponse = info["description"]

      this.setState({title: titleResponse})
      this.setState({authors: authorsResponse})
      this.setState({cover: coverResponse})
      this.setState({description: descriptionResponse})

    })

  }

Areview(){
this.setState({Areview: true})
this.setState({Anote: false})
}
Anote(){
  this.setState({Areview: false})
this.setState({Anote: true})
}

 render() {
console.log('this is working', this.props.params)
  // let categoryId = this.props.match.params.categoryId;

  return (
  <div className="">



<div className="reviewsContainer">
   <div className="bookPage">
  <h1> {this.state.title}</h1>
    By: {this.state.authors.map((author) =>
      <h3 key={author}> {author}, </h3>
    )}
    <p> {this.state.description}</p>
    {<img src={ this.state.cover } />}
   </div>
    <div className="n">
   <button onClick={this.Areview}>Review</button>
   <button onClick={this.Anote}>Note</button>
    {this.state.Areview ? <Areview dataFromParent = {this.state.title}/> : null}
    {this.state.Anote ? <Notes dataFromParent = {this.state.title}/> : null}

    </div>
  </div>
  </div>
  )
 }
}
export default ReviewsNotesPage;

// <Areview dataFromParent = {this.state.title}/>
// <Notes dataFromParent = {this.state.title}/>
// <button onClick={this.state.Areview}>Areview</button>
// <button onClick={<Notes dataFromParent = {this.state.title}/>}>Notes</button>
