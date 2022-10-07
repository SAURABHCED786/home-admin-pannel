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
  SkeletonBodyText,
  Modal,
  Checkbox,
  Link,
  Form,
} from '@shopify/polaris';
import React, { useEffect, useState } from 'react';

function GridTable() {
  const [ActivePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalUser, setTotalUser] = useState();
  const [SelectRowPerPage, setSelectRowPerPage] = useState(5);
  const [viewTable, setViewTable] = useState([]);
  const [val, setVal] = useState([]);
  const [opt, setOpt] = useState([]);
  const [active, setActive] = useState(false);
  const [userDetail, setUserDetail] = useState([]);
  const [checked, setChecked] = useState([]);
  const [filters, setFiterData] = useState([]);
  let tokenData = JSON.parse(sessionStorage.getItem("tokenData"));
  let Token = tokenData.data.token
  const option = [
    { label: "Equals", value: "1" },
    { label: "Not Equals", value: "2" },
    { label: "Contains", value: "3" },
    { label: "Does Not Contains", value: "4" },
    { label: "Starts With", value: "5" },
    { label: "Ends With", value: "6" },
  ];

  const filterarr = ["user_id", "", "shops.domain", "shops.email", "shops.plan_name", "", "", "shops.myshopify_domain"];

  function handelFilter() {
    let filterData = ''
    filterarr.map((fdata, i) => {

      if ((val[i] !== '' && val[i] !== undefined) || (opt[i] !== '' && opt[i] !== undefined)) {
        filterData += `&filter[${fdata}][${opt[i]}] = ${val[i]}`;
        setFiterData(filterData);
        setActivePage(1)
      }
    })
    toggleIsLoading(true);
  }

  const handleChange = (index) => {
    const newChecked = checked.map((check, i) => {
      if (index === i) return !check;
      return check;
    })
    setChecked(newChecked)
  }

  const heading = [
    [
      "UserId",
      "Catalog",
      "Shop domain",
      "Shop email",
      "Shop Plan name",
      "Updated at",
      "Created at",
      "Shops myShopify domain",
      "User Details",
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
    {
      if (data !== "User Details") {
        return (
          <>
            <DisplayText element='h2' size='small' key={i}>{data}</DisplayText>

            <Select options={option} value={opt[i]} onChange={(e) => {
              let newopt = [...opt]
              newopt[i] = e
              setOpt(newopt)
            }} />
            <Form onSubmit={() => handelFilter()} preventDefault>
              <TextField placeholder={data} value={val[i]} onChange={(e) => {
                let newval = [...val]
                newval[i] = e
                setVal(newval)
              }}
              />
            </Form>
          </>
        )
      } else {
        return (
          <>
            <DisplayText element='h2' size='small' key={i}>{data}</DisplayText>
          </>
        )
      }
    }
  })

  useEffect(() => {
    const temp = [];
    console.log(filters, "filters");
    fetch(`https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${ActivePage}&count=${SelectRowPerPage}${filters}`, {
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
            arr.push(<Button onClick={() => {
              let warehousesLength = Object.keys(
                item.shopify.warehouses
              )?.length;
              // console.log(warehousesLength);
              setChecked(new Array(warehousesLength).fill(true))
              setActive(true)
              setUserDetail(item);
            }
            } >View User</Button>);
          }
          temp.push(arr);
        });
        setViewTable(temp);
      });


  }, [ActivePage, SelectRowPerPage, filters])

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
                    if (ActivePage < 2) {
                      setActivePage(1)
                    }
                    toggleIsLoading()
                  }}
                  hasNext
                  onNext={() => {
                    setActivePage(ActivePage + 1)
                    toggleIsLoading()
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
                <Button onClick={() => {
                  toggleIsLoading(false)
                  setOpt([])
                  setVal([])
                  setActivePage(1)
                  setSelectRowPerPage(5)
                  setFiterData("")
                }} slim>
                  Reset
                </Button>
              </Grid.Cell>
            </Grid>
          </Card>
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
                "text"
              ]}
              headings={head}
              rows={viewTable}
            />
          </Card>
        </div>
        {totalUser ? (
          <>

            <div style={{ height: '100px' }}>
              <Modal
                open={active}
                onClose={() => {
                  setActive(false);
                }}
                title="User Details"
              >
                <Modal.Section>
                  <div className='usrDetaModal'>
                    <TextContainer>
                      <b>ID</b> {userDetail?.id || "N/A"}
                    </TextContainer>
                    <TextContainer>
                      <b>Shop Id</b> {userDetail?.shop_id || "N/A"}
                    </TextContainer>
                    <TextContainer>
                      <b>Full Name</b> {userDetail?.user_details?.full_name || "N/A"}
                    </TextContainer>
                    <TextContainer>
                      <b>Email</b> {userDetail?.email || "N/A"}
                    </TextContainer>
                    <TextContainer>
                      <b>City</b> {userDetail?.shopify?.city || "N/A"}
                    </TextContainer>
                    <TextContainer>
                      <b>Country</b> {userDetail?.shopify?.country_name || "N/A"}
                    </TextContainer>
                    <TextContainer>
                      <b>Address 1</b> {userDetail?.shopify?.address1 || "N/A"}
                    </TextContainer>
                    <TextContainer>
                      <b>Address 2</b> {userDetail?.shopify?.address2 || "N/A"}
                    </TextContainer>
                    <TextContainer>
                      <b>Phone</b> {userDetail?.user_details?.mobile || "N/A"}
                    </TextContainer>
                    <TextContainer>
                      <b>Shop Owner</b> {userDetail?.shopify?.shop_owner || "N/A"}
                    </TextContainer>
                    <TextContainer>
                      <b>Warehouse</b>
                      {userDetail.length !== 0 && Object.values(userDetail?.shopify?.warehouses)?.map((warehouse, index) => {
                        return (
                          <Checkbox
                            key={warehouse.id}
                            label={warehouse.name}
                            checked={checked[index]}
                            onChange={() => handleChange(index)}
                          />
                        )
                      })}
                    </TextContainer>
                    <TextContainer>
                      <b>Domain</b> <Link url={"https://" + userDetail?.shopify?.domain}>{userDetail?.shopify?.domain || "N/A"}</Link>
                    </TextContainer>
                  </div>
                </Modal.Section>
              </Modal>
            </div>
          </>
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