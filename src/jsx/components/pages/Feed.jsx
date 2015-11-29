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
      <section className="face-content"> 
          {articles}
          'Feed'
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