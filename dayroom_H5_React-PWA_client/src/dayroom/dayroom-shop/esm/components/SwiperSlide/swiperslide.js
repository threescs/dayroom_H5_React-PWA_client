function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { shape, string, node } from 'prop-types';
import classify from 'src/classify';
import defaultClasses from "./swiperslide.scss";
import { directive } from '@babel/types';

class SwiperSlide extends Component {
  render() {
    const {
      classes,
      children
    } = this.props;
    return React.createElement("div", {
      className: "swiper-slide item"
    }, children);
  }

}

_defineProperty(SwiperSlide, "propTypes", {
  classes: shape({
    root: string
  }),
  children: node
});

export default classify(defaultClasses)(SwiperSlide);
//# sourceMappingURL=swiperslide.js.map