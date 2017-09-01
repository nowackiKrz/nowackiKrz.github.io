import React from 'react';
import * as JobAdd from './JobAdd.jsx'




//wyswietla ogloszenia

class Listing extends React.Component {
  render () {

    let cards = [
        {'name': 'Super card', 'id': 1},
        {'name': 'Other card', 'id': 2},
        {'name': 'Last card', 'id': 3}
    ];

      let adds = [
        {'name': "Makro", 'JobDescription': "Opis", 'applyEmail': "nowacki.krz@gmail.com"}
          {'name': "Makro", 'JobDescription': "Opis", 'applyEmail': "nowacki.krz@gmail.com"}
      ];

console.log(JobAdd)

       let elements = adds.map((element) => {
           return (<li key={element.id}>{element.name}</li>)
       })
       return <ul>{elements} </ul>
   }
 }



export default Listing;
