import React from 'react'
import { Form, FormLayout, TextField, Button, Grid, Card, Toast, Frame, Spinner } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import $ from 'jquery'
import { useNavigate } from "react-router-dom";

function Forms() {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [useractive, setActiveUser] = useState(false);
  const [loginActive, setLoginActive] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const Token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA';

  const toggleuserActive = useCallback(() => setActiveUser((useractive) => !useractive), []);

  const toggleLoginActive = useCallback(() => setLoginActive((loginactive) => !loginactive), []);

  const toastMarkup = useractive ? (
    <Toast error content="Invalid User Password" onDismiss={toggleuserActive} />

  ) : null;

  const jQuerycode = () => {
    $(function () {
      $('.Polaris-Frame-Toast').css('background', 'darkgreen')
    });
  }
  const LoginSuccess = loginActive ? (
    <Toast content="Login Success.. 🎉" onDismiss={toggleLoginActive} />
  ) : null;

  const SpinnerExample = spinner ? (
    <Spinner accessibilityLabel="Spinner example" size="large" />
  ) : null;


  const handleSubmit = () => {
    setSpinner(true);
    if (username !== "admin" || password !== "password123") {
      toggleuserActive(true);
      setTimeout(() => setSpinner(false), 2000)
      return
    } else {
      fetch(`https://fbapi.sellernext.com/user/login?username=${username}&password=${password}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${Token}` },
      })
        .then(x => x.json())
        .then(data => {
          if (data.success === true) {
            setSpinner(false);
            toggleLoginActive(true);
            jQuerycode();
            // { replace: true, state: { message: data.message, token: data.data.token } }
            sessionStorage.setItem("tokenData", JSON.stringify(data));
            setTimeout(() => (navigate("/home")), 2000);
          } else {
            setSpinner(false);
          }
        });
    };
  }

  const handleUsernameChange = useCallback((value) => {
    setUsername(value)
  }, []);

  const handleUserPassword = useCallback((value) => {
    setPassword(value)
  }, []);

  return (
    <>
      <div className="loginFrom">
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 10, md: 12, lg: 12, xl: 12 }}>
            <Card title="Login Form" sectioned>
              <Form >
                <FormLayout>
                  <TextField
                    value={username}
                    onChange={handleUsernameChange}
                    label="Username"
                    type="text"
                  />
                  <TextField
                    value={password}
                    onChange={handleUserPassword}
                    label="Password"
                    type="password"
                  />
                  <Button onClick={handleSubmit}>Login</Button>
                </FormLayout>
              </Form>
            </Card>
          </Grid.Cell>
        </Grid>
        <Frame>
          {SpinnerExample}
          {toastMarkup}
          {LoginSuccess}
        </Frame>
      </div>
    </>
  );

}

export default Forms
