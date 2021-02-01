import React, { Component } from 'react';
import './App.css';
import {Container, Col, Row} from 'react-bootstrap';

class App extends Component {
  render() { 
    return ( 
      <div className="App">
        <header className="App-header">
          <Container>
            <Col>
              <Row>Commit with README</Row>
            </Col>
          </Container>
        </header>
      </div>
     );
  }
}
 
export default App;
