:: 定位到D盘
d:
 
:: 切换到mongodb的数据库目录
cd Program files\MongoDB 2.6 Standard\data

:: 删除数据库锁定记录文件
if exist mongod.lock del mongod.lock missing
 
:: 切换到mongodb的bin目录
cd ..\bin
 
:: 配置mongodb的文档存储目录
:: mongod --dbpath "D:\test\Imooc\data"
mongod --dbpath "D:\fe_exercise\imooc\data"