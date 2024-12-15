import React from "react";
import { MdMode, MdOutlineAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import Loading from "../../components/Loading";
import { useFetchAllBooksQuery } from "../../redux/store";
import img from "../../assets/avatar.png";

const Inventory = () => {
  const { data, isLoading } = useFetchAllBooksQuery();
  console.log("🚀 ~ Inventory ~ data:", data)

  // Key function for row identification
  const KeyFn = (inventory) => inventory._id;

  // Table headers configuration
  const headers = [
    {
      hide: true,
      label: "Image",
      render: (inventory) => (
        <img
          className="w-10 h-10 rounded-full"
          src={inventory.coverImage || img} // Use dynamic image if available, fallback to default
          alt={inventory.title || "Book Image"}
        />
      ),
      showValue: () => "lg:table-cell",
    },
    {
      label: "Name",
      render: (inventory) => inventory.title,
    },
    {
      hide: true,
      label: "Category",
      render: (inventory) => inventory.category,
      showValue: () => "md:table-cell",
    },
    {
      hide: true,
      label: "Price",
      render: (inventory) => `$${inventory.newPrice.toFixed(2)}`,
      showValue: () => "sm:table-cell",
    },
    {
      label: "Edit",
      render: (inventory) => (
        <MdMode
          id={inventory._id}
          className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
        />
      ),
    },
  ];

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading message="Fetching inventory, please wait..." />
      </div>
    );
  }

  return (
    <section className="py-8 h-full w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
      {/* Header Section */}
      <div className="flex items-center justify-between py-4 mb-6">
        <h2 className="text-4xl font-extrabold font-serif text-gray-700">
          Inventory
        </h2>
        <Link
          to="/dashboard/add-to-inventory"
          className="inline-flex items-center gap-2 px-5 py-3 text-white bg-gray-600 hover:bg-gray-700 rounded-md shadow-md">
          <MdOutlineAdd className="h-6 w-6" />
          Add To Inventory
        </Link>
      </div>

      {/* Table Section */}
      <div className="block w-full shadow-lg">
        {data && <Table datas={data} config={headers} KeyFn={KeyFn} />}
      </div>
    </section>
  );
};

export default Inventory;
