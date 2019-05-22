function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { string, shape } from 'prop-types';
import classify from 'src/classify';
import defaultClasses from "./entranceList.css";
import EntranceItem from "./entranceItem";
import blog from "./blog-home-pc.png";
import story from "./story-home-pc.png";

class EntranceList extends Component {
  render() {
    const mapEntranceData = [{
      text: 'Bright ideas for every room and every moment.',
      href: 'blog.html',
      hrefName: 'discover',
      src: blog
    }, {
      text: 'Factory-direct means you get the best stuff first, for way less.',
      href: 'story.html',
      hrefName: 'discover',
      src: story
    }];
    const mapEntranceList = mapEntranceData.map((item, index) => {
      return React.createElement(EntranceItem, {
        items: item,
        key: index
      });
    });
    const {
      classes
    } = this.props;
    return React.createElement("div", {
      className: classes.entranceBox
    }, mapEntranceList);
  }

}

_defineProperty(EntranceList, "propTypes", {
  title: string,
  classes: shape({
    root: string
  })
});

export default classify(defaultClasses)(EntranceList);
//# sourceMappingURL=entranceList.js.map