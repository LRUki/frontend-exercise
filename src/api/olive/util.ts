import { Olive, OliveProperty } from "./entity";
import * as Plotly from "plotly.js";

//process the row data and group by 'property' for the distribution chart
export const transformData = (
  data: Olive[],
  property: OliveProperty
): Plotly.Data[] => {
  let frequencyMap: Map<string, number> = new Map();

  if (property === "kg") {
    data.sort((a, b) => a.kg - b.kg);
    let key: string;
    data.forEach(({ kg }) => {
      if (kg < 100) {
        key = "~100";
      } else if (kg < 200) {
        key = "100~199";
      } else if (kg < 300) {
        key = "200~299";
      } else {
        key = "300~";
      }
      frequencyMap.set(key, (frequencyMap.get(key) || 0) + 1);
    });
  } else {
    frequencyMap = data.reduce(
      (map, olive) =>
        map.set(olive[property], (map.get(olive[property]) || 0) + 1),
      new Map()
    );
  }

  return [
    {
      type: "bar",
      x: [...frequencyMap.keys()],
      y: [...frequencyMap.values()],
      marker: {
        color: "rgb(142,124,195)",
      },
    },
  ];
};
