import React, { Component } from 'react';
import {shape,string} from 'prop-types';
import Swiper from 'swiper'

import classify from 'src/classify'
import defaultClasses from './swipercontainer.scss'

class SwiperContainer extends Component{

  static propTypes = {
    classes:shape({
      root:string
    })
  };

  componentDidMount(){

    const { settings } = this.props;
    if (settings && settings.thumbs){
      var topBannerPicSwiper = new Swiper(this.refs.container,{
        loop:true,
        loopedSlides: settings.loopedSlides || 1,
        pagination: settings.pagination?  {
            el:'.swiper-pagination',
            clickable:true
          }:{},
        // pagination:{
        //   el:'.swiper-pagination',
        //   clickable:true
        // },
        thumbs:{
          swiper:{
            el:this.refs.thumbs,
            slidesPerView: settings.slidesPerView || "auto",
            loop:true,
            loopedSlides: settings.loopedSlides || 1,
            effect: settings.effect || 'slide',
            watchSlidesVisibility: settings.watchSlidesVisibility || false,
            watchSlidesProgress: settings.watchSlidesProgress || false,
            freeMode: settings.freeMode || false,
          }
        }
      })
    }else{
      var topBannerPicSwiper = new Swiper(this.refs.container,{
        slidesPerView: settings.slidesPerView || "auto",
        loop:true,
        watchSlidesVisibility: settings.watchSlidesVisibility || false,
        watchSlidesProgress: settings.watchSlidesProgress || false,
        pagination: settings.pagination?  {
          el:'.swiper-pagination',
          clickable:true
        }:{},
        // {
        //   el:'.swiper-pagination',
        //   clickable:true
        // }
        slidesPerGroup: settings.slidesPerGroup || 1,
        spaceBetween : settings.spaceBetween || 0
      })
    }
  }

  render(){
    const { settings, children } = this.props;
    if (settings.thumbs){
      return (
        <React.Fragment>
          <div className="swiper-container swiper-gallery" ref="container">
              {children[0]}
            <div className="swiper-pagination"></div>
          </div>
          <div className="swiper-container swiper-thumbs" ref="thumbs">
              {children[1]}
          </div>
      </React.Fragment>
      )
    }

    return (
      <div className="swiper-container swiper-gallery" ref="container">
            <div className="swiper-wrapper">
              {children}
            </div>
            <div className="swiper-pagination"></div>
          </div>
    )
  }
};

export default classify(defaultClasses)(SwiperContainer)