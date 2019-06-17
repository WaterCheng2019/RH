<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="RH.Login" %>

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

    <script src="JavaScript/Login.js"></script>
</head>
<body>

    <div id="dialog">
        <div id="content" style="padding:30px">
        <form id="myForm" method="post">
            <table>
                <tr>
                    <td>用户名：</td>
                    <td><input id="Name" name="Name" type="text"  /></td>
                </tr>
                <tr>
                    <td>密码：</td>
                    <td><input id="Pwd" name="Pwd" type="password"  /></td>
                </tr>
            </table>
        </form>
        </div>
    </div>
    <div id="tools" style="text-align:center">
        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" id="btnLogin" onclick="LoginClick()">登陆</a>
    </div>
</body>
</html>
