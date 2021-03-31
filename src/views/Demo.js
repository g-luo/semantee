import React, { Component } from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TableRow from '../components/demo/TableRow';
import Msger from '../components/demo/Msger';

const databases = [{
  name: "Movies Table", 
  tables: [
    {
      name: "Actor",
      primary_key: "aid",
      schema: [
        {"key": "aid", "type": "int"},
        {"key" : "gender", "type": "text"},
      ]
    },
    {
      name: "Actress",
      primary_key: "aid",
      schema: [
        {"key": "aid", "type": "int"},
        {"key" : "gender", "type": "text"},
      ]
    }
  ]
}]

const options = databases.map(database => (
    {
      value: database.name,
      label: database.name
    }
  )
)

const outerClasses = classNames(
  'section demo',
);

const innerClasses = classNames(
  'section-inner',
  'has-bg-color',
);

const database = databases[0];

const Demo = ({
  ...props
}) => (
  <section
    {...props}
    className={outerClasses}
  >
    <Container className={innerClasses}>
      <Row>
        <Col md={4}>
          <Select options={options} />
          <Button className="demo-btn"> Load Database </Button>
          <div className="demo-table light-2-background">
            <h5>{database.name}</h5>
            {
              database.tables.map(table => {
                return <TableRow table={table} />
              })
            }
          </div>
        </Col>
        <Col md={8}>
          <Msger />
        </Col>
       </Row>
    </Container>
  </section>
)

export default Demo;