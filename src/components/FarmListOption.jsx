import PropTypes from "prop-types";

function FarmListOption({ onOptionSelected, data, selectedFarmId }) {
  return (
    <div className="categories">
      <button
        className={`${selectedFarmId === null ? "active" : ""}`}
        onClick={() => onOptionSelected(null)}
      >
        Semua AP
      </button>

      {data?.map((data) => (
        <button
          onClick={() => onOptionSelected(data.id)}
          key={data.id}
          className={`${selectedFarmId === data.id ? "active" : ""}`}
        >
          {data.initial}
        </button>
      ))}
    </div>
  );
}

FarmListOption.propTypes = {
  onOptionSelected: PropTypes.func,
  selectedFarmId: PropTypes.number,
  data: PropTypes.array,
};

export default FarmListOption;
