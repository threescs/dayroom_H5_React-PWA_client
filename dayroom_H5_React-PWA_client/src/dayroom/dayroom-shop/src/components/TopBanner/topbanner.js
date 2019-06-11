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
                  <img className="slider-img" src={item.src} alt=""/>
                </SwiperSlide>
              ))
            }
          </div>
          <div className="swiper-wrapper">
            {
              data.map((item)=>(
                <SwiperSlide key={item.text.title}>
                  <div className="title" dangerouslySetInnerHTML={{__html:item.text.title}}></div>
                  <div className="sub-title" dangerouslySetInnerHTML={{__html:item.text.subtitle}} ></div>
                  <a className="link-address" href={item.text.link.url}>{item.text.link.text}</a>
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