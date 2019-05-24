function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import classify from 'parentSrc/classify';
import defaultClasses from "./topbanner.scss";
import SwiperContainer from "../SwiperContainer";
import SwiperSlide from "../SwiperSlide";

class TopBanner extends Component {
  render() {
    const settings = {
      thumbs: true
    };
    const {
      classes,
      items
    } = this.props;
    const data = [{
      img: 0,
      text: 'slide 0'
    }, {
      img: 1,
      text: 'slide 1'
    }, {
      img: 2,
      text: 'slide 2'
    }, {
      img: 3,
      text: 'slide 3'
    }, {
      img: 4,
      text: 'slide 4'
    }];
    console.log(data);
    return React.createElement("div", {
      className: "top-banner"
    }, React.createElement(SwiperContainer, {
      className: "swiper-gallery",
      settings: settings
    }, React.createElement("div", {
      className: "swiper-wrapper"
    }, data.map(item => React.createElement(SwiperSlide, {
      key: item.img
    }, React.createElement("p", null, item.img)))), React.createElement("div", {
      className: "swiper-wrapper"
    }, data.map(item => React.createElement(SwiperSlide, {
      key: item.text
    }, React.createElement("p", null, item.text))))));
  }

}

_defineProperty(TopBanner, "propTypes", {
  classes: shape({
    root: string
  })
});

export default classify(defaultClasses)(TopBanner);
//# sourceMappingURL=topbanner.js.map