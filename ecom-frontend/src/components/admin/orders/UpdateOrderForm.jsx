import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa';
import Spinners from '../../shared/Spinners';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatusFromDashboard } from '../../../store/actions';
import toast from 'react-hot-toast';

const ORDER_STATUSES = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Accepted",
];

const UpdateOrderForm = ({ setOpen, selectedId, selectedItem, loader, setLoader}) => {
    const [orderStatus, setOrderStatus] = useState(selectedItem?.status || 'Accepted');
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
    const isSeller = user && user?.roles?.includes("ROLE_SELLER");

    const updateOrderStatus = (e) => {
        e.preventDefault();
        if (!orderStatus) {
            setError("Order status is required");
            return;
        }
        
        console.log('Updating order:', selectedId, 'to status:', orderStatus);
        console.log('User roles - isAdmin:', isAdmin, 'isSeller:', isSeller);
        
        dispatch(updateOrderStatusFromDashboard(
            selectedId,
            orderStatus,
            toast,
            setLoader,
            isAdmin,
            isSeller
        ));
        
        // Close modal after dispatching
        setOpen(false);
    };

  return (
    <div className='py-6 relative min-h-[280px]'>
        <form className='space-y-6' onSubmit={updateOrderStatus}>
            {/* Current Order Info */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">Order ID</p>
                <p className="text-lg font-bold text-gray-800">#{selectedId}</p>
                <p className="text-sm text-gray-600 mt-2">Current Status</p>
                <p className="text-md font-semibold text-blue-600">{selectedItem?.status}</p>
            </div>

            <FormControl fullWidth variant='outlined' error={!!error}>
                <InputLabel id="order-status-label">New Order Status</InputLabel>
                <Select
                    labelId='order-status-label'
                    label='New Order Status'
                    value={orderStatus}
                    onChange={(e) => {
                        setOrderStatus(e.target.value);
                        setError("");
                    }}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#e5e7eb',
                            borderWidth: '2px',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#3b82f6',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#8b5cf6',
                        }
                    }}>
                    
                    {
                        ORDER_STATUSES.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))
                    }

                </Select>

                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>

            <div className='flex w-full justify-between items-center gap-4 pt-4'>
                <button
                    type="button"
                    disabled={loader}
                    onClick={() => setOpen(false)}
                    className='flex-1 py-3 px-6 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 disabled:opacity-50'>
                    Cancel
                </button>

                <button
                    type='submit'
                    disabled={loader}
                    className='flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100'>
                    {loader ? (
                        <div className='flex gap-2 items-center justify-center'>
                            <Spinners /> Updating...
                        </div>
                    ) : (
                        "Update Status"
                    )}
                </button>
            </div>
        </form>

    </div>
  )
}

export default UpdateOrderForm