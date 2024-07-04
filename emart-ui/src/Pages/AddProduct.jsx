import { Formik } from "formik";
import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import productSchema from "../Schema/product.schema";
import { productCategories } from "../Constants/general.constant";
import Header from "../Component/Header";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import $axios from "../lib/axios.instance";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [localUrl, setLocalUrl] = useState("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);

  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["add-product"],
    mutationFn: async (values) => {
      return await $axios.post("/product/add", values);
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.log(error.response.data.message);
    },
  });

  if (isPending || imageUploadLoading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <Formik
        initialValues={{
          name: "",
          brand: "",
          price: 0,
          quantity: 1,
          category: "",
          description: "",
          hasFreeShipping: false,
        }}
        validationSchema={productSchema}
        onSubmit={async (values) => {
          if (image) {
            const cloudName = "dlkcko4n6";
            const upload_preset = "ncit-preset";

            const formData = new FormData();

            formData.append("cloud_name", cloudName);
            formData.append("file", image);
            formData.append("upload_preset", upload_preset);

            try {
              setImageUploadLoading(true);
              const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
                formData
              );
              setImageUploadLoading(false);
              
              const imageUrl = res?.data?.secure_url;
              values.image = imageUrl;
            } catch (error) {
              console.log("File upload failed.");
            }
          }
          mutate(values);
        }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                margin: "7rem 0 4rem",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                padding: "1rem",
                minWidth: "400px",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <Typography variant="h4">Add Product</Typography>
              {localUrl && (
                <img
                  src={localUrl}
                  alt=""
                  width={"100%"}
                  height={"250px"}
                  style={{ objectFit: "cover" }}
                />
              )}

              <FormControl>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Image
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => {
                      const file = event?.target?.files[0];
                      setImage(file);
                      setLocalUrl(URL.createObjectURL(file));
                    }}
                  />
                </Button>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  required
                  label="Name"
                  {...formik.getFieldProps("name")}
                />

                {formik.touched.name && formik.errors.name ? (
                  <FormHelperText error>{formik.errors.name}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  required
                  label="Brand"
                  {...formik.getFieldProps("brand")}
                />

                {formik.touched.brand && formik.errors.brand ? (
                  <FormHelperText error>{formik.errors.brand}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  required
                  type="number"
                  label="Price"
                  {...formik.getFieldProps("price")}
                />

                {formik.touched.price && formik.errors.price ? (
                  <FormHelperText error>{formik.errors.price}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  required
                  type="number"
                  label="Quantity"
                  {...formik.getFieldProps("quantity")}
                />

                {formik.touched.quantity && formik.errors.quantity ? (
                  <FormHelperText error>
                    {formik.errors.quantity}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category" {...formik.getFieldProps("category")}>
                  {productCategories.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography>Free shipping</Typography>
                <Checkbox {...formik.getFieldProps("hasFreeShipping")} />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  multiline
                  rows={7}
                  required
                  label="Description"
                  {...formik.getFieldProps("description")}
                />

                {formik.touched.description && formik.errors.description ? (
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                ) : null}
              </FormControl>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="success"
              >
                submit
              </Button>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AddProduct;
