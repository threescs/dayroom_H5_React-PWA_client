import React, {Component } from 'react'
import {string} from 'prop-types'

import classify from 'src/classify'
import defaultClasses from './accordion.scss'

class Accordion extends Component {
  static propTypes = {
    classes:{
      root:string
    }
  }

  render(){
    renturn(
      <div className="accordion-container">

      </div>
    )
  }
}

export default classify(defaultClasses)(Accordion)