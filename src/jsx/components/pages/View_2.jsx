var NeatList   = require('./NeatList.jsx');

var View_2 = React.createClass({

  frameworkData: [
  ],

  render: function(){
    return (
      //Extra- spin logo around on hover

      <section>
        <NeatList data={this.frameworkData} />
      </section>
    )
  }
});

module.exports = View_2;