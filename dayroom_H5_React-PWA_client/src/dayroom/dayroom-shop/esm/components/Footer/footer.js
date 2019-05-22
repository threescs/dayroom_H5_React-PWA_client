function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, resourceUrl } from 'parentSrc/drivers';
import classify from 'src/classify';
import defaultClasses from "./footer.css";
import Icon from 'parentComponents/Icon';
import FacebookIcon from 'react-feather/dist/icons/facebook';
import TwitterIcon from 'react-feather/dist/icons/twitter';
import InstagramIcon from 'react-feather/dist/icons/instagram';
import YoutubeIcon from 'react-feather/dist/icons/youtube';
import paypalLogo from "./footer-icon-paypal.png";
import visaLogo from "./footer-icon-visa.png";
import masterLogo from "./footer-icon-master.png";
import amexLogo from "./footer-icon-amex.png";
import discoverLogo from "./footer-icon-discover.png";

class Footer extends Component {
  render() {
    const payLogoList = [{
      label: 1,
      src: paypalLogo
    }, {
      label: 2,
      src: visaLogo
    }, {
      label: 3,
      src: masterLogo
    }, {
      label: 4,
      src: amexLogo
    }, {
      label: 5,
      src: discoverLogo
    }];
    const linkLogoList = [{
      label: 1,
      src: 'https://www.facebook.com/dayroom',
      img: FacebookIcon
    }, {
      label: 2,
      src: 'https://twitter.com/shopdayroom',
      img: TwitterIcon
    }, {
      label: 3,
      src: 'https://www.instagram.com/dayroom.co/',
      img: InstagramIcon
    }, {
      label: 4,
      src: 'https://www.youtube.com/channel/UCRoD5EgSLAKHdqbKuxnhMZA',
      img: YoutubeIcon
    }];
    const logoListChildren = linkLogoList.map(item => React.createElement("li", {
      key: item.label
    }, React.createElement(Link, {
      to: resourceUrl(item.src)
    }, React.createElement(Icon, {
      src: item.img
    }))));
    const payListChildren = payLogoList.map(item => React.createElement("li", {
      key: item.label
    }, React.createElement("img", {
      src: item.src,
      alt: "dayroom"
    })));
    const {
      classes
    } = this.props;
    return React.createElement("footer", {
      className: classes.root
    }, React.createElement("div", {
      className: classes.tile
    }, React.createElement("div", {
      className: classes.tip
    }, React.createElement("p", null, "save 15% on your first order!"), React.createElement("p", null, "sign up and enjoy rewards")), React.createElement("div", {
      className: classes.form
    }, React.createElement("input", {
      className: classes.int,
      placeholder: "Enter your email address"
    }), React.createElement("button", {
      type: "submit"
    }, React.createElement("span", null, "Subscribe")))), React.createElement("div", {
      className: classes.linklogo
    }, React.createElement("ul", {
      className: classes.outer
    }, logoListChildren)), React.createElement("small", {
      className: classes.copywriting
    }, React.createElement("p", null, "12 Elsa Glade, Schofields, NSW 2762 Australia"), React.createElement("p", null, "330 S. La Brea Ave, Los Angeles, CA 90036 USA"), React.createElement("p", null, "Unit D, Swift Park, Rugby, CV21 1DZ UK")), React.createElement("div", {
      className: classes.linklogo
    }, React.createElement("ul", {
      className: classes.outer
    }, payListChildren)), React.createElement("small", {
      className: classes.copyright
    }, React.createElement("span", null, "Copyright \xA92019, Dayroom")));
  }

}

_defineProperty(Footer, "propTypes", {
  classes: PropTypes.shape({
    copyright: PropTypes.string,
    root: PropTypes.string,
    tile: PropTypes.string,
    tip: PropTypes.string,
    outer: PropTypes.string
  })
});

export default classify(defaultClasses)(Footer);
//# sourceMappingURL=footer.js.map