import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo.png'
import { animated, config, Spring, Trail, Transition } from 'react-spring/renderprops'
import _ from "lodash";

export const ACTIVITY_DROPDOWN = [
  {
    "en": { "title": "Meetings", "url": "/en/meetings" },
    "hr": { "title": "Sastanci", "url": "/sastanci" }
  },
  {
    "en": { "title": "Lectures", "url": "/en/lectures" },
    "hr": { "title": "Predavanja", "url": "/predavanja" }
  },
  {
    "en": { "title": "Conferences", "url": "/en/conferences" },
    "hr": { "title": "Konferencije", "url": "/konferencije" }
  },
  {
    "en": { "title": "Workshops", "url": "/en/workshops" },
    "hr": { "title": "Radionice", "url": "/radionice" }
  },
  {
    "en": { "title": "All activities", "url": "/en/activities" },
    "hr": { "title": "Sve aktivnosti", "url": "/aktivnosti" }
  },
]

export const PAGES = [
  {
    "en": { "title": "About", "url": "/en/about" },
    "hr": { "title": "O društvu", "url": "/o-društvu" }
  },
  {
    "en": { "title": "Membership", "url": "/en/membership" },
    "hr": { "title": "Članstvo", "url": "/članstvo" }
  },
  {
    "en": { "title": "Activities", "url": "/en/activities" },
    "hr": { "title": "Aktivnosti", "url": "/aktivnosti" },
    "dropdown": ACTIVITY_DROPDOWN
  },
  {
    "en": { "title": "Contact", "url": "/en/contact" },
    "hr": { "title": "Kontakt", "url": "/kontakt" }
  }
]

const OTHER_PAGES = [
  {
    "en": { "title": "Membership", "url": "/en/membership/application" },
    "hr": { "title": "Članstvo", "url": "/članstvo/prijava" }
  },
]

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      currentPath: '',
      isStickyNavbar: false,
      loaded: false,
      navBarActiveClass: '',
      showDropdown: false
    }
  }

  componentDidMount() {
    setTimeout(() => { this.setState({ loaded: true }) }, 300);
    this.setState({ currentPath: window.location.pathname })
    const scrollFunc = _.debounce(this.setSticky, 120)
    window.addEventListener('scroll', scrollFunc)
  }

  setSticky = () => {
    this.setState({ 
      isStickyNavbar: (window.scrollY > 900) ? true : false,
    })
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  getDropdown = (dropdown, lang) => {
    return (
      <Spring
        native
        config={config.gentle}
        from={{
          opacity: this.state.showDropdown ? 0 : 1,
          transform: this.state.showDropdown ? 'translateY(-20%)' : 'translateY(0%)'
        }}
        to={{
          opacity: this.state.showDropdown ? 1 : 0,
          transform: this.state.showDropdown ? 'translateY(0%)' : 'translateY(-20%)'
        }}
      >
      {props => 
      <animated.div style={props} className={`${this.state.loaded ? "" : "hidden"} overflow-hidden items-center m-auto text-md text-white absolute rounded-lg shadow bg-gray-600 -mt-1 -ml-1 p-4 w-auto`} >
        {dropdown.map(subpage => (
          <Link
            className={`px-2 py-2 block ${this.isLinkHighlighted(subpage[lang]) ? "font-bold" : ""}`}
            to={subpage[lang].url}
          >
            {subpage[lang].title}
          </Link>
        ))}
      </animated.div>
      }
      </Spring>
    )
  }

  getLangLink = (btn) => {
    const currentLang = this.state.currentPath.includes("/en") ? "en" : "hr";
    const otherLang = currentLang === "en" ? "hr" : "en";
    const currentPage = this.state.currentPath.length > 1 && this.state.currentPath.slice(-1) === "/" ? this.state.currentPath.slice(0, -1) : this.state.currentPath;
    const matchPage = PAGES.concat(ACTIVITY_DROPDOWN).concat(OTHER_PAGES).filter(page => encodeURIComponent(page[currentLang]["url"]).replace(/%2F/g, '/') === currentPage);
    let link = matchPage.length > 0 ? matchPage[0][otherLang]["url"] : currentPage.replace(`/${currentLang}/`, `/${otherLang}/`);
    if (this.state.currentPath === "/")
      link = "/en"
    else if (this.state.currentPath === "/en")
      link = "/"

    return (
      <Link
          className={btn}
          to={link}
        >
          {otherLang.toUpperCase()}
      </Link>
    )
  }

  getNav = (btnColor, logoPadding, wrapperPadding) => {
    const background = this.props.background;
    const btn = `${btnColor} transition duration-300 ease-in-out transform hover:scale-110 text-2xl tracking-wider flex-no-grow flex-no-shrink relative p-4 leading-normal no-underline flex items-center hover:bg-grey-dark`;
    const btnSm = `px-4 py-3`;
    const lang = this.props.lang;

    return (
      <React.Fragment>
        <div className="flex flex-no-shrink items-stretch h-10 lg:h-12">
          <Link
            to={`${lang === 'hr' ? '/' : '/en'}`}
            className={`flex-no-grow flex-no-shrink relative ${logoPadding}`}
            title="HDIR Logo"
          >
            <img src={logo} alt="HDIR" className="w-24" />
          </Link>
        </div>
        <div className={`hidden ${wrapperPadding} lg:flex lg:items-stretch lg:flex-no-shrink lg:flex-grow`}>
          <div className="lg:flex lg:items-stretch lg:justify-end ml-auto">
            {this.getLangLink(btn)}
            {PAGES.map(page => (
              <div
                onMouseOver={() => page.dropdown && this.setState({ showDropdown: true })}
                onMouseOut={() => page.dropdown && this.setState({ showDropdown: false })}
              >
                <Link
                  className={`${btn} ${this.isLinkHighlighted(page[lang]) ? "font-semibold" : ""}`}
                  to={page[lang].url}
                >
                  {page[lang].title}
                </Link>
                {page.dropdown && this.getDropdown(page.dropdown, lang)}
              </div>
            ))}
          </div>
        </div>
        <div className="lg:hidden">
          <div className="cursor-pointer text-right text-white flex justify-end" onClick={() => this.toggleHamburger()}>
            <p className={`${background ? "text-gray-600" : ""} text-xl`} style={{ transform: "rotate(90deg)" }}>|||</p>
          </div>
          <div
            className={`${this.state.active ? "flex justify-end absolute mt-4" : "hidden"}`}
            style={{ right: "1.5rem" }}
          >
            <div className="flex flex-col rounded-lg shadow text-white bg-gray-600 p-2 items-stretch text-xl">
              {this.getLangLink(btnSm)}
              {PAGES.map(page => (
                <React.Fragment>
                  <Link className={`${btnSm} ${this.isLinkHighlighted(page[lang]) ? "font-bold" : ""}`} to={page[lang].url}>{page[lang].title}</Link>
                  {page.dropdown && 
                    <React.Fragment>
                      {page.dropdown.map(subpage => (
                        <Link className={`${btnSm} ${this.isLinkHighlighted(subpage[lang]) ? "font-bold" : ""}`} to={subpage[lang].url}>
                          {subpage[lang].title}
                        </Link>
                      ))}
                    </React.Fragment>
                  }
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  isLinkHighlighted(page) {
    const currentPath = this.state.currentPath.split("/").slice(-1)[0];
    const link = encodeURIComponent(page.url.split("/").slice(-1)[0]);

    if (page.title === "EN" || page.title === "HR") {
      return false
    }
    else if (currentPath === link) {
      return true
    }
    
    return false
  }

  render() {
    return (
      <React.Fragment>
        <nav className="absolute px-6 pb-10 lg:pb-0 md:px-8 z-50 select-none bg-grey lg:flex lg:items-stretch w-full">
          {this.getNav("text-white", "py-6", "py-6")}
        </nav>

        <Transition
          config={config.gentle}
          items={this.state.isStickyNavbar}
          from={{ opacity: 0, transform: 'translateY(-100%)' }}
          enter={{ opacity: 1, transform: 'translateY(0%)' }}
          leave={{ opacity: 0, transform: 'translateY(-100%)' }}>
            {show => show && (props => 
          <nav style={props} className="hidden lg:fixed lg:shadow bg-white text-gray-600 px-6 pb-10 lg:pb-0 md:px-8 z-50 select-none bg-grey lg:flex lg:items-stretch w-full">
            {this.getNav("text-gray-600", "py-3", "py-2")}
          </nav>
        )}
        </Transition>
      </React.Fragment>
    )
  }
}

export default Navbar
