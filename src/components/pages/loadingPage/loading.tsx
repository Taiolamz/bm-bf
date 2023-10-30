import { RevvexBigLogo } from "../../../assets/icons/icons";
import "./loading.css";

export function LoadingState() {
  const numDots = 4;

  const dots = Array.from({ length: numDots }, (_, index) => (
    <div key={index} className="dots-loader"></div>
  ));

  return (
    <div className="big-loader-wrap">
      {/* big logo wrap start */}
      <figure>{RevvexBigLogo}</figure>
      {/* big logo wrap end */}

      {/* dots-wrap start */}
      <div className="dots-wrap">{dots}</div>
      {/* dots-wrap end */}
    </div>
  );
}
