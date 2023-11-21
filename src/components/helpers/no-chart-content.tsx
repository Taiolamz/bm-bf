import Skeleton from "react-loading-skeleton";

const NoChartContent = ({ moreContent }: any) => {
  return (
    <>
      <div
        style={{
          gap: "3rem",
          width: "100%",
          minHeight: "30rem",
          display: "flex",
          borderLeft: ".1rem solid rgba(0,0,0, .1)",
          borderBottom: ".1rem solid rgba(0,0,0, .1)",
          paddingLeft: "2rem",
          marginBottom: "-5rem",
          // justifyContent: "space-between",
        }}
        className=""
      >
        <div
          style={{
            display: "flex",
            gap: ".7rem",
            // marginBottom: "-3rem",
            transform: "rotate(180deg)",
          }}
          className=""
        >
          <Skeleton width={25} height={`30%`} />
          <Skeleton width={25} height={`50%`} />
          <Skeleton width={25} height={`70%`} />
        </div>
        <div
          style={{
            display: "flex",
            gap: ".7rem",
            transform: "rotate(180deg)",
          }}
          className=""
        >
          <Skeleton width={25} height={`30%`} />
          <Skeleton width={25} height={`50%`} />
          <Skeleton width={25} height={`70%`} />
        </div>
        {moreContent && (
          <>
            {" "}
            <div
              style={{
                display: "flex",
                gap: ".7rem",
                transform: "rotate(180deg)",
              }}
              className=""
            >
              <Skeleton width={25} height={`80%`} />
              <Skeleton width={25} height={`60%`} />
              <Skeleton width={25} height={`40%`} />
            </div>
            <div
              style={{
                display: "flex",
                gap: ".7rem",
                transform: "rotate(180deg)",
              }}
              className=""
            >
              <Skeleton width={25} height={`30%`} />
              <Skeleton width={25} height={`50%`} />
              <Skeleton width={25} height={`70%`} />
            </div>
            <div
              style={{
                display: "flex",
                gap: ".7rem",
                // marginBottom: "-3rem",
                transform: "rotate(180deg)",
              }}
              className=""
            >
              <Skeleton width={25} height={`30%`} />
              <Skeleton width={25} height={`50%`} />
              <Skeleton width={25} height={`70%`} />
            </div>
            <div
              style={{
                display: "flex",
                gap: ".7rem",
                transform: "rotate(180deg)",
              }}
              className=""
            >
              <Skeleton width={25} height={`30%`} />
              <Skeleton width={25} height={`50%`} />
              <Skeleton width={25} height={`70%`} />
            </div>
            <div
              style={{
                display: "flex",
                gap: ".7rem",
                transform: "rotate(180deg)",
              }}
              className=""
            >
              <Skeleton width={25} height={`80%`} />
              <Skeleton width={25} height={`60%`} />
              <Skeleton width={25} height={`40%`} />
            </div>
            <div
              style={{
                display: "flex",
                gap: ".7rem",
                transform: "rotate(180deg)",
              }}
              className=""
            >
              <Skeleton width={25} height={`30%`} />
              <Skeleton width={25} height={`50%`} />
              <Skeleton width={25} height={`70%`} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NoChartContent;
