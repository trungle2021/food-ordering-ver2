import { Box } from '@mui/system';
import React, { SyntheticEvent } from 'react'
import { DateRangePicker, Dropdown } from 'rsuite';
import { SearchBarReactSuite } from "~/components/SearchBar/SearchBarReactSuite";


type OrderHistoryFilterProps = {
    dateRange: [Date, Date]; 
    handleDateRangeChange: (range: [Date, Date], event: SyntheticEvent<Element, Event>) => void;
    orderStatus: string;
    handleOrderStatusChange: (status: string) => void;
  };


export const OrderHistoryFilter: React.FC<OrderHistoryFilterProps> = ({
    dateRange,
    handleDateRangeChange,
    orderStatus,
    handleOrderStatusChange,
  }) => {
    return (
        <>
          
        </>
    )
}
