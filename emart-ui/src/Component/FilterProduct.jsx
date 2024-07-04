import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { productCategories } from "../Constants/general.constant";

const FilterProduct = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        sx={{ marginTop: "2rem" }}
        variant="contained"
        color="success"
        onClick={handleClickOpen}
      >
        filter product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Filter product</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              category: "",
            }}
            validationSchema={Yup.object({
              category: Yup.string()
                .trim()
                .required("Category is required.")
                .oneOf(productCategories),
            })}
            onSubmit={(values) => {
              props.setCategory(values.category);
              handleClose();
            }}
          >
            {(formik) => {
              return (
                <form
                  onSubmit={formik.handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "1rem",
                    minWidth: "400px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      label="Category"
                      {...formik.getFieldProps("category")}
                    >
                      {productCategories.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>

                  <Box sx={{ display: "flex", gap: "10px", width: "100%" }}>
                    <Button
                      variant="contained"
                      color="warning"
                      fullWidth
                      onClick={handleClose}
                    >
                      cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      fullWidth
                    >
                      submit
                    </Button>
                  </Box>
                </form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default FilterProduct;
