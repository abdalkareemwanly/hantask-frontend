import Button from "../../../../Components/Button";

function CustomerChatHeader({ reportId, orderId, reportFrom }) {
  try {
    return (
      <>
        <div className=" flex justify-between items-start border-b border-light-text pb-[20px]">
          <h4 className="text-[24px] leading-[1.2] font-[600] text-primary-text mb-[10px]">
            Report Details
          </h4>

          <Button
            isLink={true}
            goto={"/serviceProvider/reports"}
            title={"All Reports"}
            width={"max-content"}
            color={"bg-greenColor"}
          />
        </div>
        <div className="mt-[20px]">
          <div className="flex flex-col">
            <span className="text-light-text">
              <strong>Report ID: </strong>
              {reportId}
            </span>
            <span className="text-light-text">
              <strong>Order ID: </strong>
              {orderId}
            </span>
            <span className="text-light-text">
              <strong>Report From: </strong>
              {reportFrom}
            </span>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default CustomerChatHeader;
