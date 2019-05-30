import React,{ Component } from 'react';
import {shape,string,node} from 'prop-types';

import classify from 'src/classify';
import defaultClasses from './swiperslide.scss';


class SwiperSlide extends Component{
  static propTypes = {
    classes:shape({
      root:string
    }),
    children: node
  }

  render(){
    const { children } = this.props
    return (
      <div className="swiper-slide item">{children}</div>
    )
  }
}

export default classify(defaultClasses)(SwiperSlide)