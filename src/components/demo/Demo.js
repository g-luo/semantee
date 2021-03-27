import React, { Component } from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import { Container, Row, Col } from 'react-bootstrap';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const outerClasses = classNames(
  'hero section center-content',
  'has-top-divider',
  'has-bottom-divider',
  'has-bg-color',
);

const Demo = ({
  ...props
}) => (
  <section
    {...props}
    className={outerClasses}
  >
    <Container>
      <Row>
        <Col md={3}>
          <Select options={options} />
        </Col>
        <Col md={9}>
        </Col>
       </Row>
    </Container>
  </section>
)

export default Demo;