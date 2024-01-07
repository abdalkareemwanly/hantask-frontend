function Policy({ policyContent }) {
  try {
    return (
      <>
        <div className="lg:py-20 md:px-12 px-6 py-24">{policyContent}</div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Policy;
