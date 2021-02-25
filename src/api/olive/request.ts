import { Olive } from "./entity";

export const requestOlives = async (): Promise<Olive[]> => {
  const response = await fetch("data/olive_stats.json");
  return (await response.json()) as Olive[];
};
