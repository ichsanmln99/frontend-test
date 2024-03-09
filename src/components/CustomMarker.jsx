import PropTypes from "prop-types";

import { Marker, Tooltip } from "react-leaflet";

import L from "leaflet";
import markerGreen from "../assets/marker-green.svg";
import markerOrange from "../assets/marker-orange.svg";
import markerRed from "../assets/marker-red.svg";

function CustomMarker({
  id,
  position,
  name,
  onMarkerClick,
  color,
  showTooltips,
}) {
  const colorStyle = {
    red: {
      iconUrl: markerRed,
      tooltipClass: "text-danger",
      dotClass: "bg-danger",
    },
    orange: {
      iconUrl: markerOrange,
      tooltipClass: "text-warning",
      dotClass: "bg-warning",
    },
    green: {
      iconUrl: markerGreen,
      tooltipClass: "text-success",
      dotClass: "bg-success",
    },
  };

  const marker = new L.Icon({
    iconUrl: colorStyle[color].iconUrl,
    iconRetinaUrl: colorStyle[color].iconUrl,
    tooltipAnchor: [0, -30],
    iconSize: [64, 64],
  });

  return (
    <Marker
      icon={marker}
      eventHandlers={{
        click: () => {
          onMarkerClick(id);
        },
      }}
      position={position}
    >
      <Tooltip direction="top" permanent={showTooltips}>
        <div
          className={`text-lg font-medium flex items-center gap-2 ${colorStyle[color].tooltipClass}`}
        >
          <div
            className={`w-3 h-3 rounded-full ${colorStyle[color].dotClass}`}
          ></div>
          {name}
        </div>
      </Tooltip>
    </Marker>
  );
}

CustomMarker.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onMarkerClick: PropTypes.func,
  position: PropTypes.array,
  name: PropTypes.string,
  color: PropTypes.oneOf(["red", "green", "orange"]),
  showTooltips: PropTypes.bool,
};

export default CustomMarker;
