import React, { Component } from 'react';
import { shape,string } from 'prop-types';
import classify from 'parentSrc/classify';
import defaultClasses from './swiperProduct.scss';
import { connect, Query } from 'src/drivers';
import { setCurrentPage, setPrevPageTotal } from 'src/actions/catalog';
import SwiperContainer from 'src/components/SwiperContainer'
import SwiperSlide from "src/components/SwiperSlide";
import GalleryItem from "src/components/Gallery/item";
import data from './mockData';

class SwiperProduct extends Component {
  mapGalleryItem(item) {
    const { small_image } = item;
    return {
        ...item,
        small_image:
            typeof small_image === 'object' ? small_image.url : small_image
    };
  }
  
  render(){
    const settings = {
      thumbs:false
    };
    data.map(item => {
      item.media_gallery_entries.forEach(itm => {
          if(itm.types.includes('small_image')) {
              return item.small_image.url = itm.file;
          }
      })
    })
    return (
            // <Query
            //     query={categoryQuery}
            //     variables={{
            //         id: Number(id),
            //         onServer: false,
            //         pageSize: Number(pageSize),
            //         currentPage: Number(currentPage)
            //     }}
            // >
            //     {({ data }) => {
                  <div className="product-banner">
                  <SwiperContainer className="swiper-gallery" settings={settings} >
                      {
                        data.map((item)=>(
                          <SwiperSlide key={item.id}>
                            <GalleryItem item={this.mapGalleryItem(item)} />
                          </SwiperSlide>
                        ))
                      }
                  </SwiperContainer>
                </div>
          //           }}
          //  </Query>
    )
  }
}
// const mapStateToProps = ({ catalog }) => {
//   return {
//       currentPage: catalog.currentPage,
//       pageSize: catalog.pageSize,
//       prevPageTotal: catalog.prevPageTotal
//   };
// };
// const mapDispatchToProps = { setCurrentPage, setPrevPageTotal };
export default classify(defaultClasses)(SwiperProduct);