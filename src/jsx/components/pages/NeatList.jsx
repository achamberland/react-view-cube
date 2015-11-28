var NeatList = React.createClass({
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

module.exports = NeatList;