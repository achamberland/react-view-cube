var Header    = require('./Header.jsx');
var NeatList  = require('./NeatList.jsx');
var NavArrows = require('./NavArrows.jsx');

var View_1 = React.createClass({

  languageData:[],
  
  render: function(){
    return (
      <section className={this.props['data-viewid']}>
        <Header 
          currentView={this.props['data-viewid']} 
          clickAction={this.props.clickAction}
        />

        <section>
          <NeatList data={this.languageData} />
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

module.exports = View_1;