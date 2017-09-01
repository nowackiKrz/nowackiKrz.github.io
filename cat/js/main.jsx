import React from 'react';
import ReactDOM from 'react-dom';
//import { CookiesProvider, withCookies, Cookies } from 'react-cookie';
import Cookies from 'universal-cookie';

{/*}
import JobList from './JobList.jsx'
import JobAdd from './JobAdd.jsx'
*/
}






class JobAdd extends React.Component {

  state = {
    companyName: " ",
    jobDescription: " ",
    applyEmail: " ",
    add: []
  }

  handleChangeCompanyName(event) {
    this.setState({companyName: event.target.value});
  }

  handleChangeDescription(event) {
    this.setState({jobDescription: event.target.value});
  }

  handleChangeEmail(event) {
    this.setState({applyEmail: event.target.value});
  }

  handleClick(e) {
    this.state.add.push({'name': this.state.companyName, 'jobDescription': this.state.jobDescription, 'applyEmail': this.state.applyEmail})
    //console.log(this.state.add)

    this.setState({add: this.state.add})

    this.props.callbackFromParent(this.state.add);

  }

  render() {
    //  let json = JSON.stringify(this.state.add);

    return (

      <div>
        Firma<br/>
        <input className="jobInput" type="text" name="companyName" placeholder="Company name" value={this.state.companyName} onChange={(e) => this.handleChangeCompanyName(e, 1)}/><br/>
        Opis:<br/>
        <textarea className="jobInput" rows="5" cols="40" type="text" name="description" placeholder="Description" value={this.state.jobDescription} onChange={(e) => this.handleChangeDescription(e, 2)}/><br/>
        email: <br/>
        <input className="jobInput" type="email" name="email" placeholder="Email" value={this.state.applyEmail} onChange={(e) => this.handleChangeEmail(e, 3)}/><br/>
        <br/>
        <button onClick={(e) => this.handleClick(e)}>Save
        </button>

      </div>
    );
  }
}

class Listing extends React.Component {

  state = {
    adds: this.props.adds
  }

  render() {

    let elements = this.props.adds.map((element, index) => {
      console.log(this.props.adds)
      return (

        <li key={index}>{element.name} <br/> {element.jobDescription} <br/>  {element.applyEmail}<br/> <br/> </li>

      )
    })
    return <ul>{elements}</ul>
  }
}

class Page extends React.Component {

  state = {

    //add: [],
    adds: []
  }

  myCallback = (dataFromChild) => {

    this.setState({adds: dataFromChild})
  }

  render() {
    return (
      <div className="mainContainer">
        <JobAdd callbackFromParent={this.myCallback}/>
        <Listing adds={this.state.adds}/>
      </div>
    );
  }
}


class Cookie extends React.Component {



}


class App extends React.Component {
  render() {

    const cookies = new Cookies();
    cookies.set('myCat', 'Pacman', { path: '/' });
    console.log(cookies.get('myCat')); // Pacman


    return (

      <div>
        <Page/>
      </div>

    );
  }
}

document.addEventListener('DOMContentLoaded', function() {

  ReactDOM.render(
    <App/>, document.getElementById('app'));
});
