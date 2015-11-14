
/*
//var FormalityMenu = React.createClass({

  getTones: function(){
    return ['formal','neutral','casual']
  },

  options: [
    {
      name: 'formal',
      displaySets: [{neutral: 'Neutral'}, {neutral: 'Way less fancy'}]
    },
    {
      name: 'neutral',
      displaySets: [{formal: 'formal'}, {casual: 'casual'}]
    },
    {
      name: 'casual',
      displaySets: [{formal: 'I want to go full monocle'}, {neutral: 'Normal (better font plz)'}]
    }
  ],

  render: function(){
    var toneSet = {};
    this.options.forEach( function(option, i) {
      if (option.name === this.props.tone)
        toneSet = option;
    }.bind(this) );
    console.log(toneSet, this.props.tone);
    var buttons = toneSet.displaySets.map(function(set, i, displaySets){
      var name = Object.keys(set)[0];
      return (
        <button onClick={this.props.chooseToneEvent} value={name} key={i}>
        {set[name]}
        </button>
      )
    }.bind(this));

    return (
      <div className='tone-menu'>
      {buttons}
      </div>
    )
  }
});
*/