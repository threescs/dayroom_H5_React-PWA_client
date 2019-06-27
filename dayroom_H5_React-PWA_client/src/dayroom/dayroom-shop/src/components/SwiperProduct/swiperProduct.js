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
import { loadingIndicator } from 'src/components/LoadingIndicator';

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
      pagination: true
    };
    // const { id } = this.props;
    return (
            <Query
                query={categoryQuery}
                variables={{
                    id: 54,
                    onServer: false,
                    pageSize: 10,
                    currentPage: 1
                }}
            >
                {({ loading, data, error }) => {
                  if (error) return <div>Data Fetch Error</div>
                  if (loading) return (loadingIndicator)
                  const produtItem = (data && data.category) ? data.category.products : null;
                  const categoryTitle = (data && data.category) ? data.category.name : null;
                  return (
                    <div className="product-banner">
                      <div className="product-title">{categoryTitle}</div>
                      <SwiperContainer className="swiper-gallery" settings={settings} >
                          {
                            produtItem.items.map(item => (
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