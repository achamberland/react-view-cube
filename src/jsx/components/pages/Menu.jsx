var Menu = React.createClass({
  render: function() {
    return (
      <section>
        <Menu.List clickAction={this.props.clickAction} /> 
        <h4 className='menu__deco-text1 menu__deco-text'>3D Menu!</h4>
        <h4 className='menu__deco-text2 menu__deco-text'>Whoa!</h4>
        <h4 className='menu__deco-text3 menu__deco-text'>Gimmicky!</h4>
      </section>
    )
  },
});

//This page needs each child to have its own background for the li animations
Menu.List = React.createClass({
  getInitialState: function(){
    return {
      activeView: false,
      rotation:0,
    }
  },
  
  getOptions: function(){
    return [
      {title: 'Home',    openView: 'Home'    },
      {title: 'View 1',  openView: 'View_1' },
      {title: 'View 2',  openView: 'View_2' },
      {title: 'About',   openView: 'About'   },
      {title: 'Contact', openView: 'Contact' },
    ];
  },

  handleClick: function(event){
    //this.setState({rotation: -90, activeView: event.target['data-viewid']});
    //setTimeout(function(){ console.log(event.target);
      this.props.clickAction(event);
    //}.bind(this), 1000);
  },

  render: function(){
    var listItems = this.getOptions().map( function(item, i){
     var styles = {
       transform: 'rotateY(' + this.state.rotation + 'deg)',
       transition: 'transform ' + Math.random() + 's ease'
     };

     return (
       <li className='menu__option' style={styles} data-viewid={item.openView} onClick={this.handleClick} key={i}>
        {item.title}
       </li>
     )
    }.bind(this));
    return (
     <ul className='menu'>
      {listItems}
     </ul>
    )
  }
});
/*
View.Menu.menuItem = React.createClass({
  render: function(){
    return (
    );
  }
});
*/

module.exports = Menu;