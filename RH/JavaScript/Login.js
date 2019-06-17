/// <reference path="D:\@99我的项目文件\RH\RH\Index.aspx" />
/// <reference path="D:\@99我的项目文件\RH\RH\Index.aspx" />

$(function () {

    makeDialog();
    makeName();
    makePwd();
});
//登陆，div渲染成dialog
function makeDialog()
{
    $("#dialog").dialog({
        title: "登陆",
        iconCls: 'icon-save',
        width: 400,
        height: 200,
        collapsible: true,
        minimizable: true,
        maximizable: true,
        closed: false,
        modal: true,
        buttons: "#tools"
    });
}
//用户名
function makeName()
{
    $("#Name").validatebox({
        required: true,
        missingMessage: '请输入用户名！！'
    });
}
//密码
function makePwd() {

    $("#Pwd").validatebox({
        required: true,
        missingMessage: '请输密码！！！'
    });
}
//登陆事件
function LoginClick()
{
    $("#myForm").form('submit', {
        url: 'Ashx/Login.ashx?Method=GetList',
        onSubmit: function ()
        {
            var isViali = $("#myForm").form('validate');
            if (!isViali) {
                return false;
            }
            return isViali;
        },
        success: function (data)
        {

            console.info(data);

            var jsonData = $.parseJSON(data);//将字符串，转化未jsond对象
            console.info(jsonData);
            if (jsonData.msg == "success") {
                window.location.href = "Index.aspx";
            }
            else {
                $.messager.alert("提示",jsonData.msg);
            }
            
        }
    });
}

