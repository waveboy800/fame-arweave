var uploadFolder = require("arseeding-js/cjs/uploadFolder")//需要对引用的这个uploadFolder.js文件中加入module.exports
var index = require('arseeding-js') 
const fs = require('fs');
const url = 'https://arseed.web3infra.dev';
const priv = 'private key';               //etherum wallet private key

//uploadFile上传本地文件   dataType需要找文件类型去找到匹配的tag，图片这里是image/png或者是image/jpeg
function uploadFile(filePath, dataType, payCurrency) {
  const instance = index.genNodeAPI(priv);
  const fileData = fs.readFileSync(filePath);
  const data = Buffer.from(fileData);
  const ops = { tags: [{ name: 'Content-Type', value: dataType }] };
  return instance.sendAndPay(url, data, payCurrency, ops)
    .then((res) => {
      //console.log('res',res);
      //console.log(res.order.itemId);
      return res.order.itemId;
    })
    .catch((err) => {
      console.error('Error:', err);
      return null;
    });
}


//uploadFolder上传文件夹   去除etherum私钥和URL，防止秘钥暴露，只需要上传文件或者文件夹路径和币种即可(AR,ETH,BNB等）
function uploadFolder(path, currency) {
  return new Promise((resolve, reject) => {
    uploadFolder
      .uploadFolderAndPay(path, priv, url, currency)
      .then((res) => {
        //console.log(res.maniId);
        resolve(res.maniId);
      })
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
}

const axios = require("axios"); //需要去调用arseeding相关接口
const express = require("express");
const app = express();

app.use(express.json());


//上传文件接口
app.post('/uploadFile', async (req, res) => {
  const requestBody = req.body;
  const filePath = requestBody.filePath;
  const dataType = requestBody.dataType;
  const payCurrency = requestBody.payCurrency;
  try {
      const responseData = await uploadFile(filePath, dataType, payCurrency);
      res.json(responseData); // 使用res.send()方法发送解析后的值
  } catch (e) {
      res.status(500).json({ error: e.message });
  }
});

//上传文件夹接口
app.post("/uploadFolder", async (req, res) => {
  const requestBody = req.body;
  const path = requestBody.path;
  const currency = requestBody.currency;
  try {
    const responseData = await uploadFolder(path, currency);
    res.json(responseData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//查询到可以直接访问到文件的URL,路径必须到具体的文件
app.post("/manifest_url/:Id", async (req, res) => {
  const maniId = req.params.Id;
  const apiUrl = `https://arseed.web3infra.dev/manifest_url/${maniId}`;

  try {
    const response = await axios.post(apiUrl, req.body);
    res.json(response.data);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send("An error occurred while calling the API.");
  }
});

//定义监听端口
app.listen(5000, () => {
  console.log("Server listening on http://127.0.0.1:5000`");
});
