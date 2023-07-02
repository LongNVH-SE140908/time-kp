import { Center, Select, View } from "native-base";
import { UpdateTimeskeeping, getUsersTimekeeping } from "../../api/timekeeping/timekeepingapi";
import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Table, Input, MenuItem, TextField, FormControl, Snackbar, Alert } from "@mui/material";
export default function homeAdmin() {
  var data = localStorage.getItem("userData")?.toString();
  var user = JSON.parse(data || "");
  const [timekp, setTimekp] = useState();
  const [isupdate, setIsupdate] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openToast, setOpenToast] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenToast = () => setOpenToast(true);
  const handleCloseToast = () => setOpenToast(false);
  const [timeEdit, setTimeEdit] = useState(0);

  const [dataShowModal, setDataShowModal] = useState({
    header: "",
    lstData: [],
  });
  useEffect(() => {
    async function fetchData() {
      var temp = [];
      await getUsersTimekeeping(user.token).then((res) => {
        temp = res;
      });

      if (!temp.isError) {
        setTimekp(temp.data);
      }
    }
    fetchData();
  }, [isupdate]);

  function showUser(user, data) {
    let clone = dataShowModal;
    clone.header = user;
    clone.lstData = data;
    console.log(data);
    setDataShowModal(clone);
    handleOpen();
  }
  function saveData(e, name, time) {
    var mint = e.target.previousSibling.previousSibling.children[1].children[0].value;
    var isVl = e.target.previousSibling.children[1].children[0].value;
    console.log(timekp);
    timekp.map((vl) => {
      vl._id = "";
      if (vl.user_name == name) {
        vl.clock_time.map((vls) => {
          vls.info.detail.map(async (vlss) => {
            if (new Date(vlss.check_in).getTime() == new Date(time).getTime()) {
              vlss.isValid = isVl;
              timekp._id = "";
              vlss.total_minute = mint;
              await UpdateTimeskeeping(user.token, name, vl).then((res) => {
                console.log(res);
                if (!res.isError) {
                  setOpenToast(true);
                  setIsupdate(!isupdate);
                }
              });
            }
          });
        });
      }
    });
    // await UpdateTimeskeeping(user.token,name,)
  }
  return (
    <Center>
      {Array.isArray(timekp)
        ? timekp.map((v, k) => {
            return (
              <>
                <Button key={k} style={{ marginTop: 10 }} onClick={() => showUser(v.user_name, v.clock_time)}>
                  {v.user_name}
                </Button>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="left">Check In</TableCell>
                        <TableCell align="left">Check Out</TableCell>
                        <TableCell align="left">Total Minute</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {v.clock_time.map((row, id) => (
                        <TableRow key={row.date} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                          <TableCell component="th" scope="row">
                            {row.date}
                          </TableCell>
                          <TableCell align="right">
                            {row.info.detail.map((vls, ids) => {
                              return (
                                <>
                                  <TextField
                                    label="Check in"
                                    size="small"
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                    variant="filled"
                                    value={vls.check_in ? new Date(vls.check_in).toLocaleTimeString() : "Not Valid"}
                                    readOnly
                                    style={{ width: 100, display: "flex", flexDirection: "column", marginTop: 2, marginBottom: 2 }}
                                  ></TextField>
                                  <br></br>
                                </>
                              );
                            })}
                          </TableCell>
                          <TableCell align="right">
                            {row.info.detail.map((vls, ids) => {
                              return (
                                <>
                                  <TextField
                                    label="Check out"
                                    size="small"
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                    variant="filled"
                                    value={vls.check_out ? new Date(vls.check_out).toLocaleTimeString() : "Not Valid"}
                                    readOnly
                                    style={{ width: 100, display: "flex", flexDirection: "column", marginTop: 2, marginBottom: 2 }}
                                  ></TextField>
                                  <br></br>
                                </>
                              );
                            })}
                          </TableCell>
                          <TableCell align="right">
                            {row.info.detail.map((vls, ids) => {
                              return (
                                <>
                                  <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <TextField
                                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                      label="Total Minute"
                                      size="small"
                                      InputProps={{
                                        readOnly: false,
                                      }}
                                      defaultValue={vls.total_minute}
                                      style={{ width: 100, marginTop: 6, marginBottom: 4 }}
                                      helperText="( 0-120 min)"
                                    ></TextField>

                                    <TextField
                                      inputProps={{ inputMode: "numeric", pattern: "[0-1]" }}
                                      label="Is Valid"
                                      size="small"
                                      InputProps={{
                                        readOnly: false,
                                      }}
                                      defaultValue={vls.isValid}
                                      helperText="( 0 or 1)"
                                      style={{ width: 100, marginTop: 6, marginBottom: 4 }}
                                    ></TextField>
                                    <Button onClick={(e) => saveData(e, v.user_name, vls.check_in)}>Save</Button>
                                  </Box>
                                </>
                              );
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            );
          })
        : ""}
      <Snackbar open={openToast} autoHideDuration={6000} onClose={handleCloseToast}>
        <Alert onClose={handleCloseToast} severity="success" sx={{ marginBottom: 5, width: "100%" }}>
          Update Success
        </Alert>
      </Snackbar>
    </Center>
  );
}
