import React, { Component } from 'react';
import { shape,string } from 'prop-types';
import classify from 'parentSrc/classify';
import defaultClasses from './collectionItem.scss';
import SwiperContainer from 'src/components/SwiperContainer'
import SwiperSlide from "src/components/SwiperSlide";
import LazyLoad from 'react-lazyload';
import data from "./mockData";

class CollectionItem extends Component {
  static propTypes = {
    classes:shape({
      box:string,
      img: string,
      boxFooter: string,
      footerTitle: string,
      footerBody: string,
      href: string,
    })
  }

  render(){
    const settings = {
      thumbs:false,
      pagination: true
    };
    const { classes } = this.props;
    return (
        <div className="collection-banner">
        <LazyLoad height={200} once={true}>
          <SwiperContainer className="swiper-gallery" settings={settings} >
              {
                data.map((item)=>(
                  <SwiperSlide key={item.label}>
                    <div className={classes.box}>
                      <img className={classes.img} src={item.src} alt=''/>
                      <div className={classes.boxFooter} >
                          <p className={classes.footerTitle}>{item.title}</p>
                          <div className={classes.pos}>
                              <div className={classes.footerBody}>
                                  {item.tip} <br/>
                                  {item.body}
                              </div>
                              <a className={classes.href} href="/">shop</a>
                          </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              }
          </SwiperContainer>
        </LazyLoad>
      </div>
    )
  }
}

export default classify(defaultClasses)(CollectionItem);