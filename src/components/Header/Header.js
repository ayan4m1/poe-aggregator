import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as appActions } from 'reducers/application';
import { getSessionId } from 'selectors/application';

export class Header extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      setSessionId: PropTypes.func.isRequired,
      clearSessionId: PropTypes.func.isRequired
    }).isRequired,
    sessionId: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      sessionId: ''
    };
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleForgetClick = this.handleForgetClick.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;
    const sessionId = localStorage.getItem('sessionId');

    if (sessionId) {
      actions.setSessionId(sessionId);
    }
  }

  handleIdChange(event) {
    const {
      target: { value }
    } = event;

    this.setState({ sessionId: value });
  }

  handleSaveClick() {
    const { actions } = this.props;
    const { sessionId } = this.state;

    actions.setSessionId(sessionId);
  }

  handleForgetClick() {
    const { actions } = this.props;

    actions.clearSessionId();
  }

  get authNav() {
    const { sessionId } = this.state;

    return (
      <Form inline>
        <FormControl
          type="text"
          placeholder="POESESSID"
          className="mr-sm-2"
          onChange={this.handleIdChange}
          value={sessionId}
        />
        <Button variant="success" onClick={this.handleSaveClick}>
          <FontAwesomeIcon fixedWidth icon="save" /> Save
        </Button>
      </Form>
    );
  }

  get nav() {
    return (
      <Nav>
        <Nav.Link href="#start">
          <FontAwesomeIcon fixedWidth icon="play-circle" /> Start
        </Nav.Link>
        <Nav.Link href="#stop">
          <FontAwesomeIcon fixedWidth icon="stop-circle" /> Stop
        </Nav.Link>
        <Nav.Link onClick={this.handleForgetClick}>
          <FontAwesomeIcon fixedWidth icon="door-closed" /> Forget Me
        </Nav.Link>
      </Nav>
    );
  }

  render() {
    const { sessionId } = this.props;

    return (
      <Navbar>
        <Navbar.Brand>poeagg</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>{sessionId ? this.nav : this.authNav}</Navbar.Collapse>
      </Navbar>
    );
  }
}

export const mapStateToProps = state => ({
  sessionId: getSessionId(state)
});

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(appActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
