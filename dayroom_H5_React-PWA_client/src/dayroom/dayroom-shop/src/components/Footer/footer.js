import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, resourceUrl } from 'parentSrc/drivers';
import classify from 'src/classify';
import defaultClasses from './footer.css';
import Icon from 'parentComponents/Icon';
import FacebookIcon from 'react-feather/dist/icons/facebook';
import TwitterIcon from 'react-feather/dist/icons/twitter';
import InstagramIcon from 'react-feather/dist/icons/instagram';
import YoutubeIcon from 'react-feather/dist/icons/youtube';
import paypalLogo from './footer-icon-paypal.png';
import visaLogo from './footer-icon-visa.png';
import masterLogo from './footer-icon-master.png';
import amexLogo from './footer-icon-amex.png';
import discoverLogo from './footer-icon-discover.png';
class Footer extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            copyright: PropTypes.string,
            root: PropTypes.string,
            tile: PropTypes.string,
            tip: PropTypes.string,
            outer: PropTypes.string,
        })
    };

    render() {
        const payLogoList = [
            {
                label: 1,
                src: paypalLogo,
            },
            {
                label: 2,
                src: visaLogo,
            },
            {
                label: 3,
                src: masterLogo,
            },
            {
                label: 4,
                src: amexLogo,
            },
            {
                label: 5,
                src: discoverLogo,
            },
        ]
        const linkLogoList = [
            {
                label: 1,
                src:'https://www.facebook.com/dayroom',
                img: FacebookIcon
            },
            {
                label: 2,
                src:'https://twitter.com/shopdayroom',
                img: TwitterIcon
            },
            {
                label: 3,
                src:'https://www.instagram.com/dayroom.co/',
                img: InstagramIcon
            },
            {
                label: 4,
                src: 'https://www.youtube.com/channel/UCRoD5EgSLAKHdqbKuxnhMZA',
                img: YoutubeIcon
            },
        ]
        const logoListChildren = linkLogoList.map(item => (
            <li key={item.label}>
                <Link to={resourceUrl(item.src)}>
                    <Icon src={item.img} />
                </Link>
            </li>
        ))
        const payListChildren = payLogoList.map(item => (
            <li key={item.label}>
                <img src={item.src} alt="dayroom"/>
            </li>
        ))
        const { classes } = this.props;
        return (
            <footer className={classes.root}>
                <div className={classes.tile}>
                    <div className={classes.tip}>
                        <p>save 15% on your first order!</p>
                        <p>sign up and enjoy rewards</p>
                    </div>
                    <div className={classes.form}>
                        <input className={classes.int}  placeholder="Enter your email address"/>
                        <button type="submit">
                            <span>Subscribe</span>
                        </button>
                    </div>
                </div>
                <div className={classes.linklogo}>
                    <ul className={classes.outer}>
                        {logoListChildren}
                    </ul>
                </div>
                <small className={classes.copywriting}>
                    <p>12 Elsa Glade, Schofields, NSW 2762 Australia</p>
                    <p>330 S. La Brea Ave, Los Angeles, CA 90036 USA</p>
                    <p>Unit D, Swift Park, Rugby, CV21 1DZ UK</p>
                </small>
                <div className={classes.linklogo}>
                    <ul className={classes.outer}>
                        {payListChildren}
                    </ul>
                </div>
                <small className={classes.copyright}>
                    <span>Copyright ©2019, Dayroom</span>
                </small>
            </footer>
        );
    }
}

export default classify(defaultClasses)(Footer);
