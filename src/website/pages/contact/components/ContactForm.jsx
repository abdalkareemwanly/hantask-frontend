import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CONTACT_SCHEMA from "../data/contactSchema";
import Input from "../../../components/form/Input";
import SubmitButton from "../../../components/form/SubmitButton";
import TextArea from "../../../components/form/TextArea";

function ContactForm({ user }) {
  try {
    const schema = z.object(CONTACT_SCHEMA);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
      },
    });

    const submitData = (data) => {};

    return (
      <>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 my-12">
            <Input
              type={"text"}
              placeholder={"Your Name"}
              register={register}
              name={"name"}
              label={"Your Name"}
              errors={errors}
            />
            <Input
              type={"email"}
              placeholder={"Your Email"}
              register={register}
              name={"email"}
              label={"Your Email"}
              errors={errors}
            />
            <Input
              type={"tel"}
              placeholder={"Your Phone"}
              register={register}
              name={"phone"}
              label={"Your Phone"}
              errors={errors}
            />
            <Input
              type={"text"}
              placeholder={"Your Address"}
              register={register}
              name={"address"}
              label={"Your Address"}
              errors={errors}
            />
            <TextArea
              placeholder={"Your Message"}
              register={register}
              name={"message"}
              label={"Your Message"}
              errors={errors}
            />
          </div>
          <SubmitButton />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ContactForm;
