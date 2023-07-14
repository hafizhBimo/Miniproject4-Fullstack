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
        }}
      >
        welcome,{user}
      </div>
    </div>
  ) : (
    <div>kosong</div>
  );
};

export default WelcomeMenuComponent;
