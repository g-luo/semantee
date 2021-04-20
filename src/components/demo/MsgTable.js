import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

const MsgTable = ({
  rows,
  ...props
}) => {
  return (
    <div className="msg-table">
      <Table striped bordered hover>
        <tbody>
        {
          rows.map((row) => (
            <tr>
            {
              row.map((col) => (
                <td>{col}</td>
              ))
            }
            </tr>
          ))
        }
        </tbody>
      </Table>
    </div>
  )
}

export default MsgTable;

  



