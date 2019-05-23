import React, { Component } from 'react';
import {shape,string} from 'prop-types';

import classify from 'parentSrc/classify';
import defaultClasses from './topbanner.scss';
import SwiperContainer from 'src/components/SwiperContainer'
import SwiperSlide from "src/components/SwiperSlide";

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
    const { classes,items} = this.props;
    const data = [
      {
        img:0,
        text:'slide 0'
      },
      {
        img:1,
        text:'slide 1',
      },
      {
        img:2,
        text:'slide 2',
      },
      {
        img:3,
        text:'slide 3',
      },
      {
        img:4,
        text:'slide 4'
      }
    ]
    console.log(data);
    return (
      <div className="top-banner">
        <SwiperContainer className="swiper-gallery" settings={settings} >
          <div className="swiper-wrapper">
            {
              data.map((item)=>(
                <SwiperSlide key={item.id}>
                  <p>{item.img}</p>
                </SwiperSlide>
              ))
            }
          </div>
          <div className="swiper-wrapper">
            {
              data.map((item)=>(
                <SwiperSlide key={item.id}>
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