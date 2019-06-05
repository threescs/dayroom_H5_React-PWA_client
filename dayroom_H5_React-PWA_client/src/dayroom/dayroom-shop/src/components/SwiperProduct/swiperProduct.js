import React, { Component } from 'react';
import { shape,string } from 'prop-types';
import classify from 'parentSrc/classify';
import defaultClasses from './swiperProduct.scss';
import { connect, Query } from 'src/drivers';
import { setCurrentPage, setPrevPageTotal } from 'src/actions/catalog';
import SwiperContainer from 'src/components/SwiperContainer'
import SwiperSlide from "src/components/SwiperSlide";
import GalleryItem from "src/components/Gallery/item";
import categoryQuery from 'src/queries/getCategory.graphql';
class SwiperProduct extends Component {
  mapGalleryItem(data) {
      data.media_gallery_entries.forEach((item) => {
          if(item.types.includes('small_image')) {
              return data.small_image.url = item.file;
          }
      })
    const { small_image } = data;
    return {
        ...data,
        small_image:
            typeof small_image === 'object' ? small_image.url : small_image
    };
  }

  render(){
    const settings = {
      thumbs:false,
      slidesPerGroup: 2,
    };
    const { id } = this.props;
    return (
            <Query
                query={categoryQuery}
                variables={{
                    id: Number(id),
                    onServer: false,
                    pageSize: 6,
                    currentPage: 1
                }}
            >
                {({ data }) => {
                  const produtItem = data ? data.category.products.items : null;
                  const categoryTitle = data ? data.category.name : null;
                  return (
                    <div className="product-banner">
                      <div className="product-title">{categoryTitle}</div>
                      <SwiperContainer className="swiper-gallery" settings={settings} >
                          {
                            produtItem.map(item => (
                              <SwiperSlide key={item.id}>
                                <GalleryItem item={this.mapGalleryItem(item)} />
                              </SwiperSlide>
                            ))
                          }
                      </SwiperContainer>
                    </div>
                      )
                    }}
           </Query>
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