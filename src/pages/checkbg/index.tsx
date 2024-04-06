import { Blurhash } from "react-blurhash";

const CheckBg = () => {
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <section
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        >
          <h2>Content</h2>
          {/* Your form code here */}
        </section>
        <Blurhash
          hash="T86Y:]|T[|]1[|#~w#sRjuN|N=SP"
          width={"100vw"}
          height={"100vh"}
          resolutionX={32}
          resolutionY={32}
          punch={1}
          style={{ position: "absolute", zIndex: 0, top: 0, left: 0 }}
        />
      </div>
    </>
  );
};

export default CheckBg;
