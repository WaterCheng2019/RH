<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Customer.aspx.cs" Inherits="RH.Page.Customer" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>账户信息</title>
    <script src="../jquery-easyui-1.7.0/jquery.min.js"></script>
    <script src="../jquery-easyui-1.7.0/jquery.easyui.min.js"></script>
    <script src="../jquery-easyui-1.7.0/easyui-lang-zh_CN.js"></script>
    <link href="../jquery-easyui-1.7.0/themes/material/easyui.css" rel="stylesheet" />
    <link href="../jquery-easyui-1.7.0/themes/icon.css" rel="stylesheet" />


    <script src="../JavaScript/Customer.js"></script>
    <style type="text/css">
        .text{
            text-align:right
        }
        #dl table tr td{
            padding:5px;
        }
        #ff table {
            width: 300px;
            margin: 0 auto;
        }

            #ff table tr td {
                padding: 5px;
            }

    </style>
</head>
<body>

    <div>
        <table id="dgCustom"></table>
    </div>

     <%--工具栏--%>
    <div id="tb">
        <div style="margin:5px">
            会员名称：<input type="text" id="CustomeName" name="CustomeName" />
            省：<input type="text" id="ProvinceId1" name="ProvinceId1" />
            市：<input type="text" id="City1" name="City1" />


            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" id="btnSearch">查询</a>
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add'" id="btnAdd">增加</a>
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" id="btnEdit">修改</a>
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" id="btnDele">删除</a>
            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-excel'" id="btnExcle">导出Excel</a>
        </div>
    </div>

   <%-- 对话框--%>
    <div id="dl" style="display:none" >
        <div id="content" style="margin:30px" >
            <form id="addf" method="post">
                <table border="1" width="500px" cellspacing="0" cellpadding="0">
                    <tr>
                        <td class="text">会员名：</td>
                        <td><input type="text" id="CName" name="CName" /></td>
                    </tr>
                     <tr>
                        <td class="text">密码：</td>
                        <td><input type="password" id="Pwd1" name="Pwd1" /></td>
                    </tr>
                     <tr>
                        <td class="text">确认密码：</td>
                        <td><input type="password" id="Pwd2" name="Pwd2" /></td>
                    </tr>
                    <tr>
                        <td class="text">城市：</td>
                        <td>
                           省：<select id="Provice" name="Provice"></select>
                           市：<select id="City" name="City"></select>
                        </td>
                    </tr>
                    <tr>
                        <td class="text">出生日期：</td>
                        <td><input type="text" id="BornDate" name="BornDate" /></td>
                    </tr>
                    <tr>
                        <td class="text">手机号码：</td>
                        <td><input type="text" id="Telephone" name="Telephone" /></td>
                    </tr>

                </table>
            </form>

            <div id="dtool"><!--对话框的工具栏-->
                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save'" id="btnSave">保存</a><%--javascript:void()--%>
            </div>
        </div>
    </div>
</body>
</html>
