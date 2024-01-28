function RecentOrdersItemInformation({ title, value }) {
  try {
    return (
      <>
        <div className="flex mb-[24px]">
          <p className="text-light-text min-w-[200px]">{title}: </p>
          <p className="text-primary-text">{value}</p>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default RecentOrdersItemInformation;
