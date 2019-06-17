<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="RH.Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <script src="jquery-easyui-1.7.0/jquery.min.js"></script>
    <script src="jquery-easyui-1.7.0/jquery.easyui.min.js"></script>
    <script src="jquery-easyui-1.7.0/easyui-lang-zh_CN.js"></script>
    <link href="jquery-easyui-1.7.0/themes/default/easyui.css" rel="stylesheet" />
    <link href="jquery-easyui-1.7.0/themes/icon.css" rel="stylesheet" />

    <script src="JavaScript/Index.js"></script>

   <script>//解决layout，浏览器，打开时错乱现象
       var pc;
       //不要放在$(function(){});中
       $.parser.onComplete = function () {
           if (pc) clearTimeout(pc);
           pc = setTimeout(closes, 1000);
       }

       function closes() {
           $('#loading').fadeOut('normal', function () {
               $(this).remove();
           });
       }
</script>
</head>
<body class="easyui-layout" >
   <%--掩盖层，防止加载时，layouot组件错乱现象--%>
    <div id="loading" style="position:absolute;z-index:1000;top:0px;left:0px;width:100%;height:100%;background:#DDDDDB;text-align :center;padding-top:20%;"
     <h1><font color="#15428B">加载中....</font></h1>
     </div>

    <%----页眉-- --%>
    <div data-options="region:'north',split:true" style="height:80px;padding:20px;background-color:#009ad6"></div>

    <%----页脚-- --%>
    <div data-options="region:'south',split:true" style="height:50px;background:#ccc;text-align:center">
        CopyRight© 2019- All Rights Reserved 版权所有-WaterCheng
    </div>

    <%----菜单栏-- --%>
    <div data-options="region:'west',title:'导航栏',split:true" style="width:200px;">
        <div id="acc" class="easyui-accordion" fit="true">
            <div title="房屋出租" data-options="iconCls:'icon-edit',selected:true" style="overflow:auto;padding:10px;">   
                 <ul id="meau"></ul>
            </div>   
            <div title="房屋出租" data-options="iconCls:'icon-edit'" style="padding:10px;">   

            </div>      
        </div>
       
    </div>

    <%----操作栏-- --%>
    <div data-options="region:'center',title:'内容',split:true"  >
        <div class="easyui-tabs"  fit="true" border="false">
            <div  data-options="title:'首页',iconCls:'icon-save',closable:true">
                <img src="Images/index.svg" width="100%" height="100%" />

            </div>
        </div>
    </div>

</body>
</html>
