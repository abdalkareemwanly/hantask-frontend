import "../style/ContactCard.css";
import { Link } from "react-router-dom";

function ContactCard({ item }) {
  try {
    return (
      <>
        <div className="contact-card">
          <div className="contact-icon" style={item.background ? { backgroundColor: item.background } : {}}>
            {item.icon}
          </div>
          <div className="contacts-contents">
            <h4 className="title"> {item.title}</h4>
            <div className="item-contents">
              {item.contactList.map((contact, index) => {
                return (
                  <Link key={index} to={contact.href}>
                    {contact.text}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ContactCard;
