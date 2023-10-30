import "./pagination.css";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { HandlepaginationHelper } from "../../../helpers/helpers";

interface PaginationProps {
  fromPage?: string;
  toPage?: string;
  totalPage?: string;
  prevPage?: boolean;
  onPrevPage?: () => void;
  useNumPagination?: string;
  currentPage?: any;
  totalTableLength?: string;
  onNumPage?: () => void;
  perpageVal?: string;
  nextPage?: boolean;
  onNextPage?: () => void;
}

export const Pagination = ({
  fromPage,
  toPage,
  totalPage,
  prevPage,
  onPrevPage,
  useNumPagination,
  currentPage,
  totalTableLength,
  onNumPage,
  perpageVal,
  nextPage,
  onNextPage,
}: PaginationProps) => {
  return (
    <div className="pagination-box">
      <div className="text-wrap">
        <p className="text">{fromPage || "1"}</p>
        <span>-</span>
        <p className="text">{toPage || "1"}</p>
        <span>of</span>
        <p className="text">{totalPage || "1"}</p>
      </div>

      <div className="next-prev-box">
        <MdArrowBackIosNew
          onClick={() => prevPage && onPrevPage && onPrevPage()}
          className={`icon ${prevPage && "icon-active"}`}
        />
        {useNumPagination &&
          currentPage &&
          totalTableLength &&
          HandlepaginationHelper(
            currentPage,
            Math.ceil(Number(totalTableLength) / Number(perpageVal))
          ).map((chi, idx) => {
            return (
              <div
                onClick={() => {
                  if (chi !== "..." && currentPage !== idx + 1 && onNumPage) {
                    onNumPage();
                    // onNumPage(chi);
                  }
                }}
                key={idx}
                className={`icon icon-active ${
                  currentPage === idx + 1 && "current current-chi"
                } ${chi === "..." && "current"}`}
              >
                {chi}
              </div>
            );
          })}
        <MdArrowForwardIos
          onClick={() => nextPage && onNextPage && onNextPage()}
          className={`icon ${nextPage && "icon-active"}`}
        />
      </div>
    </div>
  );
};
