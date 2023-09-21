import React, { useState } from "react";
import ProductItem from "./ProductItem";
import { useQuery, useQueryClient } from "react-query";
import useDebounce from "../Hook/useDebounce";
import { GetProductsApiResponse, Product } from "../utils/type";

interface ProductListProps {
  searchProduct: string;
}

const ProductList = ({ searchProduct }: ProductListProps) => {
  const [isOpen, setOpen] = useState("");
  const queryClient = useQueryClient();

  // delay input typing
  const debouncedSearchQuery = useDebounce(searchProduct, 600);
  const { data, isLoading, isError, refetch } = useQuery(
    ["productList", debouncedSearchQuery],
    () =>
      fetch(
        `https://dummyjson.com/products/search?q=${debouncedSearchQuery}&limit=40&select=title,price,images,category`
      ).then((response) => response.json()),
    {
      staleTime: 10000,
      enabled: true,
    }
  );

  const handleSelectTab = (openTab: string) => {
    // current tab => close
    if (openTab === isOpen) {
      setOpen("");
    } else {
      setOpen(openTab);
    }
    // refetch();
  };

  const query: GetProductsApiResponse | undefined = queryClient.getQueryData([
    "productList",
    searchProduct,
  ]);
  // Search Local
  const newData = query?.products.filter((item: Product, index: Number) => {
    if (item?.title.toLowerCase().includes(searchProduct)) {
      return query;
    }
  });

  return (
    <div className="mt-6 ">
      <div className="flex items-center">
        <p className="font-semibold text-xl leading-6 ">Product List</p>
        <hr className="ml-4  h-[1px] border-dashed w-[73%] border-[#D9E0E8]"></hr>
      </div>

      <div className="mt-2  h-[718px] overflow-y-auto">
        <>
          <div
            onClick={() => handleSelectTab("mobile")}
            className="flex items-center hover:bg-[#F8F8F9] active:bg-[#F2F4F6] py-3 px-4 hover:rounded-lg  cursor-pointer"
          >
            {isOpen === "mobile" ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.3536 9.64645C16.5488 9.84171 16.5488 10.1583 16.3536 10.3536L12.3536 14.3536C12.2598 14.4473 12.1326 14.5 12 14.5C11.8674 14.5 11.7402 14.4473 11.6464 14.3536L7.64645 10.3536C7.45118 10.1583 7.45118 9.84171 7.64645 9.64645C7.84171 9.45118 8.15829 9.45118 8.35355 9.64645L12 13.2929L15.6464 9.64645C15.8417 9.45118 16.1583 9.45118 16.3536 9.64645Z"
                  fill="#202020"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.64645 7.64645C9.84171 7.45118 10.1583 7.45118 10.3536 7.64645L14.3536 11.6464C14.5488 11.8417 14.5488 12.1583 14.3536 12.3536L10.3536 16.3536C10.1583 16.5488 9.84171 16.5488 9.64645 16.3536C9.45118 16.1583 9.45118 15.8417 9.64645 15.6464L13.2929 12L9.64645 8.35355C9.45118 8.15829 9.45118 7.84171 9.64645 7.64645Z"
                  fill="#B1B8C0"
                />
              </svg>
            )}

            <p className="font-semibold text-lg leading-[22px]">Mobile</p>
          </div>
          <div className={`pl-8 ${isOpen === "mobile" ? "block" : "hidden"}`}>
            {newData?.map((phone: Product) => {
              if (phone.category !== "smartphones") return;
              return (
                <ProductItem phone={phone} searchProduct={searchProduct} />
              );
            })}
          </div>
        </>

        <>
          <div
            onClick={() => handleSelectTab("desktop")}
            className="flex items-center hover:bg-[#F8F8F9] active:bg-[#F2F4F6] py-3 px-4 hover:rounded-lg  cursor-pointer"
          >
            {isOpen === "desktop" ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.3536 9.64645C16.5488 9.84171 16.5488 10.1583 16.3536 10.3536L12.3536 14.3536C12.2598 14.4473 12.1326 14.5 12 14.5C11.8674 14.5 11.7402 14.4473 11.6464 14.3536L7.64645 10.3536C7.45118 10.1583 7.45118 9.84171 7.64645 9.64645C7.84171 9.45118 8.15829 9.45118 8.35355 9.64645L12 13.2929L15.6464 9.64645C15.8417 9.45118 16.1583 9.45118 16.3536 9.64645Z"
                  fill="#202020"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.64645 7.64645C9.84171 7.45118 10.1583 7.45118 10.3536 7.64645L14.3536 11.6464C14.5488 11.8417 14.5488 12.1583 14.3536 12.3536L10.3536 16.3536C10.1583 16.5488 9.84171 16.5488 9.64645 16.3536C9.45118 16.1583 9.45118 15.8417 9.64645 15.6464L13.2929 12L9.64645 8.35355C9.45118 8.15829 9.45118 7.84171 9.64645 7.64645Z"
                  fill="#B1B8C0"
                />
              </svg>
            )}
            <p className="font-semibold text-lg leading-[22px]">Desktop</p>
          </div>
          <div className={`pl-8 ${isOpen === "desktop" ? "block" : "hidden"}`}>
            {newData?.map((phone: Product) => {
              if (phone.category !== "laptops") return;
              return (
                <ProductItem phone={phone} searchProduct={searchProduct} />
              );
            })}
          </div>
        </>

        <>
          <div
            onClick={() => handleSelectTab("Other")}
            className="flex items-center hover:bg-[#F8F8F9] active:bg-[#F2F4F6] py-3 px-4 hover:rounded-lg  cursor-pointer"
          >
            {isOpen === "Other" ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.3536 9.64645C16.5488 9.84171 16.5488 10.1583 16.3536 10.3536L12.3536 14.3536C12.2598 14.4473 12.1326 14.5 12 14.5C11.8674 14.5 11.7402 14.4473 11.6464 14.3536L7.64645 10.3536C7.45118 10.1583 7.45118 9.84171 7.64645 9.64645C7.84171 9.45118 8.15829 9.45118 8.35355 9.64645L12 13.2929L15.6464 9.64645C15.8417 9.45118 16.1583 9.45118 16.3536 9.64645Z"
                  fill="#202020"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.64645 7.64645C9.84171 7.45118 10.1583 7.45118 10.3536 7.64645L14.3536 11.6464C14.5488 11.8417 14.5488 12.1583 14.3536 12.3536L10.3536 16.3536C10.1583 16.5488 9.84171 16.5488 9.64645 16.3536C9.45118 16.1583 9.45118 15.8417 9.64645 15.6464L13.2929 12L9.64645 8.35355C9.45118 8.15829 9.45118 7.84171 9.64645 7.64645Z"
                  fill="#B1B8C0"
                />
              </svg>
            )}
            <p className="font-semibold text-lg leading-[22px]">Other</p>
          </div>
          <div className={`pl-8 ${isOpen === "Other" ? "block" : "hidden"}`}>
            {newData?.map((phone: Product) => {
              if (
                phone.category === "smartphones" ||
                phone.category === "laptops"
              )
                return;
              return (
                <ProductItem phone={phone} searchProduct={searchProduct} />
              );
            })}
          </div>
        </>
      </div>
    </div>
  );
};

export default ProductList;
