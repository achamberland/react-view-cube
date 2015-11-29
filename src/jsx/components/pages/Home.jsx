var Home = React.createClass({
  render: function() {
    return ( 
      <section className="face-content home-content">
      	<h2 className="face__heading">Cube 3D Transition Demo </h2>
      	<p  className="face__paragraph">Demo of a website using&nbsp;
          <a href="https://github.com/achamberland/react-view-cube">react-view-cube</a> 
          &nbsp;for navigation.
      	</p>
      	<p className="face__paragraph">Navigate anywhere to see the effect. (Arrow keys work too) </p>
      </section>
    );
  }
});

module.exports = Home;