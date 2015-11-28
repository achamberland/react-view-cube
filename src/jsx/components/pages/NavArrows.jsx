
var NavArrows = React.createClass({
  getParentIndex: function(){
    return this.props.viewFlow.indexOf(this.props.currentView);
  },
  getActiveIndex: function(){
    return this.props.viewFlow.indexOf(this.props.views.active)
  },
  getMovement: function(){
    if      (this.getParentIndex() + 1 === this.getActiveIndex() ) {
      return 'moving-right';
    }
    else if (this.getParentIndex() - 1 === this.getActiveIndex() ) {
      return 'moving-left';
    }
    else {
      return '';
    }
  },
  getNext: function(){
    var index = this.getParentIndex() + 1;
    return (index <= this.props.viewFlow.length - 1) ? index : 0;
  },
  getPrev: function(){
    var index = this.getParentIndex() - 1;
    return (index >= 0) ? index : this.props.viewFlow.length -1;
  },

  getCubeFace: function(){
    var activeViewIndex = this.props.viewFlow.indexOf(this.props.views.active); 

    if      (this.props.viewIndex == activeViewIndex + 1) return 'right-face';
    else if (this.props.viewIndex == activeViewIndex - 1) return 'left-face';
    else return ''; 
  },

  render: function(){ 
    var prev = this.getPrev(),
        next = this.getNext(),
        cubeFace = this.getCubeFace();

    return (
      <div className={this.getMovement()}>
        <div data-viewid={prev} onClick={function(e){this.props.clickAction(e, prev, 'prev')}.bind(this) } className={'arrow-circle arrow-circle--prev ' + cubeFace}>
          <i className='fa fa-2x fa-arrow-left'></i>
        </div>
        <div data-viewid={next} onClick={function(e){this.props.clickAction(e, next, 'next')}.bind(this) } className={'arrow-circle arrow-circle--next ' + cubeFace}>
          <i className='fa fa-2x fa-arrow-right'></i>
        </div>
      </div>
    );
  }
});

module.exports = NavArrows;
