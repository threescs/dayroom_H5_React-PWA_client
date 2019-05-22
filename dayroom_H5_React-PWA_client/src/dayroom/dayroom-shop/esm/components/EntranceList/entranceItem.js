function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { string, shape } from 'prop-types';
import classify from 'src/classify';
import { Link } from "@magento/venia-drivers";
import defaultClasses from "./entranceItem.css";

class EntranceItem extends Component {
  render() {
    const {
      props
    } = this;
    const {
      classes,
      items
    } = props;
    return React.createElement("div", {
      className: classes.containerBox
    }, React.createElement("div", {
      className: classes.containerText
    }, React.createElement("p", {
      className: classes.text
    }, items.text), React.createElement(Link, {
      className: classes.btn,
      to: items.href
    }, items.hrefName)), React.createElement("img", {
      src: items.src,
      alt: ""
    }));
  }

}

_defineProperty(EntranceItem, "propTypes", {
  items: shape({
    text: string,
    hrefName: string,
    href: string.isRequired,
    src: string
  }).isRequired,
  classes: shape({
    containerBox: string,
    containerText: string,
    text: string,
    btn: string
  }).isRequired
});

export default classify(defaultClasses)(EntranceItem);
//# sourceMappingURL=entranceItem.js.map