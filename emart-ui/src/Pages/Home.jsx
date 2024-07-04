import React, { useState } from "react";
import Header from "../Component/Header";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductCard from "../Component/ProductCard";
import { useQuery } from "@tanstack/react-query";
import $axios from "../lib/axios.instance";
import FilterProduct from "../Component/FilterProduct";

const Home = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");

  const { isPending, data } = useQuery({
    queryKey: ["product-list", category],
    queryFn: async () => {
      return await $axios.post("/product/list", { category: category || null });
    },
  });
  const productList = data?.data?.productList;
  if (isPending) {
    <CircularProgress />;
  }

  return (
    <Box
      sx={{
        marginTop: "7rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      <Stack spacing={4}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate("/add-product");
          }}
        >
          Add Product
        </Button>
        <FilterProduct setCategory={setCategory} />
        {category && (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setCategory(null);
            }}
          >
            Clear Filter
          </Button>
        )}
      </Stack>
      <Box
        sx={{
          margin: "5rem 0",
          display: "flex",
          flexWrap: "wrap",
          gap: "3rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {productList?.map((item, index) => {
          return (
            <ProductCard
              key={item._id}
              _id={item._id}
              image={item.image}
              name={item.name}
              brand={item.brand}
              price={item.price}
              description={item.description}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Home;
