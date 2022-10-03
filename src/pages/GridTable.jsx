import { Page, Card, DataTable, Pagination, Select, Button, Grid, Loading } from '@shopify/polaris';
import React, { useEffect, useState } from 'react';

function GridTable() {
  const [ActivePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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
        setViewTable(temp);
      });

  }, [ActivePage, SelectRowPerPage])

  //Select Row PerPage Options
  const handleSelectChange = ((value) => {
    setSelectRowPerPage(value)
  });
  const toggleIsLoading = () => {
    setIsLoading((isLoading) => !isLoading)
  }

  const options = [
    { label: 'Row Per Page:5', value: '5' },
    { label: 'Row Per Page:10', value: '10' },
    { label: 'Row Per Page:15', value: '15' },
    { label: 'Row Per Page:20', value: '20' },
  ];

  const loadingMarkup = isLoading ? <Loading /> : null;
  // Table Row

  return (

    <Page title="">
      {loadingMarkup}
      <Card>
        <Grid columns={{ xs: 3, sm: 4, md: 4, lg: 3, xl: 3 }}>
          <Grid.Cell columnSpan={{ xs: 1, sm: 2, md: 2, lg: 1, xl: 1 }}>
            <Pagination
              label={ActivePage}
              hasPrevious
              onPrevious={() => {
                setActivePage(ActivePage - 1)
                toggleIsLoading()
                if (ActivePage < 1) {
                  setActivePage(1)
                }
              }}
              hasNext
              onNext={() => {
                toggleIsLoading()
                setActivePage(ActivePage + 1)
              }}
            />
          </Grid.Cell>
          <Grid.Cell olumnSpan={{ xs: 12, sm: 3, md: 2, lg: 2, xl: 2}}>
            <Select
              options={options}
              onChange={handleSelectChange}
              value={SelectRowPerPage}
            />
          </Grid.Cell>
          <Grid.Cell olumnSpan={{ xs: 1, sm: 3, md: 3, lg: 4, xl: 4 }}>
            <Button slim>
              View Columns
            </Button>
          </Grid.Cell>
        </Grid>
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
    </Page >
  );
}


export default GridTable;