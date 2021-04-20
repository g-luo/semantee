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

  const [initInfo, setInitInfo] = useState({"options": null})
  const defaultValue = "Flight Company"
  const options = [{value: defaultValue, label: defaultValue}]

  const get_db_info = () => {
    axios.get("https://semantee.herokuapp.com/get_db_info")
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

  const get_init_info = () => {
    axios.get("https://semantee.herokuapp.com/get_init_info")
    .then (
      (response) => {
        setInitInfo(response.data);
      }
    )
    .catch(
      (error) => {
        console.log("Error retrieving initial info");
      }
    );
  }

  const get_info = (e) => {
    // Set disabled to true so they can't press multiple times
    e.target.disabled = true
    get_init_info()
    get_db_info()
  }

  const [msgerDisabled, setMsgerDisabled] = useState(true);

  // Reload the database every time the page is reloaded
  axios.get("https://semantee.herokuapp.com/reset").then().catch((error) => {})

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className={innerClasses}>
        <Row>
          <Col md={4}>
            <Select options={options} defaultValue={options[0]} />
            <Row>
              <Col md={6}>
                <Button className="demo-btn" onClick={(e) => get_info(e)}> Load Database </Button>
              </Col>
              <Col md={6}>
                <Button className="demo-btn-reset" onClick={() => window.location.reload()}> Reset Database</Button>
              </Col>
            </Row>
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
            <Msger isDisabled={msgerDisabled} initInfo={initInfo}/>
          </Col>
         </Row>
      </div>
    </section>
  )
}

export default Demo;