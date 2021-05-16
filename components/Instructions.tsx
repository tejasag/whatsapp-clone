function Instructions() {
  return (
    <div
      className="w-2/3 flex flex-col"
      style={{ maxHeight: "100vh", height: "95vh", backgroundColor: "#0d1418" }}
    >
      <h2 className={"w-full bold text-gray-200 text-4xl m-5 text-center"}>
        Whatsapp Clone
      </h2>
      <h3 className={"w-full text-gray-400 text-xl m-4 opacity-60"}>
        {`• Enter an email on the search bar to start a conversation.`}
        <br /> {`• Click on the 3 dots on the top-left menu bar to logout.`}
        <br />{" "}
        {`• Click on your profile picture on the top-left menu to go to the home screen`}
      </h3>
      <div className="w-full flex items-center m-6 justify-center opacity-90">
        <img
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt="Whatsapp"
          className="h-56 w-56"
        />
      </div>
    </div>
  );
}

export default Instructions;
