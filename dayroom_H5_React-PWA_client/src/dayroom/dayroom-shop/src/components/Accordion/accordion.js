import React, {Component} from 'react'
import classify from 'src/classify'
import defaultClasses from './accordion.scss'
import { returnStatement } from '@babel/types';

class Accordion extends Component{
  constructor(props){
    super(props);
    this.state = {
      expand:false,
      regTitle:/accordion-item__title/,
      regCollapsed:/is-collapsed/,
    }
    this.onClickHandle = this.onClickHandle.bind(this);
  }



  componentDidMount(){
  }

  onClickHandle(event){

      event.currentTarget.isCollapsed =  !event.currentTarget.isCollapsed;

      // this.refs.accordionContainer.children
      if(event.currentTarget.isCollapsed){
        event.currentTarget.parentNode.className = event.currentTarget.parentNode.className.replace(/\s*is-collapsed\s*/,'');

        for(let i =0,len = this.refs.accordionContainer.children.length; i<len; i++ ){
          if(this.refs.accordionContainer.children[i] !== event.currentTarget.parentNode ){
            console.log(this.refs.accordionContainer.children[i]);
            if(!this.state.regCollapsed.test(this.refs.accordionContainer.children[i].className)){
              this.refs.accordionContainer.children[i].className = this.refs.accordionContainer.children[i].className+' is-collapsed'
            }
          }
        }
      } else {
        event.currentTarget.parentNode.className = event.currentTarget.parentNode.className+' is-collapsed'

      }

  }

  render(){
    const { items } = this.props;

    return (
      <div className="accordion-container" ref="accordionContainer">
      {
        items.map( (item) => (
          <div className={this.state.expand?'':'is-collapsed'+ ` accordion-item`} key={item.id} >
            <h4 onClick={this.onClickHandle} className="accordion-item__title">{item.title} <span className="icon icon-arrow__down"></span></h4>
            <AccordionContent lists={item.sublists} ref="AccordionContent" />
          </div>
        ))
      }
      </div>
    )
  }
}


class AccordionContent extends Component{
  render(){
    const { lists } = this.props;
    return (
      <ul className="accordion-content__list">
        {
          lists.map((item)=>(
            <li className="accordion-content__item" key={item.id}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))
        }
      </ul>
    )
  }
}

export default classify(defaultClasses)(Accordion)