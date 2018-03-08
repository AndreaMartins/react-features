import React, { PureComponent } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import withClass from '../hoc/withClass';

class App extends PureComponent {

  constructor(props){
    super(props);
    console.log('[App.js] Inside Constructor', props);
    this.state = {
      persons: [
        {id:'a', name: 'Max', age: 28 },
        {id:'b', name: 'Manu', age: 29 },
        {id:'c', name: 'Staphanie', age: 26},
      ],
      otherState: 'some other value',
      showPersons: false,
      toggleClicked: 0
    };
  }

  componentWillMount(){
    console.log('[App.js] Inside componentWillMount()');
  }

  componentDidMount(){
    console.log('[App.js] Inside componentDidMount()');
  }

  // shouldComponentUpdate( nextProps, nextState){
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   return true;
  // }

  componentWillUpdate( nextProps, nextState ) {
    console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js] Inside componentDidUpdate');
  }

  // state = {
  //   persons: [
  //     {id:'a', name: 'Max', age: 28 },
  //     {id:'b', name: 'Manu', age: 29 },
  //     {id:'c', name: 'Staphanie', age: 26},
  //   ],
  //   otherState: 'some other value',
  //   showPersons: false,
  // }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  deletePersonHandler = (personIndex) =>{
    //const persons = this.state.persons.slice();
    // best practice because make a copy of the array
    //update state inmmutability
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState((prevState, props) => {
      return {
        showPersons:!doesShow,
        toggleClicked: this.state.toggleClicked + 1
      }
     });
  }

  render() {
    console.log('[App.js] Inside render()');
    let persons = null;


    if (this.state.showPersons) {
      persons = <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}/>;
    }

    return (

      <Aux classes={classes.App}>
        <button onClick={ ()=> {this.setState({showPersons:true})}}></button>
          <Cockpit
            appTitle ={this.props.title}
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}/>
          {persons}
      </Aux>


    );
  }
}

export default withClass(App, classes.App);
