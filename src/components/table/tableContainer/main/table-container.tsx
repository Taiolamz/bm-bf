import { ReactNode } from "react";
import "./table-container.css";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import { Pagination } from "../pagination/pagination";

interface TableContainerProps {
  children?: ReactNode;
  tableHeadItems: string[];
  showPagination?: boolean;
  fromPage?: string;
  toPage?: string;
  totalPage?: string;
  useNumPagination?: string;
  currentPage?: any;
  totalTableLength?: string;
  onNumPage?: () => void;
  prevPage?: boolean;
  onPrevPage?: () => void;
  nextPage?: boolean;
  onNextPage?: () => void;
  perpageVal?: string;
}

const TableContainer = ({
  children,
  tableHeadItems,
  showPagination,
  fromPage,
  toPage,
  totalPage,
  useNumPagination,
  currentPage,
  onNumPage,
  prevPage,
  onPrevPage,
  totalTableLength,
  nextPage,
  onNextPage,
  perpageVal,
}: TableContainerProps) => {
  return (
    <div className="table-container-wrap">
      <table className="table-box">
        {/* table header box start */}
        <thead className="table-head">
          <tr className="table-row-head">
            <th>S/N</th>
            {tableHeadItems.map((chi, index) => (
              <th key={index}>{chi}</th>
            ))}
          </tr>
        </thead>
        {/* table header box end */}

        {children}
      </table>
      {/* pagination-wrap start */}
      <div className="pagination-wrap">
        {showPagination && (
          <Pagination
            fromPage={fromPage}
            toPage={toPage}
            totalPage={totalPage}
            prevPage={prevPage}
            onPrevPage={onPrevPage}
            useNumPagination={useNumPagination}
            currentPage={currentPage}
            totalTableLength={totalTableLength}
            onNumPage={onNumPage}
            perpageVal={perpageVal}
            nextPage={nextPage}
            onNextPage={onNextPage}
          />
        )}
      </div>
      {/* pagination-wrap end */}
    </div>
  );
};

export default TableContainer;
