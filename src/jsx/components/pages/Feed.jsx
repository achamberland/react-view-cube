var Header   = require('./Header.jsx');
var NavArrows= require('./NavArrows.jsx');
var FeedData = require('../../../common/FeedData.js'); 

var Feed = React.createClass({
  render: function() {
    var articles = FeedData.map(function(article, i){
      return <View.Feed.Article 
      article={article} 
      key={i} 
      />
    });

    return (
      <section className={this.props['data-viewid']}> 
        <Header 
          currentView={this.props['data-viewid']} 
          clickAction={this.props.clickAction}
        />

        <section>
          {articles}
          'Feed'
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
  },
});


Feed.Article = React.createClass({
  render: function(){
    return (
      <article>
      <h2>{this.props.article.title}</h2>
      <img src={this.props.article.imageUrl} />
      <p> {this.props.article.excerpt} </p>
      </article>
    )
  }
});

module.exports = Feed;