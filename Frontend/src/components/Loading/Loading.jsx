import { DotLoader } from "react-spinners";

function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <DotLoader size={50} color="#36d7b7" />
    </div>
  );
}

export default Loading;
