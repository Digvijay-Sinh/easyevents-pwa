import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface ImgProps {
  src: string;
  className?: string;
}
const Img = ({ src, className }: ImgProps) => {
  return (
    <LazyLoadImage
      className={className || ""}
      alt="No Image Found"
      effect="blur"
      src={src}
    />
  );
};

export default Img;
