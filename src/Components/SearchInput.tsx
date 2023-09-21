import React from "react";

interface SearchInputProps {
  setSearchProduct: Function;
  searchProduct: string | undefined;
}

const SearchInput = ({ setSearchProduct, searchProduct }: SearchInputProps) => {
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(e.target.value.toLowerCase());
  };

  const onClearSearch = () => {
    setSearchProduct("");
  };

  return (
    <div className="flex items-center ">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            width="18"
            height="18"
            className=" text-gray-500  focus:text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              d="M7.87211 14.5383C9.35126 14.538 10.7878 14.0428 11.9529 13.1316L15.0271 16.2058C15.3525 16.5312 15.8801 16.5312 16.2054 16.2058C16.5308 15.8804 16.5308 15.3528 16.2054 15.0275L13.1313 11.9533C14.0429 10.788 14.5384 9.35115 14.5388 7.87162C14.5388 4.19579 11.5479 1.20496 7.87211 1.20496C4.19628 1.20496 1.20544 4.19579 1.20544 7.87162C1.20544 11.5475 4.19628 14.5383 7.87211 14.5383ZM7.87211 2.87162C10.6296 2.87162 12.8721 5.11412 12.8721 7.87162C12.8721 10.6291 10.6296 12.8716 7.87211 12.8716C5.11461 12.8716 2.87211 10.6291 2.87211 7.87162C2.87211 5.11412 5.11461 2.87162 7.87211 2.87162Z"
              fill="#B1B8C0"
            />
          </svg>
        </div>
        <input
          value={searchProduct}
          onChange={onSearch}
          className="bg-[#F8F8F9] border border-[#D9E0E8] w-[280px] h-[42px] rounded-[50px] py-3 px-4
          block  p-4 pl-10 text-sm  hover:border-[#D1B8FA] focus:outline-[#6713EF] "
          type="text"
          placeholder=" Search"
        />

        <button
          className={`${
            searchProduct ? "block" : "hidden"
          }   absolute inset-y-0 right-3 `}
          onClick={onClearSearch}
        >
          <div className=" flex items-center  pointer-events-none w-6 h-6 p-1 rounded-[15px] hover:bg-[#F8F8F9] active:bg-[#F2F4F6] border-2 border-[#F8F8F9]  focus:border-[#D1B8FA] focus:border-2 hover:rounded-full">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.3751 3.62502C12.0299 3.27983 11.4703 3.27979 11.1251 3.62494L7.99956 6.75L4.87489 3.62505C4.52972 3.27986 3.97006 3.27986 3.62489 3.62506C3.27976 3.97021 3.27976 4.52979 3.62489 4.87494L6.74967 8L3.62489 11.1251C3.27976 11.4702 3.27976 12.0298 3.62489 12.3749C3.97006 12.7201 4.52972 12.7201 4.87489 12.3749L7.99956 9.25L11.1251 12.3751C11.4703 12.7202 12.0299 12.7202 12.3751 12.375C12.7202 12.0298 12.7202 11.4702 12.3751 11.125L9.25033 8L12.3751 4.87498C12.7202 4.5298 12.7202 3.97019 12.3751 3.62502Z"
                fill="#353C49"
              />
            </svg>
          </div>
        </button>
      </div>

      <button
        onClick={onClearSearch}
        className={`${
          searchProduct ? "visible" : "invisible"
        } ml-[10px] py-3 px-4 border-2 hover:bg-[#F8F8F9] rounded-lg active:bg-[#F2F4F6]  border-white  focus:border-[#D1B8FA] focus:border-2`}
      >
        Cancel
      </button>
    </div>
  );
};

export default SearchInput;
