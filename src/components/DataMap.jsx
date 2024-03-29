import PropTypes from "prop-types";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { useFarmData } from "../data/useFarmData";
import { useEffect, useState } from "react";
import Summaries from "./Summaries";
import CustomMarker from "./CustomMarker";

function DataMap({ selectedFarmId, onMarkerClick, range }) {
  const farmData = useFarmData();
  const [summary, setSummary] = useState({
    averageSatisfaction: 0,
    totalUnits: 0,
    goodSatisfactionUnits: [],
    averageSatisfactionUnits: [],
    poorSatisfactionUnits: [],
  });

  const [coordinates, setCoordinates] = useState([]);

  function getSummary() {
    const data = farmData.getSummary(selectedFarmId, range);

    console.log(data);

    setSummary(data);
  }

  function getUnitsCoordinate() {
    const data = farmData.getUnitsCoordinate(selectedFarmId, range);

    setCoordinates(data);
  }

  function handleMarkerClick(id) {
    if (!selectedFarmId) onMarkerClick(id);
  }

  function getMarkerColor(id) {
    const summaryId = id.toString();

    if (summary.goodSatisfactionUnits.includes(summaryId)) return "green";
    if (summary.averageSatisfactionUnits.includes(summaryId)) return "orange";
    if (summary.poorSatisfactionUnits.includes(summaryId)) return "red";
  }

  useEffect(() => {
    getSummary();

    getUnitsCoordinate();
  }, [selectedFarmId]);

  return (
    <div>
      <div className="map">
        <Summaries data={summary} selectedFarmId={selectedFarmId}></Summaries>

        <MapContainer center={[-7.085, 107.952]} zoom={7} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {coordinates.map((data) => (
            <CustomMarker
              id={data.id}
              key={data.id}
              position={data.coordinate}
              name={data.name}
              onMarkerClick={handleMarkerClick}
              color={getMarkerColor(data.id)}
              showTooltips={!selectedFarmId ? true : false}
            ></CustomMarker>
          ))}

          <ZoomControl position="topright"></ZoomControl>
        </MapContainer>
      </div>
    </div>
  );
}

DataMap.propTypes = {
  selectedFarmId: PropTypes.number,
  onMarkerClick: PropTypes.func,
  range: PropTypes.object,
};

export default DataMap;
