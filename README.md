# MIMALL
vue个人练手项目，将项目架构，router、axios封装学以致用

## router封装
规则
    例如：index/index，shop/index以index结尾的，path和name默认去除index
    例如：shop/list，默认生成name为shop_list（如果结尾为index，例如shop/index则是shop）
详情
    移步src/common/config/router。此文件是对router配置的优化文件，定义一个递归函数createRoute和一个对象数组routes，自动生成路由，src/router将接收src/common/config/router暴露出去的配置的路由数组routes来创建路由对象
优势
    减少配置路由的代码冗余，例如重复多次的 import xx  from 'xxx',例如重复多次书写path,name,和component，开发人员按照一定的规则下使用更少的代码去实现路由配置，提高开发效率。

## storage封装


