import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography'; // Import Typography component

const columns = [
  { field: 'id', headerName: 'ID', width: 135, headerClassName: 'custom-header-id' },
  { field: 'title', headerName: '名稱', width: 450, headerClassName: 'custom-header-title' },
  { field: 'location', headerName: '地點', width: 450, headerClassName: 'custom-header-location' },
  { field: 'price', headerName: '票價', width: 450, headerClassName: 'custom-header-price' },
];

const DataGridDemo = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6&page=${currentPage}`;
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json.map((item, index) => ({
          id: index + 1,
          title: item.title,
          location: item.showInfo[0]?.location || '',
          price: item.showInfo[0]?.price || '',
        })));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (params) => {
    setCurrentPage(params.page - 1); // DataGrid page is 1-based, but currentPage is 0-based
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    // You can implement your filtering logic here
    // For simplicity, let's filter data based on the title field
    const filteredData = data.filter(item => item.title.toLowerCase().includes(value.toLowerCase()));
    setData(filteredData);
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom style={{ marginRight: '1rem' }}>
          景點觀光展覽資訊
        </Typography>
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginBottom: '1rem', padding: '0.5rem' }}
        />
      </div>


      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pagination
          pageSize={pageSize}
          rowCount={data.length}
          onPageChange={handlePageChange}
          loading={loading}
          className="custom-data-grid"
        />
      </Box>
    </>
  );

}

export default DataGridDemo;
