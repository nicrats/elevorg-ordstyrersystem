import React from "react";
import { useTable } from "react-table";

import styles from '../styles/index.module.scss'

var innlegg = [
  {Number: "1", Sak: "innlegg"},
  {Number: "2", Sak: "Replikk"},
  {Number: "1", Sak: "Opplysning"},
  {Number: "2", Sak: "SvarReplikk"}
];

const data = [
  { Number: "1", Name: "Sondre Vinding", Org: "Elevorganisasjonen i Oslo Vest" },
  { Number: "2", Name: "Daniel Martinsen", Org: "Elevorganisasjonen i Viken" }
];

function Count() {
  const [counter, setCounter] = React.useState(60);

  // Third Attempts
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div className="Count">
      <div>Countdown: {counter}</div>
    </div>
  );
}




const columns = [
  {
    Header: "Deltager info",
    columns: [
      {
        Header: "Number",
        accessor: "Number"
      },
      {
        Header: "Name",
        accessor: "Name"
      },
      {
        Header: "Org",
        accessor: "Org"
      }
    ]
  },
];

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};


export default function App() {
  return (
        <div className={styles.container}>
            <main>    
                
                <Table columns={columns} data={data} />
            </main>
            <footer>
                <a
                href="https://elev.no"
                target="_blank"
                rel="noopener noreferrer"
                >
                Levert for{' '}
                <img src="./logo.png" alt="EO Logo" className="logo" />
                </a>
             </footer>
        </div>

  );
}