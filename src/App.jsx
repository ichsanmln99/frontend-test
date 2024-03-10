import { useEffect, useState } from "react";
import DataMap from "./components/DataMap";
import FarmListOption from "./components/FarmListOption";
import DataTableCard from "./components/DataTableCard";
import { useFarmData } from "./data/useFarmData";

function App() {
  const farmData = useFarmData();
  const [farms, setFarms] = useState([]);
  const [farmsProductions, setFarmsProductions] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState(null);

  const selectedFarm = farms.find((farm) => farm.id === selectedFarmId);

  const [tablePagination, setTablePagination] = useState({
    currentPage: 0,
    pageSize: 0,
    perPage: 0,
    totalCount: 0,
    totalPages: 0,
  });

  const range = {
    startDate: new Date("2023-12-18"),
    endDate: new Date("2024-12-18"),
  };

  function getFarmProductions(id, pageIndex = 1) {
    const data = farmData.get(id, pageIndex, range);

    setFarmsProductions(data.data);
    setTablePagination(data.pagination);
  }

  function getFarms() {
    const data = farmData.getFarms(range);

    setFarms(data);
  }

  function selectFarm(id) {
    setSelectedFarmId(id);
  }

  function formatDate(rawDate) {
    const date = new Date(rawDate);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  useEffect(() => {
    getFarms();
  }, []);

  useEffect(() => {
    const id = selectedFarmId;
    getFarmProductions(id);
  }, [selectedFarmId]);

  return (
    <>
      <div className="container">
        <h1 className="header">Pelayanan PPL</h1>

        <div className="card text-center text-sm">
          <span className="text-xs mr-2">Tanggal Preview</span>{" "}
          {formatDate(range.startDate)} -{" "}
          {formatDate(range.endDate.toLocaleDateString())}
        </div>

        <DataMap
          selectedFarmId={selectedFarmId}
          onMarkerClick={selectFarm}
          range={range}
        ></DataMap>

        <FarmListOption
          data={farms}
          onOptionSelected={selectFarm}
          selectedFarmId={selectedFarmId}
        ></FarmListOption>

        <DataTableCard
          selectedFarmName={selectedFarm?.name}
          data={farmsProductions}
          pagination={tablePagination}
          onPageChange={(index) => getFarmProductions(selectedFarmId, index)}
        ></DataTableCard>
      </div>
    </>
  );
}

export default App;
