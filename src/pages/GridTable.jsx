import {
  Page,
  Card,
  DataTable,
  Pagination,
  Select,
  Button,
  Grid,
  Loading,
  TextField,
  DisplayText,
  Layout,
  TextContainer,
  SkeletonDisplayText,
  SkeletonBodyText
} from '@shopify/polaris';
import React, { useEffect, useState } from 'react';

function GridTable() {
  const [ActivePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalUser, setTotalUser] = useState();
  console.log(totalUser, "total");
  const [SelectRowPerPage, setSelectRowPerPage] = useState(5);
  const [viewTable, setViewTable] = useState([]);
  const [val, setVal] = useState([]);
  const [opt, setOpt] = useState([]);
  let tokenData = JSON.parse(sessionStorage.getItem("tokenData"));
  let Token = tokenData.data.token
  console.log(val, "txtvalue");
  console.log(opt, 'optvalue');
  const option = [
    { label: 'Row', value: '5' },
    { label: 'Page', value: '10' },
    { label: 'per', value: '50' },
  ];

  const heading = [
    [
      "UserId",
      "Catalog",
      "Shop domain",
      "Shop email",
      "Shop Plan name",
      "Updated at",
      "Created at",
      "Shops myShopify domain"
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
  const head = heading[0].map((data, i) => {
    return (
      <>
        <DisplayText element='h2' size='small' key={i}>{data}</DisplayText>
        <Select options={option} value={opt[i]} onChange={(e) => {
          let newopt = [...opt]
          newopt[i] = e
          setOpt(newopt)
        }} />
        <TextField placeholder={data} value={val[i]} onChange={(e) => {
          let newval = [...val]
          newval[i] = e
          setVal(newval)
        }}
        />
      </>
    )

  })
  useEffect(() => {
    const temp = [];
    fetch(`https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${ActivePage}&count=${SelectRowPerPage}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${Token}` },
    })
      .then(x => x.json())
      .then(data => {
        setTotalUser(data.data.count)
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
    toggleIsLoading()
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

  const loadingMarkup = isLoading ? null : <Loading />;
  // Table Row
  return (
    <>
      <Page title={`Showing form ${ActivePage} to ${SelectRowPerPage} of ${totalUser || "wait.."} users`}>
        {loadingMarkup}
        <div className="card">
          <Card sectioned>
            <Grid columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}>
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
              <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}>
                <Select
                  options={options}
                  onChange={handleSelectChange}
                  value={SelectRowPerPage}
                />

              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}>
                <Button slim>
                  View Columns
                </Button>
              </Grid.Cell>
            </Grid>
          </Card>
        </div>
        {totalUser ? (
          <Card sectioned>
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
              headings={head}
              rows={viewTable}
            />
          </Card>
        ) : (
          <Layout>
            <Layout.Section>
              <Card sectioned>
                <TextContainer>
                  <SkeletonDisplayText size="small" />
                  <SkeletonBodyText lines={9} />
                </TextContainer>
              </Card>
            </Layout.Section>
          </Layout>
        )}

      </Page >
    </>
  );
}


export default GridTable;