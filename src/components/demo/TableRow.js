import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';

const TableRow = ({
  table,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  console.log(table)
  return (
    <div className="table-row">
      <div className="table-name" onClick={() => setOpen(!open)}>
        <b>{table.name}</b>
        <span> {open ? '-' : '+'} </span>
      </div>
      <div className="table-schema">
        <Collapse in={open}>
        <div>
          {
            table.schema.map(item => {
              return (
                <div> 
                  {item.key} 
                  <span className="table-schema-type">
                    {item.type}
                  </span>
                </div>
              )
            })
          }
        </div>
        </Collapse>
      </div>
    </div>
  )
}

export default TableRow;



  



