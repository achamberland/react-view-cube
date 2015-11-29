var NeatList  = require('./NeatList.jsx');

var View_1 = React.createClass({

  languageData:[],
  
  render: function(){
    return (
      <section>
        <NeatList data={this.languageData} />
      </section>
    )
  }
});

module.exports = View_1;