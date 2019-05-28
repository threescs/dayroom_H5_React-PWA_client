import React,{Component} from 'react';
import classify from 'src/classify'
import defaultClasses from "./footeraccordion.scss"

import { Link, resourceUrl } from 'src/drivers';

import Accordion from 'src/components/Accordion'

class FooterAccordion extends Component{

  render(){
    const data = [
      {
        id:0,
        title:'info',
        sublists:[
          {
            id:0,
            title:'info 1',
            url:'javascript:;'
          },
          {
            id:1,
            title:'info 2',
            url:'javascript:;'
          },
          {
            id:2,
            title:'info 3',
            url:'javascript:;'
          },
          {
            id:3,
            title:'info 4',
            url:'javascript:;'
          }
        ]
      },
      {
        id:1,
        title:'about',
        sublists:[
          {
            id:0,
            title:'about 1',
            url:'javascript:;'
          },
          {
            id:1,
            title:'about 2',
            url:'javascript:;'
          },
          {
            id:2,
            title:'about 3',
            url:'javascript:;'
          },
          {
            id:3,
            title:'about 4',
            url:'javascript:;'
          }
        ]
      },
      {
        id:2,
        title:'bar',
        sublists:[
          {
            id:0,
            title:'bar 1',
            url:'javascript:;'
          },
          {
            id:1,
            title:'bar 2',
            url:'javascript:;'
          },
          {
            id:2,
            title:'bar 3',
            url:'javascript:;'
          },
          {
            id:3,
            title:'bar 4',
            url:'javascript:;'
          }
        ]
      }
    ];
    return (
      <Accordion  items={data}>
      </Accordion>
    )
  }
}

export default classify(defaultClasses)(FooterAccordion)