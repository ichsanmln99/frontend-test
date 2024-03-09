import PropTypes from "prop-types";

import Pagination from "./Pagination";

function DataTableCard({ data, pagination, onPageChange, selectedFarmName }) {
  function countRanking(index) {
    const currentIndex = index + 1;
    const restIndexCount = (pagination.currentPage - 1) * pagination.perPage;

    return currentIndex + restIndexCount;
  }

  function countTotalDataShowed() {
    const currentPageSize = pagination.pageSize;
    const restDataCount = (pagination.currentPage - 1) * pagination.perPage;

    return currentPageSize + restDataCount;
  }

  function formatThousand(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return (
    <div className="card">
      <div className="border-b text-2xl pb-3 mb-2">
        Table Data {selectedFarmName ? selectedFarmName : "Semua Perusahaan"}
      </div>

      <div className="space-x-2 my-5">
        <span className="text-xs bg-primary/20 text-primary py-1 px-2 rounded">
          Total Data :{countTotalDataShowed()} dari {pagination.totalCount} data
        </span>
        <span className="text-xs bg-success/20 text-success py-1 px-2 rounded">
          Berhasil dimuat: 100%
        </span>
      </div>

      <div className="mb-5">
        <table className="data-table">
          <thead>
            <tr>
              <th>Rangking</th>
              <th>Nama PPL</th>
              <th>Rata-Rata Rating Kepuasan</th>
              <th>Jumlah Periode</th>
              <th>Unit yang di pegang</th>
              <th className="!text-center">Rata-Rata IP</th>
              <th className="!text-center">Rata-Rata FCR</th>
              <th className="!text-right">Populasi Ekor yang Dipegang</th>
              <th className="text-success !text-right">
                Rata-Rata Keuntungan Per Ekor
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((data, index) => (
              <tr key={data.id}>
                <td className="text-center">{countRanking(index)}</td>
                <td>{data.namePpl}</td>
                <td>{data.averageRatingSatisfaction}%</td>
                <td>{data.periodCount}</td>
                <td>
                  {data.heldUnit}-{data.company}
                </td>
                <td className="text-center">{data.averageIP}</td>
                <td className="text-center">{data.averageFCR}</td>
                <td className="text-right">
                  {formatThousand(data.populationHeld)}
                </td>
                <td className="text-success text-right">
                  Rp {formatThousand(data.averageProfitPerHead)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <Pagination
          pagination={pagination}
          maxPageNumber={4}
          onPageChange={onPageChange}
        ></Pagination>
      </div>
    </div>
  );
}

DataTableCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
  selectedFarmName: PropTypes.string,
};

export default DataTableCard;
