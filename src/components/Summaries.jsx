import PropTypes from "prop-types";
function Summaries({ data, selectedFarmId }) {
  return (
    <div className="info-section ">
      <div className="info-card">
        <div className="info-card-title">
          Rata-Rata Pelayanan PPL semua {selectedFarmId ? "Unit" : "PT"}
        </div>
        <div className="info-card-content text-primary">
          {data.averageSatisfaction}%
        </div>
      </div>
      <div className="info-card">
        <div className="info-card-title">
          Total {selectedFarmId ? "Unit" : "AP"}
        </div>
        <div className="info-card-content text-primary">{data.totalUnits}</div>
      </div>
      <div className="info-card">
        <div className="info-card-title">Pelayanan PPL 90%-100%</div>
        <div className="info-card-content text-success">
          {data.goodSatisfactionUnits.length} {selectedFarmId ? "Unit" : "AP"}
        </div>
      </div>
      <div className="info-card">
        <div className="info-card-title">Pelayanan PPL 70%-89%</div>
        <div className="info-card-content text-warning">
          {data.averageSatisfactionUnits.length}{" "}
          {selectedFarmId ? "Unit" : "AP"}
        </div>
      </div>
      <div className="info-card">
        <div className="info-card-title">Pelayanan PPL {"<"}69%</div>
        <div className="info-card-content text-danger">
          {data.poorSatisfactionUnits.length} {selectedFarmId ? "Unit" : "AP"}
        </div>
      </div>
    </div>
  );
}

Summaries.propTypes = {
  data: PropTypes.object,
  selectedFarmId: PropTypes.number,
};

export default Summaries;
