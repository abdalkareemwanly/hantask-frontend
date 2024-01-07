import TitleLine from "../../components/common/TitleLine";
import ContactCard from "./components/ContactCard";
import ContactForm from "./components/ContactForm";
import CONTACT_DATA from "./data/contactData";

function Contact(props) {
  try {
    return (
      <>
        <div className=" sm:px-24 px-6 py-24 flex flex-col gap-12 text-center  justify-center items-center">
          <div className="flex flex-col gap-6 w-full">
            <h2 className="text-[5.5vw] md:text-[3vw] lg:text-[2.5vw] font-semibold">Contact</h2>
            <div className="contact-cards grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              {CONTACT_DATA.map((item, index) => {
                return <ContactCard key={index} item={item} />;
              })}
            </div>
            <div className="contact-form-container">
              <TitleLine />
              <ContactForm />
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Contact;
