import { Center, ScrollView, Select, View } from "native-base";
import { UpdateTimeskeeping, getUsersTimekeeping } from "../../api/timekeeping/timekeepingapi";
import React, { useEffect, useState } from "react";
import { getAllUser } from "../../api/user/userapi";
import { Stack, Item, Paper, styled, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Snackbar, Alert, TextField } from "@mui/material";
import { getAllVoucher } from "../../api/voucher/voucher";

export default function manaVoucher() {
  var data = localStorage.getItem("userData")?.toString();
  var user = JSON.parse(data || "");
  const [dataVoucher, setDataVoucher] = useState([]);
  const [dataUserChange, setDataUserChange] = useState([]);
  useEffect(() => {
    async function fetchData() {
      var temp = [];
      await getAllVoucher(user.token).then((res) => {
        temp = res;
      });

      if (!temp.isError) {
        setDataVoucher(temp.data);
      }
    }
    fetchData();
  }, []);

  function handleChangeFn(nb) {
    console.log(nb);
  }
  function handleChangeLn(nb) {}
  function handleChangeP(nb) {}
  function handleChangeAd(nb) {}
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <ScrollView>
      <Center>
        {Array.isArray(dataVoucher)
          ? dataVoucher.map((v, k) => {
              return (
                <>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                        {/* <TableRow>
                          <TableCell>First Name</TableCell>
                          <TableCell align="left">Last Name</TableCell>
                          <TableCell align="left">Phone Number</TableCell>
                          <TableCell align="left">Address</TableCell>
                        </TableRow> */}
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <TextField
                              onChange={() => {
                                handleChangeFn(k);
                              }}
                              label="Voucher"
                              defaultValue={v.voucher}
                            />
                          </TableCell>

                          <TableCell align="left">
                            <TextField
                              onChange={() => {
                                handleChangeLn(k);
                              }}
                              label="Is Use"
                              defaultValue={v.isUse}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <TextField
                              onChange={() => {
                                handleChangeP(k);
                              }}
                              label="Discount Percent"
                              defaultValue={v.discountPercent}
                            />
                          </TableCell>
                          <TableCell align="left">
                            <TextField
                              onChange={() => {
                                handleChangeAd(k);
                              }}
                              label="User Used"
                              defaultValue={v.userUse}
                            />
                          </TableCell>
                          <Button>Save</Button>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              );
            })
          : ""}
        {/* <Snackbar open={openToast} autoHideDuration={6000} onClose={handleCloseToast}>
          <Alert onClose={handleCloseToast} severity="success" sx={{ marginBottom: 5, width: "100%" }}>
            Update Success
          </Alert>
        </Snackbar> */}
      </Center>
    </ScrollView>
  );
}
