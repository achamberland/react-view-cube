var View = require('./pages/View.jsx');

class Page extends React.Component {

  constructor() {
    super();
    this.state = {
      views: {
        active: 'Home',
        prev: ''
      },
      customStyles: '',
      transforms: this.get3DPosition().Home,
      tone: 'neutral',
      madeFullRotation: false
    };

    this.changeViewEvent = this.changeViewEvent.bind(this);
    this.chooseToneEvent = this.chooseToneEvent.bind(this);
  }
  

  getRotationMillis() {
    return 500;
  }

  getViews(){
    return ['Home', 'View_1','View_2', 'About', 'Menu', 'Contact'];
  }
  getViewsInFlow(){
    return ['Home', 'View_1','View_2', 'About'];
  }
  getViewsOutOfFlow(){
    return ['Menu', 'Contact'];
  }
  getViewIndex(view, offset){
    var views = this.getViewsInFlow(),
        index = views.indexOf(view);
    
    console.log('index', index, views[index]);
    
    if      (index > views.length) return views[0];
    else if (index < 0) return views[this.getViewsInFlow().length - 1];
    else return view;
  }

  getStyles() {
    return {
      width: '100%',
      height: '100%',

      transition: 'transform 0.5s ease',
      transformStyle: 'preserve-3d',
      transform: 'rotateX(0deg) rotateY(0deg) translateX(50%) translateZ(0px)'
    };
  }

  get3DPosition() {
    return {
      Home: {
        rotateX: 0,
        rotateY: 0,
        translateX: '0%',
        translateY: '0%',
        translateZ: '0vw'
      },
      View_1: {
        rotateX: 0,
        rotateY: -90,
        translateX: '-50%',
        translateY: '0%',
        translateZ: '50vw'
      },
      View_2: {
        rotateX: 0,
        rotateY: -180,
        translateX: '0%',
        translateY: '0%',
        translateZ: '100vw'
      },
      About: {
        rotateX: 0,
        rotateY: -270,
        translateX: '50%',
        translateY: '0%',
        translateZ: '50vw'
      }, 
      Menu: {
        rotateX: -90,
        rotateY: 0,
        translateX: '0%',
        translateY: '50%',
        translateZ: '50vh'
      },
      Contact: {
        rotateX: 90,
        rotateY: 0,
        translateX: '0%',
        translateY: '-50%',
        translateZ: '50vh'
      }
    };
  }

  componentWillMount() {
    
  }
  componentDidMount(){
    this.handleKeyPress();
  }

  fullRotationOffset(){
    if (this.state.madeFullRotation === true) return 0;
    var flow = this.getViewsInFlow();

    if (flow.indexOf(this.state.views.active) === 0 && flow.indexOf(this.state.views.prev) === flow.length - 1) return 360;
    else if (flow.indexOf(this.state.views.active) === flow.length - 1 && flow.indexOf(this.state.views.prev) === 0) return -360;
    else return 0;
  }
  
  willMakeFullRotation(){
    if (this.state.madeFullRotation === true) return false;
    var flow = this.getViewsInFlow();
    
    if      (flow.indexOf(this.state.views.active) === 0 && flow.indexOf(this.state.views.prev) === flow.length - 1 ) return 'right';
    else if (flow.indexOf(this.state.views.active) === flow.length - 1 && flow.indexOf(this.state.views.prev) === 0 ) return 'left';
    else return false;
  }
  
  silentRotation(){
    setTimeout(function(){
      this.setState({
        customStyles: { transition: 'none' },
        madeFullRotation: true
      });
    }.bind(this), this.getRotationMillis() );  
  }

  chooseToneEvent(tone){
    this.setState({
      tone: tone.target.getAttribute('value')
    });
  }

  handleKeyPress(){
    console.log('handling');
    $(document).keyup((e) => { console.log(e.keyCode);
      if (e.keyCode === 37) { //Left arrow key
        //var prev = this.getViewIndex(this.state.views.active, -1);
        //this.changeViewEvent(e, prev);
        
        //Hack for wednesday
        $('.' + this.state.views.active + ' .arrow-circle--prev').trigger('click');
      }
      else if (e.keyCode === 38) {
        $('.MenuIcon i').eq(0).trigger('click');
      }
      else if (e.keyCode === 39) { //Right arrow key
        //var next = this.getViewsInFlow()[ this.getViewsInFlow().indexOf(this.state.views.active) + 1];
        //this.changeViewEvent(e, next);

        //Hack for wednesday
        $('.' + this.state.views.active + ' .arrow-circle--next').trigger('click');
      }
      else if (e.keyCode === 40) {
        $('.contactIcon i').eq(0).trigger('click');
      }
    });
  }

  changeViewEvent( event, targetView = event.target.getAttribute('data-viewid')) { 
    console.log( 'view tried to be changed: ', event, targetView, this.getViews() );

    if (typeof targetView === 'number')          targetView = this.getViews()[targetView];
    if (targetView === this.state.views.active ) targetView = this.state.views.prev;

    var prev = this.state.views.active;

    this.setState({
      views: {
        active: targetView,
        prev: prev,
      },
      customStyles: false,
      madeFullRotation: false
    });
  }
  
  render() { console.log('active: ', this.state.views.active);
    var styles = this.getStyles(),
        transforms = this.get3DPosition()[ this.state.views.active ],
        willMakeFullRotation = this.willMakeFullRotation();
        
        
       // offsetY = this.fullRotationOffset();
     
            
    if (willMakeFullRotation) { 
      transforms = Object.assign({}, transforms);
      transforms.rotateY =  willMakeFullRotation === 'right' ? -360 : 90;
      this.silentRotation();
    }

    styles.transform = 
      'rotateX('    + transforms.rotateX    + 'deg) ' +
      'rotateY('    + transforms.rotateY + 'deg) ' +
      'translateX(' + transforms.translateX + ')'     +
      'translateY(' + transforms.translateY + ')'     +
      'translateZ(' + transforms.translateZ + ')';
            
    if (!!this.state.customStyles) Object.assign(styles, this.state.customStyles);

    var views = this.getViews().map(function(viewKey, i){
      var ViewElement = View[viewKey]; 
      return (
        <ViewElement 
          data-viewid={viewKey} 
          views={this.state.views} 
          viewFlow={this.getViewsInFlow()} 
          clickAction={this.changeViewEvent} 
          tone={this.state.tone} 
          key={i} 
          viewIndex={i}
        />
      );
  }.bind(this));

return (
  <div className='page-container'>
    <div style={styles} className={this.state.tone}>
      {views}
    </div>
  </div>
)

/* dummy menu */

/* THis would go where formality enu goes
        <div className='tone-menu'>
          <button onClick={this.chooseToneEvent.bind(this, 'formal')} title='formal' selected={this.state.tone= 'formal'}>
            Formal
          </button>
          <button onClick={this.chooseToneEvent.bind(this, 'casual')} title='casual' selected={this.state.tone= 'casual'}>
            Casual
          </button>
        </div>
*/
}
};

module.exports = Page;