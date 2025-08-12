
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDebounce } from "@/hooks/use-debounce";

interface Column {
  key: string;
  header: string;
  render?: (item: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  title?: string;
  searchable?: boolean;
  searchField?: string;
  isLoading?: boolean;
  emptyMessage?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  title,
  searchable = false,
  searchField = 'name',
  isLoading = false,
  emptyMessage = 'No data found',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const filteredData = React.useMemo(() => {
    if (!debouncedSearchTerm) return data;
    
    return data.filter(item => {
      const searchValue = String(item[searchField] || '').toLowerCase();
      return searchValue.includes(debouncedSearchTerm.toLowerCase());
    });
  }, [data, debouncedSearchTerm, searchField]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        {title && <CardTitle>{title}</CardTitle>}
        {searchable && (
          <div className="w-64">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="max-w-xs"
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <svg className="animate-spin h-8 w-8 text-agri-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.key}>{column.header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="text-center py-8 text-gray-500">
                      {emptyMessage}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {columns.map((column) => (
                        <TableCell key={`${rowIndex}-${column.key}`}>
                          {column.render 
                            ? column.render(item) 
                            : item[column.key]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTable;
