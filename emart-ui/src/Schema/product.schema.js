import * as Yup from "yup";
import { productCategories } from "../Constants/general.constant";

const productSchema = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .trim()
    .max(55, "Name must be at max 55 characters."),
  brand: Yup.string()
    .required("Brand is required.")
    .trim()
    .max(55, "Brand must be at max 55 characters."),
  price: Yup.number()
    .min(0, "Price must be positive number.")
    .required("Price is required."),
  quantity: Yup.number()
    .min(1, "Quantity must be at least 1.")
    .required("Quantity is required."),
  category: Yup.string()
    .trim()
    .required("Category is required.")
    .oneOf(productCategories),
  description: Yup.string()
    .trim()
    .required()
    .min(200, "Description must be at least 200 characters.")
    .max(1000, "Description must be at max 1000 characters."),
  hasFreeShipping: Yup.boolean().default(false),
});

export default productSchema;
