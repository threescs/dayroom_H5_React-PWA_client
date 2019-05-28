import React, { Component } from 'react';
import { shape,string } from 'prop-types';
import { Query } from 'src/drivers';
import classify from 'parentSrc/classify';
import defaultClasses from './swiperProduct.scss';
import SwiperContainer from 'src/components/SwiperContainer'
import SwiperSlide from "src/components/SwiperSlide";
// import data from "./mockData";
import categoryQuery from 'src/queries/getCategory.graphql';

class SwiperProduct extends Component {
  static propTypes = {
    classes:shape({
      root:string
    })
  }

  render(){
    const settings = {
      thumbs:false
    };
    const { props } = this;
    const { id, pageSize, currentPage} = props;
    return (
      <Query
          query={categoryQuery}
          variables={{
          id: Number(id),
          onServer: false,
          pageSize: Number(pageSize),
          currentPage: Number(currentPage)
          }}
      >
        {({ loading, error, data }) => {
          console.log(data);
          <div className="top-banner">
            <SwiperContainer className="swiper-gallery" settings={settings} >
                <div>111</div>
            </SwiperContainer>
          </div>
        }}
      </Query>
    )
  }
}

export default classify(defaultClasses)(SwiperProduct);