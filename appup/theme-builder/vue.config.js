module.exports = {
  devServer: {
    proxy: {
      "/runtime": {
        target: "https://our.appup.com",
        secure: false,
        headers:
        {
          "Appup-Auth-token": "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InB1cnVzaG90aGFtLmFnaWxlQGdtYWlsLmNvbSIsInVzZXJfaWQiOiI0MzIiLCJleHBpcnlfdGltZSI6IjIwMTktMDEtMTggMTg6NTU6NDguMCJ9.My_S452cpeqc-Hz4Q2Plnn_4WFTf4yfalyP8Wl1_IBo",
          "token": "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InB1cnVzaG90aGFtLmFnaWxlQGdtYWlsLmNvbSIsInVzZXJfaWQiOiI0MzIiLCJleHBpcnlfdGltZSI6IjIwMTktMDEtMTggMTg6NTU6NDguMCJ9.My_S452cpeqc-Hz4Q2Plnn_4WFTf4yfalyP8Wl1_IBo",
          "cookieDomainRewrite" :".appup.com"
        },
        ws: false
      },
      "/app": {
        target: "https://our.appup.com",
        secure: false,
        headers:
        {
          "Appup-Auth-token": "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InB1cnVzaG90aGFtLmFnaWxlQGdtYWlsLmNvbSIsInVzZXJfaWQiOiI0MzIiLCJleHBpcnlfdGltZSI6IjIwMTktMDEtMTggMTg6NTU6NDguMCJ9.My_S452cpeqc-Hz4Q2Plnn_4WFTf4yfalyP8Wl1_IBo",
          "token": "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InB1cnVzaG90aGFtLmFnaWxlQGdtYWlsLmNvbSIsInVzZXJfaWQiOiI0MzIiLCJleHBpcnlfdGltZSI6IjIwMTktMDEtMTggMTg6NTU6NDguMCJ9.My_S452cpeqc-Hz4Q2Plnn_4WFTf4yfalyP8Wl1_IBo",
          "cookieDomainRewrite" :".appup.com"
        },
        ws: false
      }
    }
  }
};