import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Menu as DefaultMenu, MenuItem, Tip } from './styled'

class Popper extends React.Component {
  componentDidMount() {
    document.addEventListener('click', e => {
      if (this.popper && !this.popper.contains(e.target)) {
        this.props.onClickOutside()
      }
    })
  }
  render() {
    const {
      isOpen,
      target,
      children,
      showTip,
      alignMenuRight,
      Menu
    } = this.props
    return (
      <Wrapper
        className="popper-wrapper"
        ref={el => {
          this.popper = el
        }}
      >
        {target}
        {showTip && isOpen && <Tip />}
        {isOpen && (
          <Menu onClick={this.props.onMenuClick} alignRight={alignMenuRight}>
            {children}
          </Menu>
        )}
      </Wrapper>
    )
  }
}

Popper.MenuItem = MenuItem
Popper.Menu = DefaultMenu

Popper.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  target: PropTypes.node.isRequired,
  showTip: PropTypes.bool,
  onMenuClick: PropTypes.func,
  onClickOutside: PropTypes.func,
  Menu: PropTypes.func
}
Popper.defaultProps = {
  showTip: false,
  onMenuClick: () => {},
  onClickOutside: () => {},
  Menu: DefaultMenu
}

export default Popper
