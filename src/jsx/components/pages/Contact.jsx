var Contact = React.createClass({
  render: function(){
    return (
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
    )
  }
});

module.exports = Contact;