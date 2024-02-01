function NoItems({ text }) {
  try {
    return (
      <>
        <div className="w-[100%] p-[1rem] border border-greenColor rounded-[6px] bg-greenColor  text-greenColor mt-[20px]" style={{ "--tw-bg-opacity": ".40" }}>
          {text}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default NoItems;
