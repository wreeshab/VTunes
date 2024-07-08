const loginWithDeltaClient = () => {
  const clientId = "zqtllGJ6gPBFow1h";
  const redirectUri = "http://localhost:5000/delta-redirect.html";
  const authorizationUrl = "https://auth.delta.nitt.edu/authorize";
  const params = {
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    state: "hello",
    scope: "email openid profile user",
    nonce: "delta-task-3",
  };

  const queryString = new URLSearchParams(params).toString();
  const deltaAuthUrl = `${authorizationUrl}?${queryString}`;
  window.open(deltaAuthUrl, "_blank", "width=800,height=600");
};

export default loginWithDeltaClient;
