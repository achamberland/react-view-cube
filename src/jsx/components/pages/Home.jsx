var Header      = require('./Header.jsx');
var NavArrows   = require('./NavArrows.jsx');

var Home = React.createClass({
  render: function() {
    return ( 
      <section className={this.props['data-viewid']}>
        <Header 
          currentView={this.props['data-viewid']}
          clickAction={this.props.clickAction}
        />
        <section>
        </section>
        <NavArrows
          views={this.props.views} 
          viewFlow={this.props.viewFlow} 
          currentView={this.props['data-viewid']} 
          viewIndex={this.props.viewIndex} 
          clickAction={this.props.clickAction} 
        />
      </section>
    )
  }
});

module.exports = Home;