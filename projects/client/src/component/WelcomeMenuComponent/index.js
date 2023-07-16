const WelcomeMenuComponent = ({ user }) => {
  return user ? (
    <div
      style={{ height: "94vh" }}
      className="flex justify-center items-center bg-slate-100"
    >
      <div
        style={{
          width: "1000px",
          alignItems: "center",
          backgroundColor: "white",
          height: "94vh",
          display: "flex",
          justifyContent: "center",
          paddingLeft: "52px",
        }}
      >
        welcome,{user}
      </div>
    </div>
  ) : (
    <div
      style={{ height: "94vh" }}
      className="flex justify-center items-center bg-slate-100"
    >
      <div
        style={{
          width: "1000px",
          alignItems: "center",
          backgroundColor: "white",
          height: "94vh",
          display: "flex",
          justifyContent: "center",
          paddingLeft: "52px",
        }}
      >
        welcome, admin
      </div>
    </div>
  );
};

export default WelcomeMenuComponent;
