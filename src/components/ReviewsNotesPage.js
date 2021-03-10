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
    this.state = {currentURL: '', url: '', title: '', authors: [], cover: '', description: ''};
    this.updateState = this.updateState.bind(this)
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
    <div className="notes-review-Page-buttons">
      <Areview dataFromParent = {this.state.title}/>
      <Notes dataFromParent = {this.state.title}/>
    </div>
  </div>
  </div>
  )
 }
}
export default ReviewsNotesPage;
