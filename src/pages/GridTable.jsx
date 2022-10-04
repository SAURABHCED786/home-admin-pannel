import { Page, Card, DataTable, Pagination, Select, Button, Grid, Loading, TextField } from '@shopify/polaris';
import React, { useEffect, useState } from 'react';


function GridTable() {
  const [ActivePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalUser, setTotalUser] = useState();
  const [SelectRowPerPage, setSelectRowPerPage] = useState(5);
  const [viewTable, setViewTable] = useState([]);
  //Array Options
  const [optUserIds, setoptuserId] = useState();
  const [optCatalos, setCatalog] = useState();
  const [optShopDomains, setShopDomain] = useState();
  const [optShopEmails, setShopEmail] = useState();
  const [optShopPlans, setShopPlan] = useState();
  const [optUpdatedAts, setoptUpdatedAt] = useState();
  const [optCreatedAts, setCreatedAt] = useState();
  const [optShopShopifys, setShopsShopify] = useState();

  //Opt Filter Texfield
  const [txtUserId, setTxtuserId] = useState();
  const [txtCatalog, setTxtCatalog] = useState();
  const [txtShopDomain, setTxtShopDomain] = useState();
  const [txtShopEmail, setTxtShopEmail] = useState();
  const [txtShopPlan, setTxtShopPlan] = useState();
  const [txtUpdatedAt, setTxtUpdatedAt] = useState();
  const [txtCreatedAt, setTxtCreatedAt] = useState();
  const [txtShopify, setTxtShopify] = useState()

  let tokenData = JSON.parse(sessionStorage.getItem("tokenData"));
  let Token = tokenData.data.token

  const optUserId = [
    { label: 'Equals', value: 'equal' },
    { label: 'Contains', value: 'contain' },
    { label: 'Not Contains', value: 'notcontain' },
  ];
  const optCatalog = [
    { label: 'Equals', value: 'equal' },
    { label: 'Contains', value: 'contain' },
    { label: 'Not Contains', value: 'notcontain' },
  ];
  const optShopDomain = [
    { label: 'Equals', value: 'equal' },
    { label: 'Contains', value: 'contain' },
    { label: 'Not Contains', value: 'notcontain' },
  ];
  const optShopEmail = [
    { label: 'Equals', value: 'equal' },
    { label: 'Contains', value: 'contain' },
    { label: 'Not Contains', value: 'notcontain' },
  ];
  const optShopPlan = [
    { label: 'Equals', value: 'equal' },
    { label: 'Contains', value: 'contain' },
    { label: 'Not Contains', value: 'notcontain' },
  ];
  const optUpdatedAt = [
    { label: 'Equals', value: 'equal' },
    { label: 'Contains', value: 'contain' },
    { label: 'Not Contains', value: 'notcontain' },
  ];
  const optCreatedAt = [
    { label: 'Equals', value: 'equal' },
    { label: 'Contains', value: 'contain' },
    { label: 'Not Contains', value: 'notcontain' },
  ];
  const optShopsShopify = [
    { label: 'Equals', value: 'equal' },
    { label: 'Contains', value: 'contain' },
    { label: 'Not Contains', value: 'notcontain' },
  ];

  const heading = [
    [
      <><h2>UserId</h2> <Select onChange={(e) => { setoptuserId(e) }} value={optUserIds} options={optUserId} /><TextField onChange={(e) => { setTxtuserId(e) }} value={txtUserId} placeholder="UserId" /></>,
      <><h2>Catalog</h2> <Select onChange={(e) => { setCatalog(e) }} value={optCatalos} options={optCatalog} /><TextField onChange={(e) => { setTxtCatalog(e) }} value={txtCatalog} placeholder="Catalog" /></>,
      <><h2>Shop domain</h2> <Select onChange={(e) => { setShopDomain(e) }} value={optShopDomains} options={optShopDomain} /><TextField onChange={(e) => { setTxtShopDomain(e) }} value={txtShopDomain} placeholder="Shop domain" /></>,
      <><h2>Shop email</h2> <Select onChange={(e) => { setShopEmail(e) }} value={optShopEmails} options={optShopEmail} /><TextField onChange={(e) => { setTxtShopEmail(e) }} value={txtShopEmail} placeholder="Shop email" /></>,
      <><h2>Shop Plan name</h2> <Select onChange={(e) => { setShopPlan(e) }} value={optShopPlans} options={optShopPlan} /><TextField onChange={(e) => { setTxtShopPlan(e) }} value={txtShopPlan} placeholder="Shop Plan name" /></>,
      <><h2>Updated at</h2> <Select onChange={(e) => { setoptUpdatedAt(e) }} value={optUpdatedAts} options={optUpdatedAt} /><TextField onChange={(e) => { setTxtUpdatedAt(e) }} value={txtUpdatedAt} placeholder="Updated at" /></>,
      <><h2>Created at</h2> <Select onChange={(e) => { setCreatedAt(e) }} value={optCreatedAts} options={optCreatedAt} /><TextField onChange={(e) => { setTxtCreatedAt(e) }} value={txtCreatedAt} placeholder="Created at" /></>,
      <><h2>Shops myShopify domain</h2> <Select onChange={(e) => { setShopsShopify(e) }} value={optShopShopifys} options={optShopsShopify} /><TextField onChange={(e) => { setTxtShopify(e) }} value={txtShopify} placeholder="Shops myShopify domain" /></>,
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
        setTotalUser(data.data.count)
        data?.data?.rows.map((item) => {
          console.log(item, "item");
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
        <Card sectioned>
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
            <Grid.Cell olumnSpan={{ xs: 12, sm: 3, md: 2, lg: 2, xl: 2 }}>
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
    </>


  );
}


export default GridTable;