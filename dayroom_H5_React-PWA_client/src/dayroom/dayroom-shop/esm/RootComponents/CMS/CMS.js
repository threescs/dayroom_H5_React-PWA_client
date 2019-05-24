import React, { Component } from 'react';
import CategoryList from "../../components/CategoryList";
import TopBanner from "../../components/TopBanner";
import EntranceList from "../../components/EntranceList";
export default class CMS extends Component {
  render() {
    return React.createElement("div", null, React.createElement(TopBanner, null), React.createElement(CategoryList, {
      title: "Shop by categoryf",
      id: 2
    }), React.createElement(EntranceList, null));
  }

}
//# sourceMappingURL=CMS.js.map