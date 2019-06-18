<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="House.aspx.cs" Inherits="RH.Page.House" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>房屋出租管理</title>
    <script src="../jquery-easyui-1.7.0/jquery.min.js"></script>
    <script src="../jquery-easyui-1.7.0/jquery.easyui.min.js"></script>
    <script src="../jquery-easyui-1.7.0/easyui-lang-zh_CN.js"></script>
    <link href="../jquery-easyui-1.7.0/themes/bootstrap/easyui.css" rel="stylesheet" />
    <link href="../jquery-easyui-1.7.0/themes/icon.css" rel="stylesheet" />

    <script src="../JavaScript/House.js"></script>

</head>
<body>
    <div>
        <table id="tbHouse"></table>
    </div>

    <div id="tb">
        <div style="margin:5px">
            类型：<input name="TypeName" id="TypeNames" />
                  <a class="easyui-linkbutton" data-options="iconCls:'icon-add'" id="btnAdd">添加</a>
                  <a class="easyui-linkbutton" data-options="iconCls:'icon-edit'" id="btnUpadate">修改</a>
        </div>
    </div>


    <div id="HouseDialog" style="width:480px;padding:10px">
        <form id="ff" method="post">
            <table id="tblAdd">
                <tr>
                    <td><label for="txtPrice">租金</label></td>
                    <td><input id="txtPrice" name="txtPrice" /></td>
                </tr>
                 <tr>
                    <td><label for="txtAddress">地址</label></td>
                    <td><input id="txtAddress" name="txtAddress" /></td>
                </tr>
                <tr>
                    <td><label for="TypeName1">类型</label></td>
                    <td><input id="TypeName1" name="TypeName1" /></td>
                </tr>
                 <tr>
                    <td><label style="vertical-align:top" for="txtDes">简介：</label></td>
                    <td><textarea id="txtDes" name="txtDes" rows="5" cols="37" /></td>
                </tr>
                <tr>
                    <td><label for="txtMaster">房主</label></td>
                    <td><input id="txtMaster" name="txtMaster" /></td>
                </tr>
                <tr>
                    <td><label for="txtPhone">联系方式</label></td>
                    <td><input id="txtPhone" name="txtPhone" /></td>
                </tr>
                <tr>
                    <td><label for="txtState">出租状态</label></td>
                    <td><input id="txtState" name="txtState" /></td>
                </tr>
            </table>
        </form>
    </div>

    <div id="dialogintn">
        <a href="javascript:void()" class="easuui-linkbutton" data-options="iconCls:'icon-ok'" id="btnOK">确定 </a>
         <a href="javascript:void()" class="easuui-linkbutton" data-options="iconCls:'icon-ok'" id="btnOK">关闭 </a>
    </div>
</body>
</html>
