$(function () {
    makedgCustom();

    //makeDialog();
    makeNameValidatebox();
    makePwd1Validatebox();
    makePwd2Validatebox();
    makeTeleValidatebox();
    makeBrodDate();
    loadProvice();
    AddCustomer();

});
//会员列表
function makedgCustom() {
    $("#dgCustom").datagrid({
        title: '会员信息列表',
        iconCls: 'icon-save',

        method: 'post',
        url:'/Ashx/Customer.ashx?Method=GetCustomList&Random=' + Math.random(),

        idField: 'CustomerId',

        fitColumns: true,
        striped: true,
        rownumbers: true,

        sortName: 'CustomerId',
        sortOrder: 'desc',


        pagination: true,
        pageSize: 10,
        pageList: [10, 20, 100, 1000],

        toolbar: '',
        columns:
            [
                    { field: 'CustomerId', title: '编号', width: '100', align: 'center' },
                    { field: 'CustomerName', title: '会员名称', width: '100', align: 'center' },
                    { field: 'CityId', title: '所在城市', width: '100', align: 'center' },
                    { field: 'BornDate', title: '出生日期', width: '100', align: 'center' },
                    { field: 'Telephone', title: '手机号码', width: '100', align: 'center' }
           ]
    });
}




//添加账户
function AddCustomer() {
    $("#btnAdd").click(function () {
        $("#addf").form("submit", {
            url: '/Ashx/Customer.ashx?Method=AddCustomer&Random=' + Math.random(),
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
                    $.messager.alert("提示", "保存成功！！！", "info");
                }
                else {
                    $.messager.alert("提示", data.meg, "info");
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
                validator: function (value) {
                    return /^(13|15|18|17)\d{9}$/i.test(value);//正则表达式
                },
                message: '手机号格式不正确,以13、15、17、18开头的11位数字'
            },
        userName://验证用户名，英文字母和数字组成4~16位字符，以字母开头
            {
                validator: function (value) {
                    return /^[a-zA-Z][a-zA-Z0-9]{3,16}$/.test(value);
                },
                message: '用户名由英文字母和数字组成的4~16位字符，以字母开头'
            },
        pwdAgain:
            {
                validator: function (value, param)//param参数，数组类型
                {
                    return value == $(param[0]).val();
                },
                message: '两次密码不一致'
            }
    }
)
//实例化dl
function makeDialog() {
    $("#dl").dialog({
        title: '账户信息',
        iconCls: 'icon-save',
        width: 600,
        height: 350,
        collapsible: true,
        minimizable: true,
        maximizable: true,
        openAnimation: 'slide',
        buttons: '#btnAdd'
    });
}
//验证会员名
function makeNameValidatebox() {
    $("#CName").validatebox({
        required: true,
        missingMessage: '请输入会员名！！！',
        validType: 'userName'
    });
}
//密码
function makePwd1Validatebox() {
    $("#Pwd1").validatebox({
        required: true,
        missingMessage: '请输入密码！！！'
    });
}
//第二次密码
function makePwd2Validatebox() {
    $("#Pwd2").validatebox({
        required: true,
        missingMessage: '请输入密码！！！',
        validType: "pwdAgain['#Pwd1']",
    });



}
//手机号
function makeTeleValidatebox() {
    $("#Telephone").validatebox({
        required: true,
        missingMessage: "请输入手机号！！！",
        validType: 'phone'
    });
}
//出生日期
function makeBrodDate() {
    var button = $.extend([], $.fn.datebox.defaults.buttons);
    button.splice(1, 0, {
        text: '清空',
        handler: function () {
            //$("#BornDate").datebox("setValue", null);
            $("#BornDate").datebox("closed").datebox("clear");
            //$("#BornDate").datebox("closed");


        }
    });
    $("#BornDate").datebox({
        buttons: button,
        width: 200
    });

}

//加载市级信息
function loadCity(ProvinceId) {
    var resquestURL = "/Ashx/Customer.ashx?Method=GetAllCity&ProvinceId=" + ProvinceId + "&Random=" + Math.random();
    $("#City").combobox({
        width: 150,
        //panelHeight: 'auto',
        valueField: 'CityId',
        textField: 'CityName',
        method: 'post',
        url: resquestURL,
        onLoadSuccess: function () {
            var datas = $(this).combobox("getData");
            $(this).combobox("select", datas[0].CityId);
        }
    });
}
//加载省级信息
function loadProvice() {
    $("#Provice").combobox({
        width: 150,
        //panelHeight: 'auto',
        valueField: 'ProvinceId',
        textField: 'ProvinceName',
        method: 'post',
        url: '/Ashx/Customer.ashx?Method=GetAllProvice&Random=' + Math.random(),
        onLoadSuccess: function () {
            var datas = $("#Provice").combobox("getData");

            $(this).combobox("select", datas[0].ProvinceId);
            loadCity($("#Provice").combobox("getValue"));
        },
        onSelect: function (record) {
            loadCity(record.ProvinceId);
        }
    });
}









