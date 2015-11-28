var CubeSides = React.createClass({
  render: function(){
    return (
      <div className='cube'>
      <div className='face front'>  {this.props.front}</div>
      <div className='face left'>   {this.props.left} </div>
      <div className='face right'>  {this.props.Right}</div>
      <div className='face back'>   {this.props.back} </div>
      <div className='face top'>    {this.props.top}  </div>
      <div className='face bottom'> {this.props.bottom}</div>
      </div>
    )
  }
});

module.exports = CubeSides; 