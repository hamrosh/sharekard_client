import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">Hello, everyone!</h1>
          <p className="lead">Welcome to ShareKard !!!</p>
          <hr className="my-2" />
          <p />
          <p className="lead">
            <Button color="primary">Vendor Login</Button>{' '}
            <Button color="primary">Admin Login</Button>
          </p>
        </Jumbotron>
      </div>
    );
  }
}
