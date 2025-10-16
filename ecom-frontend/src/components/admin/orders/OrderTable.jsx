import { DataGrid } from "@mui/x-data-grid";
import { adminOrderTableColumn } from "../../helper/tableColumn";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Modal from "../../shared/Modal";
import UpdateOrderForm from "./UpdateOrderForm";
import { FaBoxOpen } from "react-icons/fa";

const OrderTable = ({ adminOrder, pagination }) => {
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber !== undefined ? pagination.pageNumber + 1 : 1
  );

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const tableRecords = adminOrder?.map((item) => ({
    id: item.orderId,
    email: item.email,
    totalAmount: item.totalAmount,
    status: item.orderStatus,
    date: item.orderDate,
  }));

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const handleEdit = (order) => {
    setSelectedItem(order);
    setUpdateOpenModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-3xl shadow-xl mb-6 animate-bounce-slow">
            <FaBoxOpen size={38} className="text-white" />
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-400 bg-clip-text text-transparent mb-3 drop-shadow-lg">
            Order Dashboard
          </h1>

          <p className="text-gray-600 text-lg font-medium mb-1">
            Manage and track your orders seamlessly
          </p>

          {/* Updated Highlight Text */}
          <p className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 drop-shadow-xl tracking-wider uppercase">
  Total Orders: {pagination?.totalElements || 0}

          </p>
        </div>
      </div>

      {/* Glass Table */}
      <div className="relative bg-gradient-to-br from-white/80 via-blue-50/70 to-emerald-50/70 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_rgba(56,189,248,0.15)] border border-blue-100/50 hover:shadow-[0_12px_48px_rgba(56,189,248,0.25)] transition-all duration-500 overflow-hidden">

        {/* Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-400" />

        {/* Table */}
        <div className="p-6 pt-8">
          <DataGrid
            rows={tableRecords}
            columns={adminOrderTableColumn(handleEdit)}
            paginationMode="server"
            rowCount={pagination?.totalElements || 0}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: pagination?.pageSize || 10,
                  page: currentPage - 1,
                },
              },
            }}
            onPaginationModelChange={handlePaginationChange}
            disableRowSelectionOnClick
            disableColumnResize
            pageSizeOptions={[pagination?.pageSize || 10]}
            pagination
            sx={{
              border: "none",
              fontFamily: "'Inter', sans-serif",
              minHeight: 420,
              "& .MuiDataGrid-columnHeaders": {
                background:
                  "linear-gradient(90deg, rgba(240,249,255,0.9), rgba(236,253,245,0.9))",
                borderBottom: "2px solid rgba(147,197,253,0.4)",
                fontSize: "0.95rem",
                fontWeight: 700,
                color: "#064e3b", // deep teal-green
                letterSpacing: "0.3px",
              },
              "& .MuiDataGrid-cell": {
                borderColor: "rgba(243,244,246,0.6)",
                fontSize: "0.9rem",
                color: "#1e293b",
                transition: "all 0.3s ease",
              },
              "& .MuiDataGrid-row:hover": {
                background:
                  "linear-gradient(90deg, rgba(219,234,254,0.5), rgba(204,251,241,0.5))",
                transform: "scale(1.004)",
                boxShadow: "0 4px 14px rgba(45,212,191,0.2)",
                borderRadius: "8px",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "2px solid rgba(191,219,254,0.5)",
                backgroundColor: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(10px)",
              },
              "& .MuiTablePagination-root": {
                color: "#475569",
                fontWeight: 500,
              },
              "& .MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "& .MuiDataGrid-overlay": {
                background:
                  "linear-gradient(to bottom right, rgba(191,219,254,0.1), rgba(204,251,241,0.1))",
                color: "#64748b",
                fontStyle: "italic",
              },
            }}
          />
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={updateOpenModal}
        setOpen={setUpdateOpenModal}
        title="Update Order Status"
      >
        <UpdateOrderForm
          setOpen={setUpdateOpenModal}
          open={updateOpenModal}
          loader={loader}
          setLoader={setLoader}
          selectedId={selectedItem.id}
          selectedItem={selectedItem}
        />
      </Modal>
    </div>
  );
};

export default OrderTable;
