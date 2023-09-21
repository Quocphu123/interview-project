import React from "react";
import { useQueryClient } from "react-query";
import { GetProductsApiResponse, Product } from "../utils/type";

interface ProductItemProps {
  phone: Product;
  searchProduct: string;
}

const ProductItem = ({ phone, searchProduct }: ProductItemProps) => {
  const queryClient = useQueryClient();

  const handleChangeTitle = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: Number
  ) => {
    // get input change
    const value = e.target.value;
    // get data in cache

    const query: GetProductsApiResponse | undefined = queryClient.getQueryData([
      "productList",
      searchProduct,
    ]);

    if (!query) return;
    // loop data in cache to get the element change
    const newData = query.products.map((item: Product) => {
      if (item.id === id) {
        // change data input into data cache
        item.title = value;
      }
      return item;
    });
    query.products = newData;
    queryClient.setQueryData(["productList", searchProduct], query);

    const allQuery: GetProductsApiResponse | undefined =
      queryClient.getQueryData(["productList", ""]);
    if (!allQuery) return;
    const allData = allQuery.products.map((item: Product) => {
      if (item.id === id) {
        item.title = value;
      }
      return item;
    });
    allQuery.products = allData;
    queryClient.setQueryData(["productList", ""], allQuery);
  };

  return (
    <div className="flex items-center py-3 px-2">
      <div>
        <img
          src={phone.images[0]}
          className="rounded-lg w-[72px] h-[72px]"
          alt="#"
        />
      </div>
      <div className="ml-8">
        <input
          onChange={(e) => handleChangeTitle(e, phone.id)}
          value={phone.title}
          className="hover:bg-[#F8F8F9]   rounded-lg py-[6px] px-2
          block   text-sm   active:bg-[#F2F4F6] placeholder:font-semibold placeholder:text-[#353C49] focus:outline-[#6713EF] "
          type="text"
          placeholder={phone.title}
        />
        <p className="mt-[10px] px-2 font-normal text-sm leading-[18px] text-[#676E7B]">
          $ {phone.price}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
