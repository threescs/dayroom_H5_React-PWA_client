import React,{Component} from 'react';

import classify from 'src/classify'
import defaultClasses from "./footeraccordion.scss"
// import { Link, resourceUrl } from 'src/drivers';

import Accordion from 'src/components/Accordion'

class FooterAccordion extends Component{

  render(){
    const data = [
      {
        id:0,
        title:'company info',
        sublists:[
          {
            id:0,
            title:'our story',
            url:'javascript:;'
          }
        ]
      },
      {
        id:1,
        title:'customer care',
        sublists:[
          {
            id:0,
            title:'contact us',
            url:'javascript:;'
          },
          {
            id:1,
            title:'payment method',
            url:'javascript:;'
          }
        ]
      },
      {
        id:2,
        title:'Help Support',
        sublists:[
          {
            id:0,
            title:'FQAs',
            url:'javascript:;'
          },
          {
            id:1,
            title:'Shipping Info',
            url:'javascript:;'
          },
          {
            id:2,
            title:'Return',
            url:'javascript:;'
          },
          {
            id:3,
            title:'Sitemap',
            url:'javascript:;'
          }
        ]
      },
      {
        id:3,
        title:'Term & Conditions',
        sublists:[
          {
            id:0,
            title:'Terms & Conditions',
            url:'javascript:;'
          },
          {
            id:1,
            title:'Privacy & Scurity policy',
            url:'javascript:;'
          }
        ]
      }
    ];
    return (
      <Accordion items={data}>
      </Accordion>
    )
  }
}

export default classify(defaultClasses)(FooterAccordion)