import { Page, Card, DataTable, Pagination, Select, Stack } from '@shopify/polaris';
import React, { useEffect, useState } from 'react';

function GridTable() {
  const [ActivePage, setActivePage] = useState(1);
  const [SelectRowPerPage, setSelectRowPerPage] = useState(5);
  const [viewTable, setViewTable] = useState([]);
  let tokenData = JSON.parse(sessionStorage.getItem("tokenData"));
  let Token = tokenData.data.token
  const heading = [
    [
      "UserId",
      "Catlog",
      "Shop domain",
      "Shop email",
      "Shop Plan name",
      "Updated at",
      "Created at",
      "Shops myShopify domain",
    ],
    [
      "id",
      "catalog",
      "shop_url",
      "email",
      "shopify_plan",
      "updated_at",
      "created_at",
      "username",
    ],
  ];
  useEffect(() => {
    const temp = [];
    fetch(`https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${ActivePage}&count=${SelectRowPerPage}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${Token}` },
    })
      .then(x => x.json())
      .then(data => {
        data?.data?.rows.map((item) => {
          let arr = [];
          for (let i = 0; i < heading[1].length; i++) {
            arr[i] = item[heading[1][i]];
          }
          temp.push(arr);
        });
        console.log(temp,"temp");
        setViewTable(temp);
      });

  }, [ActivePage, SelectRowPerPage])

  //Select Row PerPage Options
  const handleSelectChange = ((value) => {
    setSelectRowPerPage(value)
  });
  const options = [
    { label: 'Row Per Page:5', value: '5' },
    { label: 'Row Per Page:10', value: '10' },
    { label: 'Row Per Page:15', value: '15' },
    { label: 'Row Per Page:20', value: '20' },

  ];

  // Table Row


 



  return (

    <Page title="">
      <Card>
        <Stack>
          <Pagination
            label={ActivePage}
            hasPrevious
            onPrevious={() => {
              setActivePage(ActivePage - 1)
              if (ActivePage < 1) {
                setActivePage(1)
              }
            }}
            hasNext
            onNext={() => {
              setActivePage(ActivePage + 1)
            }}
          />
          <Select
            options={options}
            onChange={handleSelectChange}
            value={SelectRowPerPage}
          />
        </Stack>

        <DataTable
          columnContentTypes={[
            "numeric",
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
            "text",
          ]}
          headings={heading[0]}
          rows={viewTable}
        />
      </Card>
    </Page>
  );
}


export default GridTable;