# fame-arweave
Upload the files to the Arweave.

已经完成3个接口，1是上传文件接口uploadFile，比如图片文件的上传，返回maniId；2是上传文件夹接口uploadFolder，返回maniId；3是arweave文件查询接口，根据maniId查询到manifestUrl，后续可以
拼接出查询文件的具体URL，如
https://manifestUrl.arseed.web3infra.dev/XX.jpg

1.安装插件

npm install arseeding-js

npm install axios   //请求其他接口

npm install express   //轻量化web开发框架





2.部署到服务器执行如下指令 

node arweave-api.js

    


3.接口uploadFolder

post

http://127.0.0.1:5000/uploadFolder

request：{"path":"E:\\legar-DAO\\arweave\\arupload","currency":"AR"}

response："JPT75BtE7CzdJh9HYjtN7zmlWIL9m_G3E-OW4gErKno"
    


4.接口uploadFile

post

http://127.0.0.1:5000/uploadFile

request：{"filePath":"./arupload/1.jpg","dataType":"image/jpeg","payCurrency":"AR"}

response："xxxxzbhj-cLoZSbnV7xYmHtCVaf9j0L9lc3FIJ2LgXI"
    


5.查询manifestUrl(入参是maniId)

post

http://127.0.0.1:5000/manifest_url/:maniId

response：

{
    "manifestUrl": "xt2pxza3itwczxjgd5dweo2n5442kwec7wmg3rbznyqbfmvx",
    "manifestId": "xxT75BtE7CzdJh9HYjtN7zmlWIL9m_G3E-OW4gErKno"
}
