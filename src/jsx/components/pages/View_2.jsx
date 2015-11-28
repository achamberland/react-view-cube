var Header     = require('./Header.jsx');
var NavArrows  = require('./NavArrows.jsx');
var NeatList   = require('./NeatList.jsx');

var View_2 = React.createClass({

  frameworkData: [
  ],

  render: function(){
    return (
      //Extra- spin logo around on hover

      <section className={this.props['data-viewid']}>

        <Header 
          currentView={this.props['data-viewid']} 
          clickAction={this.props.clickAction}
        />
      
        <section>
          <NeatList data={this.frameworkData} />
        </section>

        <NavArrows views={this.props.views} 
          viewFlow={this.props.viewFlow} 
          currentView={this.props['data-viewid']} 
          viewIndex={this.props.viewIndex}
          clickAction={this.props.clickAction} 
        />
      </section>
    )
  }
});

module.exports = View_2;