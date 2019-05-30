import React, { Component } from 'react';
// import { string, shape } from 'prop-types';
//  resourceUrl
import { Link } from 'src/drivers';
import classify from 'src/classify'
import defaultClasses from './recommend.scss';
import SwiperContainer from 'src/components/SwiperContainer'
import SwiperSlide from 'src/components/SwiperSlide'
import data from './mockData'
import Icon from 'parentComponents/Icon';
import ThumbsUp from 'react-feather/dist/icons/thumbs-up';
import Instagram from 'react-feather/dist/icons/instagram';
import Youtube from 'react-feather/dist/icons/youtube';
import Play from 'react-feather/dist/icons/play';
import Close from 'react-feather/dist/icons/x';




class Recommend extends Component {

  constructor(props){
    super(props);
    this.state = {
      socialLink: '',
      socialAvatar: '',
      socialCover: '',
      productLink: '',
      productPic: '',
      platform: '',
      videoLink:''

    };

    this.onClickShowPopup = this.onClickShowPopup.bind(this);
    this.onClickHidePopup = this.onClickHidePopup.bind(this);
  };

  onClickShowPopup( event, item ) {
    event.preventDefault();

    this.setState({
      socialLink: item.socialCelebrity.socialLinkUrl,
      socialAvatar: item.socialCelebrity.avatar,
      socialCover: item.socialCelebrity.popupCover,
      productLink: item.product.url,
      productPic: item.product.img,
      platform: item.platform,
      videoLink: item.socialCelebrity.videoUrl
    })

    this.refs.socialPopup.style.display="block";
  };

  onClickHidePopup( event ) {
    event.preventDefault();
    this.refs.socialPopup.style.display="none";

  }

  render() {

    const settings = {
      thumbs: false
    }



    return (

      <section className="social-media-container">
        <h2 className="social-media__title">{data.headerTitle}</h2>

        <SwiperContainer settings={settings}>
          {
            data.list.map((item)=>(
              <SwiperSlide key={item.product.url}>
                <div className="social-media__main" onClick={()=>this.onClickShowPopup(event,item)}>
                  <img src={item.socialCelebrity.cover} alt="" />
                  <span className="icon-mark icon-mark__video">
                    { item.platform ==="youtube" ? <Icon src={Youtube} /> : <Icon src={Instagram} />}
                  </span>
                  {
                    item.platform ==="youtube" && <span className="icon icon-play"><Icon src={Play}></Icon></span>
                  }
                  <div className="social-celebrity__info">
                    <span className="info__name">{item.socialCelebrity.name}</span>
                    <span className="info__fans">
                      <Icon src={ThumbsUp}></Icon>
                      <span className="info__fans-number">{item.socialCelebrity.fansNumber}</span>
                    </span>
                  </div>
                </div>
              </SwiperSlide>
              ))
          }
        </SwiperContainer>
        <div className="social-media__popup" ref="socialPopup">
          <div className={this.state.platform+'-social-popup-wrapper' +` social-popup-wrapper`}>
            <span  className="social-popup__close" onClick={()=>this.onClickHidePopup(event)}>
              <Icon src={Close}/>
            </span>
            <div className="social-popup__main">
              <div className="social-video__content">
                {
                  this.state.platform ==="youtube" && <iframe title="popup_video" className="popup__video-content" width='100%' height="auto" src={this.state.videoLink} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                }
              </div>
              <img src={this.state.socialCover} alt="" className="popup-background"/>
              <Link to={this.state.socialLink} className="social-link">
                <img src={this.state.socialAvatar} alt="" />
              </Link>
              <Link to={this.state.productLink} className="procut-link">
                <img src={this.state.productPic} alt="" />
              </Link>

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default classify(defaultClasses)(Recommend)