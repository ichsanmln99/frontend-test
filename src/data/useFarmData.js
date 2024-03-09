import data from "../assets/data.json";

const PAGE_SIZE = 10;

export function useFarmData() {
  function get(id, pageIndex = 1) {
    const result = getData(id);

    const sortedResult = sortData(result, "averageRatingSatisfaction");

    return paginate(sortedResult, { pageSize: PAGE_SIZE, pageIndex });
  }

  function getFarms() {
    const heldUnitData = data.data.map((data) => ({
      id: data.companyId,
      name: data.company,
      initial: data.companyInitial,
    }));

    return uniqueArrayObjectsByValue(heldUnitData, "id");
  }

  function getData(id) {
    return !id ? data.data : data.data.filter((data) => data.companyId === id);
  }

  function paginate(data, { pageSize, pageIndex }) {
    let start = pageSize * (pageIndex - 1);
    const result = data.slice(start, start + pageSize);
    return {
      data: result,
      pagination: {
        currentPage: pageIndex,
        pageSize: result.length,
        perPage: pageSize,
        totalCount: data.length,
        totalPages: Math.ceil(data.length / pageSize),
      },
    };
  }

  function uniqueArrayObjectsByValue(array, property) {
    const uniqueObjects = {};
    array.forEach((obj) => {
      const value = obj[property];
      uniqueObjects[value] = obj;
    });
    return Object.values(uniqueObjects);
  }

  function sortData(array, property) {
    return array.sort((a, b) => b[property] - a[property]);
  }

  function getSummary(id) {
    const data = getData(id);
    const result = {
      averageSatisfaction: 0,
      totalUnits: 0,
      goodSatisfactionUnits: 0,
      averageSatisfactionUnits: 0,
      poorSatisfactionUnits: 0,
    };

    const separatedRating = separateRatingEachUnit(data, id);

    const summary = summarize(separatedRating);
    result.averageSatisfaction = Math.round(summary.averageSatisfaction);
    result.totalUnits = summary.totalUnits;
    result.goodSatisfactionUnits = summary.goodSatisfactionUnits;
    result.averageSatisfactionUnits = summary.averageSatisfactionUnits;
    result.poorSatisfactionUnits = summary.poorSatisfactionUnits;

    return result;
  }

  function separateRatingEachUnit(units, id) {
    const result = {};

    units.forEach((unit) => {
      const unitKey = id ? unit.heldUnit : unit.companyId;
      const goodRate = unit.averageRatingSatisfaction >= 90;
      const averageRate = unit.averageRatingSatisfaction >= 70;

      if (!result[unitKey]) {
        result[unitKey] = {
          satisfactionUnits: [],
          goodSatisfactionUnits: [],
          averageSatisfactionUnits: [],
          poorSatisfactionUnits: [],
        };
      }

      result[unitKey].satisfactionUnits.push(unit.averageRatingSatisfaction);

      if (goodRate)
        result[unitKey].goodSatisfactionUnits.push(
          unit.averageRatingSatisfaction
        );
      else if (averageRate)
        result[unitKey].averageSatisfactionUnits.push(
          unit.averageRatingSatisfaction
        );
      else
        result[unitKey].poorSatisfactionUnits.push(
          unit.averageRatingSatisfaction
        );
    });

    return result;
  }

  function summarize(separatedRating) {
    const result = {
      averageSatisfaction: 0,
      totalUnits: Object.keys(separatedRating).length,
      goodSatisfactionUnits: [],
      averageSatisfactionUnits: [],
      poorSatisfactionUnits: [],
    };

    for (const unitKey in separatedRating) {
      const rate = countAverageArray(
        separatedRating[unitKey].satisfactionUnits
      );
      const goodRate = rate >= 90;
      const averageRate = rate >= 70;

      if (goodRate) result.goodSatisfactionUnits.push(unitKey);
      else if (averageRate) result.averageSatisfactionUnits.push(unitKey);
      else result.poorSatisfactionUnits.push(unitKey);

      result.averageSatisfaction += rate;
    }

    result.averageSatisfaction = result.averageSatisfaction / result.totalUnits;

    return result;
  }

  function countAverageArray(array) {
    const summedArray = array.reduce((acc, curr) => acc + curr, 0);

    return array.length > 0 ? summedArray / array.length : 0;
  }

  function getUnitsCoordinate(id) {
    let data = getData(id);

    if (id) {
      data = data.map((data) => ({
        id: data.heldUnit,
        name: data.heldUnit + " - PT " + data.companyInitial,
        coordinate: data.coordinate,
      }));
    } else {
      data = data.map((data) => ({
        id: data.companyId,
        name: "PT " + data.companyInitial,
        coordinate: data.coordinate,
      }));
    }

    const units = uniqueArrayObjectsByValue(data, "id");

    return units;
  }

  return { get, getSummary, getFarms, getUnitsCoordinate };
}
