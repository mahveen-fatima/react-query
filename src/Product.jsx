import React from 'react'
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from 'react-router-dom';
import axios from "axios";

const product = () => {

    const params = useParams();

    // console.log(params);

    // Mutations

    const mutation = useMutation({
        mutationFn: (newProduct) => {
          return axios.put(`https://dummyjson.com/products/${params.productId}`, newProduct)
        },
      })

    const fetchProduct = async () => {
        const response = await fetch(`https://dummyjson.com/product/${params.productId}`);
        const data = await response.json();
        return data;
    };


    const {
        isLoading, 
        error, 
        data: product,
    } = useQuery({
            queryKey: ["product, params.productId"], 
            queryFn: fetchProduct, 
            // staleTime: 10000
        });


        if(isLoading) {
            return <h3>Loading...</h3>
        }
    
        if(error) {
            return <h3>Error: {error.message}</h3> 
        }

        if(mutation.isLoading) {
            return <h1>updating...</h1>
        }

        if(mutation.isError) {
            return <h3>Error while updating: {mutation.error.message}</h3> 
        }

  return <>
  <div>Product: {product.title}</div>

          <button
            onClick={() => {
              mutation.mutate({title: 'updated product' })
            }}
          >
            Create Product
          </button>
  </>
  
}
export default product
