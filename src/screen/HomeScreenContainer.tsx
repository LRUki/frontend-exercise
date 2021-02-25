import React, { FC, useState, useEffect } from "react";
import { Olive, OliveProperty } from "../api/olive/entity";
import { requestOlives } from "../api/olive/request";
import { HomeScreen } from "./HomeScreen";

export const HomseScreenContainer: FC<{}> = () => {
  const [olives, setOlives] = useState<Olive[] | null>(null);
  const [property, setProperty] = useState<OliveProperty>("oliveType");
  const [fetching, setFetching] = useState<boolean>(false);
  const [err, setErr] = useState<Error | null>(null);

  const onPropertyChange = (property: OliveProperty) => {
    setProperty(property);
  };

  useEffect(() => {
    const fetchOlives = async () => {
      try {
        setFetching(true);
        const olives = await requestOlives();
        setOlives(olives);
      } catch (err) {
        setErr(err);
      }
      setFetching(false);
    };
    fetchOlives();
  }, []);

  return (
    <HomeScreen
      olives={olives}
      fethcingOlives={fetching}
      property={property}
      onPropertyChange={onPropertyChange}
      err={err}
    />
  );
};
