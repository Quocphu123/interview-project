import React, { useState } from "react";
import "./App.css";
import SearchInput from "./Components/SearchInput";
import ProductList from "./Components/ProductList";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
const queryClient = new QueryClient();

function App() {
  const [searchProduct, setSearchProduct] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-[#F0E7FD] h-screen flex items-center justify-center">
        <div className=" bg-[#FFFFFF] p-6 shadow-[0px_0px_4px_0px_#052B611F] rounded-3xl w-[528px] h-[880px]">
          <SearchInput
            setSearchProduct={setSearchProduct}
            searchProduct={searchProduct}
          />
          <ProductList searchProduct={searchProduct} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
