import React, { Component } from 'react';
import { shape,string } from 'prop-types';
import classify from 'parentSrc/classify';
import defaultClasses from './topbanner.scss';
import SwiperContainer from 'src/components/SwiperContainer'
import SwiperSlide from "src/components/SwiperSlide";
import data from "./mockData";

class TopBanner extends Component {
  static propTypes = {
    classes:shape({
      root:string
    })
  }

  render(){
    const settings = {
      thumbs:true
    };

    return (
      <div className="top-banner">
        <SwiperContainer className="swiper-gallery" settings={settings} >
          <div className="swiper-wrapper">
            {
              data.map((item)=>(
                <SwiperSlide key={item.img}>
                  <img src={item.src} alt=""/>
                  <p>{item.img}</p>
                </SwiperSlide>
              ))
            }
          </div>
          <div className="swiper-wrapper">
            {
              data.map((item)=>(
                <SwiperSlide key={item.text}>
                  <img src={item.src} alt=""/>
                  <p>{item.text}</p>
                </SwiperSlide>
              ))
            }
          </div>
        </SwiperContainer>
      </div>
    )
  }
}

export default classify(defaultClasses)(TopBanner);