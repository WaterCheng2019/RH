
var URL, isAddOrEdit;
$(function () {

    makedgCustom();
    
    makeDialog();
    makeNameValidatebox();
    makePwd1Validatebox();
    makePwd2Validatebox();
    makeTeleValidatebox();
    makeBrodDate();
    loadProvice();
    AddCustomer();

    loadprovice();
    makeTextBox();

    //查询
    $("#btnSearch").click(function () {
        var CustomName = $("#CustomeName").textbox('getText');
        var ProvinceId1 = $("#ProvinceId1").textbox('getValue');
        var CityId = $("#City1").textbox('getValue');

        $("#dgCustom").datagrid('load',{
            CustomName: CustomName,
            ProvinceId1: ProvinceId1,
            CityId, CityId
        });
    });

    //增加
    $("#btnAdd").click(function () {
        
        clearText();
        $("#dl").dialog('open');
        $("#dl").dialog('setTitle','增加会员信息');
        isAddOrEdit = 0;//增加
        URL = '/Ashx/Customer.ashx?Method=AddCustomer&Random=' + Math.random();
    });
    //修改
    $("#btnEdit").click(function () {
        var row = $("#dgCustom").datagrid('getSelected');//获取页面第一个选中行
      
        if (row) {
            $("#dl").dialog('open');
            $("#dl").dialog('setTitle', '修改会员信息');
            //回填数据
     
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/Ashx/Customer.ashx?Method=GetCustomerById&CustomerId=' + row.CustomerId,
                success: function (data) {
                    
                    CName.value = data.CustomerName;
                    Pwd1.value = data.CustomerPwd;
                    Pwd2.value = data.CustomerPwd;
                    Telephone.value = data.Telephone;
                    $("#BornDate").datebox('setValue', data.BornDate);
                    //console.info(data.BornDate);

                    $("#City").combobox('setValue', data.CityId);
                    $("#Provice").combobox('setValue', data.ProvinceId);
                  

                    //console.info(data.CustomerName);
                    //console.info(data);

                }
            });
          
            isAddOrEdit = 1;//修改
           // URL = '/Ashx/Customer.ashx?Method=EditCustomer&Random='+Math.random;
            URL = '/Ashx/Customer.ashx?Method=EditCustomer&CustomerId=' + row.CustomerId+'&Random='+Math.random();

        } else {
            $.messager.alert("温馨提示", "请选择要修改的数据行！！", "info");
        }
    });

    //删除
    $("#btnDele").click(function () {

        var row = $("#dgCustom").datagrid('getSelected');
        if (row) {
            $.messager.confirm("温馨提示", "确定要删除该行数据吗？", function () {
                console.info(row.CustomerId);
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: '/Ashx/Customer.ashx?Method=DeleteCustomer&CustomerId=' + row.CustomerId + "&Random=" + Math.random(),
                    success: function (data) {
                        if (data.meg == "success") {
                            $.messager.alert("温馨提示", "删除成功！！！", "info");
                            $("#dgCustom").datagrid('load');
                            $("#dgCustom").datagrid('clearSelections');
                        } else {
                            $.messager.alert("温馨提示", "删除失败！！！", "info");
                        }
                    },
                    error: function (error) {
                        console.info(error);
                    }
                });

            });
        } else {
            $.messager.alert("温馨提示", "请选择要删除的行数据！！！", "info");
        }
    });

    //导出Execl
    $("#btnExcel").click(function () {
        $("#dgCustom").datagrid('toExcel', 'datagrid.xls');//导出Excel   

    });

});
//会员列表
function makedgCustom() {
    $("#dgCustom").datagrid({
        title: '会员信息列表',
        iconCls: 'icon-save',

        height: $(window).height() - 35,
       // width: $(window).width() - 10,

        method: 'POST',
        url: '/Ashx/Customer.ashx?Method=GetCustomList&Random=' + Math.random,

        idField: 'CustomerId',

        fitColumns: true,
        striped: true,
        rownumbers: true,
        singleSelect: true,
        nowrap: true,
        autoRowHeight: true,

        sortName: 'CustomerId',
        sortOrder: 'desc',

        pagePosition: 'bottom',

        pagination: true,
        pageSize: 10,
        pageList: [10, 20, 100, 1000],
        onLoadSuccess: function (data) {
            //console.info(data);
        },


        toolbar: '#tb',
        columns:
            [
                [
                    { field: 'CustomerId', title: '编号', width: 100, align: 'center', sortable:true },
                    { field: 'CustomerName', title: '会员名称', width: 100, align: 'center' },
                    { field: 'cityName', title: '所在城市', width: 100, align: 'center'},
                    { field: 'BornDate', title: '出生日期', width: 100, align: 'center', formatter:formatBornDate },
                    { field: 'Telephone', title: '手机号码', width: 100, align: 'center' },
                    { field: 'CustomerPwd', title: '密码', width: 100, align: 'center', formatter:formatPwd }
                ]
           ]
    });
}


//添加或修改
function AddCustomer() {
    $("#btnSave").click(function () {
        console.info(URL);
        $("#addf").form("submit", {
            url: URL,
            onSubmit: function () {
                var falg = $("#addf").form("validate");
                if (!falg) {
                    $.messager.alert("提示", "表单验证未通过！！！");
                    return false;//阻止提交
                }
            },
            success: function (data) {
                jsonObj = $.parseJSON(data);
                console.info(data);
                if (jsonObj.meg == "sueecss") {

                    if (isAddOrEdit==0) {
                        $.messager.alert("温馨提示", "增加成功！！！", "info");
                    } else {
                        $.messager.alert("温馨提示", "修改成功！！！", "info");
                    }

                    //$.messager.alert("提示", "保存成功！！！", "info");
                    $("#dgCustom").datagrid('load');//刷新DataGrid
                    $("#dl").dialog('close');//关闭Dialog
                    $("#dgCustom").datagrid('clearSelections');//清除所选行


                }
                else {
                    $.messager.alert("提示", "保存失败："+data.meg, "info");
                }
            }
        });
    });
}

//格式化所在城市列
function formatBornDate(value,row,index) {
    if (value==undefined) {
        return "";
    }
    var data = new Date(value);
    var year = data.getFullYear();
    var moth = data.getMonth() + 1;
    var day = data.getDate();

    //console.info("value：" + value);
    //console.info("data：" + data);
    //console.info("day：" + day);

    return year + "-" + moth + "-" + day;
}
//格式化密码
function formatPwd(value, row, index) {
    if (value==undefined) {
        return "";
    }
    return "<span style='color:red'>********</span>";
}

//实例化省下拉框
function loadprovice() {
    $("#ProvinceId1").combobox({
        width:150,
        method: 'POST',
        url: '/Ashx/Customer.ashx?Method=getProvices&Random='+Math.random(),
        valueField: 'ProvinceId',
        textField: 'ProvinceName',
        onLoadSuccess: function () {//加载成功后，默认选择第一项" 全部 "
            var datas = $("#ProvinceId1").combobox('getData');
            $("#ProvinceId1").combobox('select', datas[0].ProvinceId);

            loadCity1(datas[0].ProvinceId);
        },
        onChange: function () {
            var ProvinceId = $("#ProvinceId1").combobox('getValue');
            //console.info(ProvinceId);
            loadCity1(ProvinceId);
        }
    });
}
//实例化市级下拉框
function loadCity1(ProvinceId) {
    $("#City1").combobox({
        width: 150,
        method: 'POST',
        url: '/Ashx/Customer.ashx?Method=getCityById&ProvinceId=' + ProvinceId + "&Random=" + Math.random,
        valueField: 'CityId',
        textField: 'CityName',
        onLoadSuccess: function () {//加载成功后，默认选择第一项" 全部 "
            var datas = $("#City1").combobox('getData');
            $("#City1").combobox('select', datas[0].CityId);
        }
    });
}

//实例化会员名称
function makeTextBox() {
    $("#CustomeName").textbox({
        width: 150,
        prompt:'请输入会员名称'
    });
}


//清空表单
function clearText() {
    $("#CName").val("");
    $("#Pwd1").val("");
    $("#Pwd2").val("");
    $("#text").val("");
    $("#Telephone").val("");
    $("#BornDate").datebox('clear');
    $("#Provice").combobox('setValue',1);
    $("#City").combobox('setValue',1);
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
        closed:true,
        collapsible: true,
        minimizable: true,
        maximizable: true,
        openAnimation: 'slide',
        buttons: '#btnSave'
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
            $("#BornDate").datebox("clear");
            //$("#BornDate").datebox("closed");
        }
    });
    $("#BornDate").datebox({
        buttons: button,
        width: 200,
        editable:false
    });

}

//加载市级信息
function loadCity(ProvinceId) {
    var resquestURL = "/Ashx/Customer.ashx?Method=GetAllCity&ProvinceId=" + ProvinceId + "&Random=" + Math.random();
    $("#City").combobox({
        width: 150,
        editable:false,
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
        editable:false,
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









