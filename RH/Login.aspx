<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="RH.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <script src="jquery-easyui-1.7.0/jquery.min.js"></script>
    <script type="text/javascript">
        $(function () {
            $.ajax({
                url: 'Handler/Login.ashx',
                type: 'get',           success: function (data)
                {
                    alert(data);
     
                }
            });
        });

    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    登陆
    </div>
    </form>
</body>
</html>
