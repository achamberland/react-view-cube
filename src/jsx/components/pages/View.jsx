var View = React.createClass({
  render: function(){
    return <div> 'View' </div>;
  },
});

View.Home 	 = require('./Home.jsx');
View.Contact = require('./Contact.jsx');
View.Feed    = require('./Feed.jsx');
View.Menu    = require('./Menu.jsx');
View.View_1  = require('./View_1.jsx');
View.View_2  = require('./View_2.jsx');
View.About   = require('./About.jsx');

module.exports = View;