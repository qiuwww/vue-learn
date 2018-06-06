# vue-learn

## 关于vue文件夹，内包含在官网下载的vue资源文件
地址：http://vuejs.org
## 对照官网，把实例都写一遍，以后用到了查询方便

vue-resource:


子父组件之间传递信息

## ESLint
1. 注意段前段后是否空行；
// 出现错误：error Newline required at end of file but not found eol-last
// 就是说，你的最后一句js代码module.exports = GalleryByReactApp;后面要加上回车，留出一个空行。


http://172.19.80.62:81/thsft/iFindService/AssetBackedSecurity/thematic-analysis/rate-data?type=first&sdate=20160911&edate=20170911&jg=%E4%B8%AD%E8%AF%9A%E4%BF%A1%E5%9B%BD%E9%99%85,%E4%B8%AD%E5%80%BA%E8%B5%84%E4%BF%A1


这个页面进入的时候，会同时请求       

1. 原始评级分布部分的三个图表的数据（同一个接口）:
http://172.19.80.62:81/thsft/iFindService/AssetBackedSecurity/thematic-analysis/rate-data?type=first&sdate=20160911&edate=20170911&jg=%E4%B8%AD%E8%AF%9A%E4%BF%A1%E5%9B%BD%E9%99%85,%E4%B8%AD%E5%80%BA%E8%B5%84%E4%BF%A1

这个接口最耗时，   添加type=first会第一次返回三组数据；
后边再选择只是会返回需要的数据

更改评级1|| 评级2 的选项，基本上跟刷新页面一样 




2. 然后是债券明细的更多下边的四个下拉列表的选项: 
http://172.19.80.62:81/thsft/iFindService/AssetBackedSecurity/thematic-analysis/bond-screen-data?sdate=20160911&edate=20170911&jg1=%E4%B8%AD%E8%AF%9A%E4%BF%A1%E5%9B%BD%E9%99%85&jg2=%E4%B8%AD%E5%80%BA%E8%B5%84%E4%BF%A1&pj1=AAA&pj2=AAA

3. 第三个接口是返回“近期评估变化的tabs下的内容”

http://172.19.80.62:81/thsft/iFindService/AssetBackedSecurity/thematic-analysis/rate-data?type=now&page=1&word=&sdate=&edate=&direction=%E5%85%A8%E9%83%A8



想一想自己做点什么，光靠任务是没法的