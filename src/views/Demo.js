import React, { useState } from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MetadataRow from '../components/demo/MetadataRow';
import Msger from '../components/demo/Msger';
import axios from 'axios';

const outerClasses = classNames(
  'section demo',
);

const innerClasses = classNames(
  'section-inner',
  'has-bg-color',
);

const Demo = ({
  ...props
}) => {
  const [database, setDatabase] = useState(
    {
      name: "Load database to start", 
      tables: [
        {
          name: "Semantee is waiting.",
          primary_key: "--",
          schema: []
        },
      ]
    }
  )
  // const options = databases.map(database => (
  //     {
  //       value: database.name,
  //       label: database.name
  //     }
  //   )
  // )
  const defaultValue = "Flight Company"
  const options = [{value: defaultValue, label: defaultValue}]

  const get_db_info = () => {
    axios.get("http://semantee.herokuapp.com/get_db_info")
    .then (
      (response) => {
        setDatabase(response.data);
        setMsgerDisabled(false);
      }
    )
    .catch(
      (error) => {
        console.log("Error retrieving database info");
      }
    );
  }
  const [msgerDisabled, setMsgerDisabled] = useState(true);

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <Container className={innerClasses}>
        <Row>
          <Col md={4}>
            <Select options={options} defaultValue={options[0]} />
            <Button className="demo-btn" onClick={() => get_db_info()}> Load Database </Button>
            <div className="demo-table light-2-background">
              <h5>{database.name}</h5>
              {
                database.tables.map(table => {
                  return <MetadataRow table={table} />
                })
              }
            </div>
          </Col>
          <Col md={8}>
            <Msger isDisabled={msgerDisabled}/>
          </Col>
         </Row>
      </Container>
    </section>
  )
}

export default Demo;