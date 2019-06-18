﻿$(function() {
    makeDialog();
    makeNameValidatebox();
    makePwd1Validatebox();
    makePwd2Validatebox();
    makeTeleValidatebox();
    makeBrodDate();
    loadProvice();
    AddCustomer();

});
//添加账户
function AddCustomer()
{
    $("#btnAdd").click(function () {
        $("#addf").form("submit", {
            url: '/Ashx/Customer.ashx?Method=AddCustomer',
            onSubmit: function () {
                var falg = $("#addf").form("validate");
                if (!falg) {
                    $.messager.alert("提示", "表单验证未通过！！！");
                    return false;//阻止提交
                }
            },
            success: function (data) {
                jsonObj = $.parseJSON(data);
                if (jsonObj.meg == "sueecss") {
                    $.messager.alert("提示", "sueecss");
                }
                else {
                    $.messager.alert("提示", "添加账户信息失败！！！");
                }
                        
            }
        });

    });

}

//扩展,自定义规则验证
$.extend($.fn.validatebox.defaults.rules,
    {
        phone://自定义验证手机号
            {
                validator: function (value)
                {
                    return /^(13|15|18|17)\d{9}$/i.test(value);//正则表达式
                },
                message:'手机号格式不正确,以13、15、17、18开头的11位数字'
            },
        userName://验证用户名，英文字母和数字组成4~16位字符，以字母开头
            {
                validator: function (value)
                {
                    return /^[a-zA-Z][a-zA-Z0-9]{3,16}$/.test(value);
                },
                message: '用户名由英文字母和数字组成的4~16位字符，以字母开头'
            },
        pwdAgain:
            {
                validator: function (value,param)//param参数，数组类型
                {
                    return value == $(param[0]).val();
                },
                message:'两次密码不一致'
            }
    }
)
//实例化dl
function makeDialog()
{
    $("#dl").dialog({
        title: '账户信息',
        iconCls: 'icon-save',
        width: 600,
        height: 350,
        collapsible: true,
        minimizable: true,
        maximizable:true,
        openAnimation: 'slide',
        buttons: '#btnAdd'
    });
}
//验证会员名
function makeNameValidatebox()
{
    $("#CName").validatebox({
        required: true,
        missingMessage: '请输入会员名！！！',
        validType: 'userName'
    });
}
//密码
function makePwd1Validatebox()
{
    $("#Pwd1").validatebox({
        required: true,
        missingMessage: '请输入密码！！！'
    });
}
//第二次密码
function makePwd2Validatebox()
{
    $("#Pwd2").validatebox({
        required: true,
        missingMessage: '请输入密码！！！',
        //validType: 'pwdAgain'
    });
}
//手机号
function makeTeleValidatebox()
{
    $("#Telephone").validatebox({
        required: true,
        missingMessage: "请输入手机号！！！",
        validType: 'phone'
    });
}
//出生日期
function makeBrodDate()
{
    var button = $.extend([], $.fn.datebox.defaults.buttons);
    button.splice(1, 0, {
        text: '清空',
        handler: function ()
        {
            //$("#BornDate").datebox("setValue", null);
            $("#BornDate").datebox("clear");
            $("#BornDate").datebox("closed");

        }
    });
    $("#BornDate").datebox({
        buttons: button,
        width:200
    });
    
}

//加载市级信息
function loadCity(ProvinceId)
{
    var resquestURL = "/Ashx/Customer.ashx?Method=GetAllCity&ProvinceId="+ProvinceId
    $("#City").combobox({
        width: 150,
        //panelHeight: 'auto',
        valueField: 'CityId',
        textField: 'CityName',
        method:'post',
        url: resquestURL,
        onLoadSuccess: function ()
        {
            var datas = $(this).combobox("getData");
            $(this).combobox("select", datas[0].CityId);
        }
    });
}
//加载省级信息
function loadProvice()
{
    $("#Provice").combobox({
        width: 150,
        //panelHeight: 'auto',
        valueField: 'ProvinceId',
        textField: 'ProvinceName',
        method: 'post',
        url: '/Ashx/Customer.ashx?Method=GetAllProvice',
        onLoadSuccess: function ()
        {
            var datas = $("#Provice").combobox("getData");

            $(this).combobox("select", datas[0].ProvinceId);
            loadCity($("#Provice").combobox("getValue"));
        },
        onSelect: function (record)
        {
            loadCity(record.ProvinceId);
        }
    });
}









