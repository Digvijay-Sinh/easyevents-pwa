
import formbg from "../../../assets/events/formbgfinal.jpg";


const blurAmount = 8; // Adjust blur amount as needed

const bgStyles = {
  backgroundImage: `url(${formbg})`,
  filter: `blur(${blurAmount}px)`,
  WebkitFilter: `blur(${blurAmount}px)`,
  height: "100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};


const BgBlurCheck = () => {
  return (
    <>
        <div className="w-full " ></div>
    </>
  )
}

export default BgBlurCheck