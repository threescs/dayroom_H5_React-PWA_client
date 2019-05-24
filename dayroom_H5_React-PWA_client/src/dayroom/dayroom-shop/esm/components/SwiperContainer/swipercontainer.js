function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, Fragment } from 'react';
import { shape, string } from 'prop-types';
import Swiper from 'swiper';
import classify from 'src/classify';
import defaultClasses from "./swipercontainer.scss";

class SwiperContainer extends Component {
  componentDidMount() {
    const {
      settings
    } = this.props;

    if (settings && settings.thumbs) {
      var topBannerPicSwiper = new Swiper(this.refs.container, {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        thumbs: {
          swiper: {
            el: this.refs.thumbs,
            slidePerView: 1,
            loop: true,
            effect: 'fade'
          }
        }
      });
    } else {
      var topBannerPicSwiper = new Swiper(this.refs.container, {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      });
    }
  }

  render() {
    const {
      classes,
      items,
      settings,
      children
    } = this.props;

    if (settings.thumbs) {
      return React.createElement(React.Fragment, null, React.createElement("div", {
        className: "swiper-container swiper-gallery",
        ref: "container"
      }, children[0], React.createElement("div", {
        className: "swiper-pagination"
      })), React.createElement("div", {
        className: "swiper-container swiper-thumbs",
        ref: "thumbs"
      }, children[1]));
    }

    return React.createElement("div", {
      className: "swiper-container swiper-gallery",
      ref: "container"
    }, React.createElement("div", {
      className: "swiper-wrapper"
    }, this.props.children), React.createElement("div", {
      className: "swiper-pagination"
    }));
  }

}

_defineProperty(SwiperContainer, "propTypes", {
  classes: shape({
    root: string
  })
});

;
export default classify(defaultClasses)(SwiperContainer);
//# sourceMappingURL=swipercontainer.js.map