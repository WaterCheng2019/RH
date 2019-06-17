<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Customer.aspx.cs" Inherits="RH.Page.Customer" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>账户信息</title>
    <script src="../jquery-easyui-1.7.0/jquery.min.js"></script>
    <script src="../jquery-easyui-1.7.0/jquery.easyui.mobile.js"></script>
    <script src="../jquery-easyui-1.7.0/easyui-lang-zh_CN.js"></script>
    <link href="../jquery-easyui-1.7.0/themes/material/easyui.css" rel="stylesheet" />
    <link href="../jquery-easyui-1.7.0/themes/icon.css" rel="stylesheet" />


    <script src="../JavaScript/Customer.js"></script>
</head>
<body>
    <div id="dl">
        <div id="content" style="margin:20px">
            <form id="addf">
                <table border="1" width="300px" cellspacing="0" cellpadding="0">
                    <tr>
                        <td>会员名：</td>
                        <td><input type="text" id="CName" name="CName" /></td>
                    </tr>
                     <tr>
                        <td>密码：</td>
                        <td><input type="password" id="Pwd1" name="Pwd1" /></td>
                    </tr>
                     <tr>
                        <td>确认密码：</td>
                        <td><input type="password" id="Pwd2" name="Pwd12" /></td>
                    </tr>
                    <tr>
                        <td>城市：</td>
                        <td>
                           省：<select id="Provice" name="Provice"></select>
                           市：<select id="City" name="City"></select>
                        </td>
                    </tr>
                    <tr>
                        <td>出生日期：</td>
                        <td><input type="text" id="BornDate" name="BornDate" /></td>
                    </tr>
                    <tr>
                        <td>手机号码：</td>
                        <td><input type="text" id="Telephone" name="Telephone" /></td>
                    </tr>

                </table>
            </form>

            <div id="dtool"><!--对话框的工具栏-->
                <a href="javascript:void()" class="easyui-linkbutton" data-options="iconCls:'icon-save'" id="btnAdd">添加</a>
            </div>
        </div>
    </div>
</body>
</html>
