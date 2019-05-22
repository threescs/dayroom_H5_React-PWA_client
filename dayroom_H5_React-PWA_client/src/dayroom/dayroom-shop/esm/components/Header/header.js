function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classify from 'parentSrc/classify';
import { Link, resourceUrl } from 'parentSrc/drivers';
import Icon from 'parentComponents/Icon';
import SearchIcon from 'react-feather/dist/icons/search';
import MenuIcon from 'react-feather/dist/icons/menu';
import CartTrigger from 'parentComponents/Header/cartTrigger';
import NavTrigger from 'parentComponents/Header/navTrigger';
import defaultClasses from "./header.css";
import Logo from "../Logo";

class Header extends Component {
  get searchIcon() {
    return React.createElement(Icon, {
      src: SearchIcon
    });
  }

  render() {
    const {
      classes
    } = this.props;
    return React.createElement("header", {
      className: classes.open
    }, React.createElement("div", {
      className: classes.toolbar
    }, React.createElement("div", {
      className: classes.primaryActions
    }, React.createElement(NavTrigger, null, React.createElement(Icon, {
      src: MenuIcon
    })), React.createElement(CartTrigger, null)), React.createElement(Link, {
      to: resourceUrl('/')
    }, React.createElement(Logo, {
      classes: {
        logo: classes.logo
      }
    }))));
  }

}

_defineProperty(Header, "propTypes", {
  classes: PropTypes.shape({
    logo: PropTypes.string,
    primaryActions: PropTypes.string,
    root: PropTypes.string,
    open: PropTypes.string,
    secondaryActions: PropTypes.string,
    toolbar: PropTypes.string
  })
});

export default classify(defaultClasses)(Header);
//# sourceMappingURL=header.js.map