function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import classify from 'src/classify';
import { Link, resourceUrl, Route } from "@magento/venia-drivers";
import Icon from 'parentComponents/Icon';
import SearchIcon from 'react-feather/dist/icons/search';
import MenuIcon from 'react-feather/dist/icons/menu';
import CartTrigger from 'parentComponents/Header/cartTrigger';
import NavTrigger from 'parentComponents/Header/navTrigger';
import SearchTrigger from 'parentComponents/Header/searchTrigger';
const SearchBar = React.lazy(() => import('parentComponents/SearchBar'));
import defaultClasses from "./header.css";
import Logo from 'parentComponents/Logo';

class Header extends Component {
  get searchIcon() {
    return React.createElement(Icon, {
      src: SearchIcon
    });
  }

  render() {
    const {
      searchOpen,
      classes,
      toggleSearch
    } = this.props;
    const rootClass = searchOpen ? classes.open : classes.closed;
    return React.createElement("header", {
      className: rootClass
    }, React.createElement("div", {
      className: classes.toolbar
    }, React.createElement(Link, {
      to: resourceUrl('/')
    }, React.createElement(Logo, {
      classes: {
        logo: classes.logo
      }
    })), React.createElement("div", {
      className: classes.primaryActions
    }, React.createElement(NavTrigger, null, React.createElement(Icon, {
      src: MenuIcon
    }))), React.createElement("div", {
      className: classes.secondaryActions
    }, React.createElement(SearchTrigger, {
      searchOpen: searchOpen,
      toggleSearch: toggleSearch
    }, this.searchIcon), React.createElement(CartTrigger, null))), React.createElement(Suspense, {
      fallback: this.searchIcon
    }, React.createElement(Route, {
      render: ({
        history,
        location
      }) => React.createElement(SearchBar, {
        isOpen: searchOpen,
        history: history,
        location: location
      })
    })));
  }

}

_defineProperty(Header, "propTypes", {
  classes: PropTypes.shape({
    logo: PropTypes.string,
    primaryActions: PropTypes.string,
    root: PropTypes.string,
    open: PropTypes.string,
    closed: PropTypes.string,
    secondaryActions: PropTypes.string,
    toolbar: PropTypes.string
  }),
  searchOpen: PropTypes.bool,
  toggleSearch: PropTypes.func.isRequired
});

export default classify(defaultClasses)(Header);
//# sourceMappingURL=header.js.map