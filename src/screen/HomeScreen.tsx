import React, { FC } from "react";
import Plot from "react-plotly.js";
import { Col, Container, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { Olive, OliveProperty } from "../api/olive/entity";
import { transformData } from "../api/olive/util";

type Props = {
  olives: Olive[] | null;
  fethcingOlives: boolean;
  property: OliveProperty;
  onPropertyChange: (property: OliveProperty) => void;
  err?: Error | null;
};

export const HomeScreen: FC<Props> = ({
  olives,
  fethcingOlives,
  property,
  onPropertyChange,
  err,
}) => {
  if (err) {
    return (
      <div className='m-5 p-5'>
        something went wrong... error message: {err.message}
      </div>
    );
  }

  if (fethcingOlives || !olives) {
    return <h1 className='m-5 p-5'>fetching data...</h1>;
  }

  return (
    <Container className='pt-5'>
      <Row className='my-5'>
        <h1>Leo Unoki</h1>
      </Row>
      <Row>
        <Col className='mt-5 '>
          <Dropdown>
            <DropdownButton
              variant='info'
              title={`Group by :${property}`}
              onSelect={(e) => onPropertyChange(e as OliveProperty)}>
              <Dropdown.Item eventKey='oliveType'>olive type</Dropdown.Item>
              <Dropdown.Item eventKey='color'>color</Dropdown.Item>
              <Dropdown.Item eventKey='kg'>kg</Dropdown.Item>
            </DropdownButton>
          </Dropdown>
        </Col>
        <Col>
          <Plot
            data={transformData(olives, property)}
            layout={{
              width: 1000,
              height: 650,
              title: `frequency distribution of the property: ${property}`,
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};
