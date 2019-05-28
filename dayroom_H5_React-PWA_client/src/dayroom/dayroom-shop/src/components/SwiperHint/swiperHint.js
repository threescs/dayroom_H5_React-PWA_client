import React, { Component } from 'react';
import { shape,string } from 'prop-types';
import classify from 'parentSrc/classify';
import defaultClasses from './swiperHint.scss';
import SwiperContainer from 'src/components/SwiperContainer'
import SwiperSlide from "src/components/SwiperSlide";
import data from "./mockData";

class SwiperProduct extends Component {
  static propTypes = {
    classes:shape({
      box:string,
      t: string,
      b: string,
      body: string,
    })
  }

  render(){
    const settings = {
      thumbs:false
    };
    const { classes } = this.props;
    return (
        <div className="bottom-banner">
        <SwiperContainer className="swiper-gallery" settings={settings} >
            {
              data.map((item)=>(
                <SwiperSlide key={item.label}>
                  <div className={classes.box}>
                    <span>{item.heder_t}</span>
                    <span>{item.heder_b}</span>
                  </div>
                  <p className={classes.body}>{item.body}</p>
                </SwiperSlide>
              ))
            }
        </SwiperContainer>
      </div>
    )
  }
}

export default classify(defaultClasses)(SwiperProduct);