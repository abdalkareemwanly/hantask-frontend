import FormDynamic from "../../../Components/FormDynamic/FormDynamic";

export default function ChatUsers() {
  return (
    <div>
      <FormDynamic
          Label={true}
          InputAccess={true}
          SelectAccess={true}
          TextAreaAccess={true}
          FormInput={["number", ["Input_1", "Input_2", "Input_3"]]}
          FormSelect={[
            { label: "test", elements: ["select_1", "select_2", "select_3"] },
            { label: "test", elements: ["select_3", "select_4", "select_5"] }
          ]}
          FormTextArea={["Area_1"]}
        />
    </div>
  )
}
