import fetch from "isomorphic-unfetch";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Vehicles = ({ vehicleList }) => {
  const classes = useStyles();

  return (
    <div style={{ margin: "2rem" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Model</TableCell>
              <TableCell align="right">OwnerId</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicleList.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell component="th" scope="row">
                  {vehicle.id}
                </TableCell>
                <TableCell align="right">{vehicle.brand}</TableCell>
                <TableCell align="right">{vehicle.model}</TableCell>
                <TableCell align="right">{vehicle.ownerId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Vehicles;

Vehicles.getInitialProps = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/vehicles");
    const vehicleList = await response.json();
    return { vehicleList };
  } catch (error) {
    console.log(error);
  }
};
