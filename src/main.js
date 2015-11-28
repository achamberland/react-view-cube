// main.js
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




var View = React.createClass({

  render: function(){
    return <div> 'View' </div>;
  },
});


View.Header = React.createClass({
  getMenuClass: function(){ 
    return this.props.currentView !== 'Menu' ? 'fa-bars' : 'fa-close';
  },
  getContactClass: function(){
    return this.props.currentView !== 'Contact' ? 'fa-envelope' : 'fa-close';
  },
  
  render: function(){
    return (
      <header>
        <a className='MenuIcon' onClick={(e) => this.props.clickAction(e, 4) }>
          <i className={'fa ' + this.getMenuClass()} />
        </a>
        <h1>{this.props.currentView.replace(/_|-/g, ' ')}</h1>
        <a className='contactIcon' onClick={(e) => this.props.clickAction(e, 5)}>
          <i className={'fa ' + this.getContactClass()} />
        </a>
      </header>
    )
  }
});


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



View.Home = React.createClass({
  render: function() {
    return ( 
      <section className={this.props['data-viewid']}>
        <View.Header 
          currentView={this.props['data-viewid']}
          clickAction={this.props.clickAction}
        />
        <section>
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
  }
});


View.Contact = React.createClass({
  render: function(){
    return (
      <section className={this.props['data-viewid']}>
        <View.Header 
          currentView={this.props['data-viewid']}
          clickAction={this.props.clickAction}
        />
        <section>
          <ul className='contactList flex'>
            <li className="flex__square">
              <a href="@">
                <i className="fa fa-3x fa-phone"/>
                <h3> Phone </h3>
              </a>
            </li>
            <li className="flex__square">
              <a href="#">
                <i className="fa fa-3x fa-envelope"/>
                <h3> email </h3>
              </a>
            </li>
            <li className="flex__square">
              <a href="#">
                <i className="fa fa-3x fa-linkedin"/>
                <h3> LinkedIn </h3>
              </a>
            </li>
          </ul>
        </section>
      </section>
    )
  }
});



var FeedData = require('./common/FeedData.js'); 



View.Feed = React.createClass({
  render: function() {
    var articles = FeedData.map(function(article, i){
      return <View.Feed.Article 
      article={article} 
      key={i} 
      />
    });

    return (
      <section className={this.props['data-viewid']}> 
        <View.Header 
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


View.Feed.Article = React.createClass({
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



View.Menu = React.createClass({
  render: function() {
    return (
      <section className={this.props['data-viewid']} >
        <View.Header 
          currentView={this.props['data-viewid']} 
          clickAction={this.props.clickAction}
        />
        <View.Menu.List clickAction={this.props.clickAction} /> 
        <h4 className='menu__deco-text1 menu__deco-text'>3D Menu!</h4>
        <h4 className='menu__deco-text2 menu__deco-text'>Whoa!</h4>
        <h4 className='menu__deco-text3 menu__deco-text'>Gimmicky!</h4>
      </section>
    )
  },
});

//This page needs each child to have its own background for the li animations
View.Menu.List = React.createClass({
  getInitialState: function(){
    return {
      activeView: false,
      rotation:0,
    }
  },
  
  getOptions: function(){
    return [
      {title: 'Home',    openView: 'Home'    },
      {title: 'View 1',  openView: 'View_1' },
      {title: 'View 2',  openView: 'View_2' },
      {title: 'About',   openView: 'About'   },
      {title: 'Contact', openView: 'Contact' },
    ];
  },

  handleClick: function(event){
    //this.setState({rotation: -90, activeView: event.target['data-viewid']});
    //setTimeout(function(){ console.log(event.target);
      this.props.clickAction(event);
    //}.bind(this), 1000);
  },

  render: function(){
    var listItems = this.getOptions().map( function(item, i){
     var styles = {
       transform: 'rotateY(' + this.state.rotation + 'deg)',
       transition: 'transform ' + Math.random() + 's ease'
     };

     return (
       <li className='menu__option' style={styles} data-viewid={item.openView} onClick={this.handleClick} key={i}>
        {item.title}
       </li>
     )
    }.bind(this));
    return (
     <ul className='menu'>
      {listItems}
     </ul>
    )
  }
});
/*
View.Menu.menuItem = React.createClass({
  render: function(){
    return (
    );
  }
});
*/

 
View.NeatList = React.createClass({
  render: function(){ console.log(this.props);
    var listItems = this.props.data.map(function(item, i){
     return (
       <li className='flex__square' key={i}>
       <img src={item.imageUrl} alt={item.name + ' logo'} className={item.name + '-icon' + ' flex__icon'} />
       <h3>{item.name}</h3>
       <p> {item.decription}</p>
       </li>
     )
   }); 

   return (
     <ul className='flex'>
       {listItems}
     </ul>
   )
  }
});


View.View_2 = React.createClass({

  frameworkData: [
  ],

  render: function(){
    return (
      //Extra- spin logo around on hover

      <section className={this.props['data-viewid']}>

        <View.Header 
          currentView={this.props['data-viewid']} 
          clickAction={this.props.clickAction}
        />
      
        <section>
          <View.NeatList data={this.frameworkData} />
        </section>

        <NavArrows views={this.props.views} 
          viewFlow={this.props.viewFlow} 
          currentView={this.props['data-viewid']} 
          viewIndex={this.props.viewIndex}
          clickAction={this.props.clickAction} 
        />
      </section>
    )
  }
});



View.View_1 = React.createClass({

  languageData:[],
  
  render: function(){
    return (
      <section className={this.props['data-viewid']}>
        <View.Header 
          currentView={this.props['data-viewid']} 
          clickAction={this.props.clickAction}
        />

        <section>
          <View.NeatList data={this.languageData} />
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
  }
});




View.About = React.createClass({
  //About this project, the transition from React Canvas 3D demo to random experimentss using react
  render: function(){
    return (
      <section className={this.props['data-viewid']}>
        <View.Header 
          currentView={this.props['data-viewid']} 
          clickAction={this.props.clickAction} 
        />
        <section>
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
  }
});






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







ReactDOM.render(
  <Page />,
  document.getElementById('target')
); 

