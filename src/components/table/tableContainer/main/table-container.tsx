import { ReactNode } from "react";
import "./table-container.css";
import { Pagination } from "../pagination/pagination";
import { FaCheck } from "react-icons/fa";

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
  checkId?: string;
  checkValue?: any;
  onMassCheck?: (e: any) => void;
  massCheck?: boolean;
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
  checkId,
  checkValue,
  onMassCheck,
  massCheck,
}: TableContainerProps) => {
  return (
    <div className="table-container-wrap">
      <table className="table-box">
        {/* table header box start */}
        <thead className="table-head">
          <tr>
            {massCheck && (
              <th>
                <input
                  type="checkbox"
                  name={`table-check-${checkId}`}
                  id={`table-check-${checkId}`}
                  className="table-check-input-row"
                  value={checkValue}
                  onChange={(e: any) => {
                    if (onMassCheck) {
                      onMassCheck(e);
                    }
                  }}
                  checked={checkValue}
                />
                <label
                  className="table-check-label-input-row"
                  htmlFor={`table-check-${checkId}`}
                >
                  <FaCheck className="icon" />
                </label>
              </th>
            )}
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
