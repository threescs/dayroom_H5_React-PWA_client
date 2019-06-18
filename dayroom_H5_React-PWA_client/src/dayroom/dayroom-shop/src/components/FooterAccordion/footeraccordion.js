import React,{Component} from 'react';

import classify from 'src/classify'
import defaultClasses from "./footeraccordion.scss"
// import { Link, resourceUrl } from 'src/drivers';

import Accordion from 'src/components/Accordion'

class FooterAccordion extends Component{


  render(){
    const items = [
      {
        id:0,
        title:'company info',
        sublists:[
          {
            id:0,
            content:"<a href='javascript:;'>our story</a>",
          }
        ]
      },
      {
        id:1,
        title:'customer care',
        sublists:[
          {
            id:0,
            content:"<a href='javascript:;'>contact us</a>",
            url:'javascript:;'
          },
          {
            id:1,
            content:"<a href='javascript:;'>payment method</a>",
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
            content:"<a href='javascript:;'>FQAs</a>",
            url:'javascript:;'
          },
          {
            id:1,
            content:"<a href='javascript:;'>Shipping Info</a>",
            url:'javascript:;'
          },
          {
            id:2,
            content:"<a href='javascript:;'>Return</a>",
            url:'javascript:;'
          },
          {
            id:3,
            content:"<a href='javascript:;'>Sitemap</a>",
          }
        ]
      },
      {
        id:3,
        title:'Term & Conditions',
        sublists:[
          {
            id:0,
            content:"<a href='javascript:;'>Terms & Conditions</a>",
          },
          {
            id:1,
            content:"<a href='javascript:;'>Privacy & Scurity policy</a>",
          }
          // <a href='javascript:;'></a>
        ]
      }
    ];
    return (
      <Accordion items={items}></Accordion>
    )
  }
}

export default classify(defaultClasses)(FooterAccordion)