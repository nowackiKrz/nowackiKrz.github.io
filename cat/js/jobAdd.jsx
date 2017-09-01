import React from 'react';
import * as JobList from './JobList.jsx'


  let adds = [{'Name': "Makro", 'JobDescription': "Opis", 'applyEmail': "nowacki.krz@gmail.com"}];



//dodaje ogloszenie

class JobAdd extends React.Component {

state ={
companyName:" ",
jobDescription:" ",
applyEmail:" "
}




handleChangeCompanyName(event) {
    this.setState({
      companyName: event.target.value
    });
  }

  handleChangeDescription(event) {
      this.setState({
        jobDescription: event.target.value
      });
    }


    handleChangeEmail(event) {
        this.setState({
          applyEmail: event.target.value
        });
      }


      handleClick(e){



        adds.push({'Name': this.state.companyName, 'JobDescription': this.state.companyName,'applyEmail': this.state.companyName});

        console.log(adds);
        <JobList adds={adds} />



      }

  render () {

    return (

      <div>

         Company Name:<br/>
         <input className="jobInput" type="text" name="companyName" placeholder="Company name" value={this.state.companyName} onChange={(e) => this.handleChangeCompanyName(e,1)} /><br/>
         Job Description:<br/>
         <input className="jobInput" type="text" name="description" placeholder="Description" value={this.state.jobDescription} onChange={(e) => this.handleChangeDescription(e,2)}/><br/>
         email:
          <input className="jobInput" type="email" name="email" placeholder="email" value={this.state.applyEmail} onChange={(e) => this.handleChangeEmail(e,3)}/><br/>
          <button onClick={(e) => this.handleClick(e)}>Save </button>


     </div>
    );
  }
}



export default JobAdd;
