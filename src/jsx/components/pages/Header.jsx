var Header = React.createClass({
  getMenuClass: function(){ 
    return this.props.currentView !== 'Menu' ? 'fa-bars' : 'fa-close';
  },
  getContactClass: function(){
    return this.props.currentView !== 'Contact' ? 'fa-envelope' : 'fa-close';
  },
  
  render: function(){
    return (
      <header>
        <a className='MenuIcon' onClick={(e) => this.props.clickAction(e, 4) }>
          <i className={'fa ' + this.getMenuClass()} />
        </a>
        <h1>{this.props.currentView.replace(/_|-/g, ' ')}</h1>
        <a className='contactIcon' onClick={(e) => this.props.clickAction(e, 5)}>
          <i className={'fa ' + this.getContactClass()} />
        </a>
      </header>
    )
  }
});

module.exports = Header;