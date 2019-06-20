var isAddOrEdit, URL; //0:添加，1.修改

$(function () {
    maekCombobox();
    makeDataGrid();
    makeAddHouseDialog();//初始化Dialog，并关闭

    //单击添加
    $("#btnAdd").click(function () {
        isAddOrEdit = 0;

        $("#HouseDialog").dialog('open').dialog('setTitle', '增加');//打开关闭的Dialog，并设置标题

        $("#txtPrice").val("");
        $("#txtAddress").val("");
        $("#txtMaster").val("");
        $("#txtPhone").val("");
        $("#txtDes1").val("");
        
        URL = "/Ashx/House.ashx?Method=SaveHouse";
    }); 

    //单击修改
    $("#btnUpadate").click(function () {
        isAddOrEdit = 1;//修改

        var row = $("#tbHouse").datagrid('getSelected');

        if (row) {
            $("#HouseDialog").dialog('open').dialog('setTitle', '编辑');
        

            //回填
            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: '/Ashx/House.ashx?Method=DetailAllInfo&Hid='+row.Hid,
                success: function (data) {
                    $("#TypeName1").combobox("setValue",data.TypeId);
                    $("#txtState").combobox("setValue",data.StateId);
                    $("#txtPrice").val(data.Price);
                    $("#txtAddress").val(data.Address);
                    $("#txtMaster").val(data.MaterName);
                    $("#txtPhone").val(data.Telephone);
                    $("#txtDes1").val(data.Discription);
                },
                error: function (error) {
                    console.info(error);
                }
            });//向服务器异步请求数据，并处理响应的数据

            URL = "/Ashx/House.ashx?Method=EditHoust&Hid="+row.Hid;

        }
        else {
            $.messager.alert("提示", "请选择要编辑行的信息！！", "info");
        }
    });


    //单击确定
    $("#btnOK").click(function () {
        $("#ff").form('submit', {
            url: URL,
            onSubmit: function () {
                var falg = $("#ff").form('validate');
                return falg
            },
            success: function (data) {
                //console.info(data);
                var obj = $.parseJSON(data);//将正确的json 格式转换成js对象，通过名称加.访问属性值
                //console.info(obj);
                //console.info(obj.meg);

                if (obj.meg == "OK") {

                    $("#HouseDialog").dialog("close");
                    if (isAddOrEdit==0) {
                        $.messager.alert("提示", "保存成功！", "info");
                    } else {
                        $.messager.alert("提示", "修改成功！", "info");
                    }

                    $("#tbHouse").datagrid('load');
                }
                else {
                    $.messager.alert("提示", "保存失败！", "info");
                }
            },
            error: function (error) {
                console.info(error);
            }
        });
    });

    //单击删除
    $("#btnDel").click(function () {
        var rows = $("#tbHouse").datagrid("getSelections");

        console.info(rows);

        if (rows) {
            $.messager.confirm("提示", "确定要删除该行吗？", function (r) {
                if (r) {
                    var pram;
                    $.each(rows, function (i,each) {
                        if (i==0) {
                            pram=each.Hid
                        } else {
                            pram += "," + each.Hid;
                        }
                    });
                    console.info(pram);

                    $.ajax({
                        url: '/Ashx/House.ashx?Method=DeleHouses&pram='+pram,
                        success: function (data) {

                        }
                    });
                }
            });
                   
        } else {
            $.messager.alert("提示", "请选择要删去的行数据！！！", "info");
        }


    });
});

$.extend($.fn.validatebox.defaults.rules, {
    Phone: {
        validator: function (value) {
            return /^1[3456789]\d{9}$/.test(value);
        },
        message: '手机必须以13、15、17、18开头的18数字'
    }
});


//实例化HouseDialog
function makeAddHouseDialog() {
    maekCombobox1();
    makeStatCombobox();
    $("#HouseDialog").dialog({
        title: '添加房屋出租信息',
        iconCls: 'icon-edit',
        width: 600,
        panelHeight: 'auto',
        buttons: '#dialogintn',
        shadow: true,
        closed:true,//初始化时关闭Dialog
    });
  
}


//实例化房屋列表
function makeDataGrid()
{
    $("#tbHouse").datagrid({
        title: '房屋列表',
        iconCls:'icon-save',
        panlHeight: 'auto',

        striped: true,//显示斑马效果
        rownumbers: true,//显示行号
        //singleSelect: true,//只选择一行
        fitColumns: true,
        nowrap: true,
        idField: 'Hid',

        autoRowHeight:true,
        
        sortName: 'Price',
        sortOrder: 'desc',

        pagePosition: 'bottom',//定义分页栏的位置
        pagination: true,//底部显示分页工具

        pageNumber: 1,
        pageSize: 10,
        pageList:[10,15,20],

        method:'post',
        url: '/Ashx/House.ashx?Method=GetHouseList',
        toolbar:'#tb',

        view: detailview,
        detailFormatter: function (rowIndex, rowData) {//详细内容
            var content = "";
            //content += "<div styple='padding:5px' id='div_' + rowIndex + ></div>";
            content += "<div id='div_" + rowIndex + "' styple='padding:5px'></div>";

            //console.info(content);
            return content;
        },
        onExpandRow: function (rowIndex, rowData) {//展开时触发
            $("#div_" + rowIndex).panel({
                title: '详情信息展示',
                iconCls: 'icon-save',
                method:'POST',
                loadingMessage:'正在加载数据中,请稍后。。。',
                href: '/Ashx/House.ashx?Method=GetHouseDetail&Hid=' + rowData.Hid,
            });

            $("#tbHouse").datagrid("fixDetailRowHeight", rowIndex);
      
        },
        columns:[
            [
                {align:'center',width:60},
                { title: '基本信息', colspan: 4, align: 'center' },
                { title: '房东信息', colspan: 2, align: 'center' }
            ],//第一个表头
            [
               { field: 'Hid', checkbox: true, width: 60 },
               { field: 'Price', title: '租金', align: 'center', width: 110, sortable: true, formatter: formatRent },//, formatter: formatRent
               { field: 'Address', title: '地址', align: 'center',  width: 180 },
               { field: 'TypeName', title: '房屋类型', align: 'center', width: 100 },
               { field: 'StateName', title: '出租状态', align: 'center', width: 100 },
               { field: 'MaterName', title: '房主', align: 'center',  width: 90 },
               { field: 'Telephone', title: '联系方式', align: 'center', width: 110 },

            ]//第二个表头
                ]
    });

}
//格式化，租金
function formatRent(value,rowData,rowIndex)
{
    if (value == undefined) {
        return " ";
    }
    var result = value.toFixed(2);
    if (result>500) {
        result = '<span style="color:red;">' + result + '</span>';
    }
    return result;
}
//实例化类型下拉框
function maekCombobox()
{
    $("#TypeNames").combobox({
        width: 200,
        editable:false,
        panelHeight:'auto',
        valueField: 'Id',
        textField: 'TypeName',
        url: '/Ashx/House.ashx?Method=LoadHouseTypeCombobox',
        method: 'post',
        onLoadSuccess: function () {

            var datas = $("#TypeNames").combobox('getData');//获取返回的所有数据
            //console.info(datas);

            $("#TypeNames").combobox('select', datas[0].Id);//设置下拉框的第一项
        },
        onChange: function () {
            var selectValue = $("#TypeNames").combobox('getValue');

            //console.info(selectValue);

            //重新加载DataGrid
            $("#tbHouse").datagrid("load", {
                selectValue: selectValue
            });
        }
    });
}

//实例化Dialog房屋类型下拉框
function maekCombobox1() {
    $("#TypeName1").combobox({
        width: 150,
        editable:false,
        panelHeight: 'auto',
        valueField: 'Id',
        textField: 'TypeName',
        url: '/Ashx/House.ashx?Method=LoadHouseTypeCombobox&Type=1',
        method: 'post',
        onLoadSuccess: function () {

            //var datas = $("#TypeName1").combobox('getData');//获取返回的所有数据
            var datas = $("#TypeName1").combobox('getData');//获取combobox数组数据

            $("#TypeName1").combobox('select', datas[0].Id);//设置第一项为默认值
        },
    });
}
//实例化出租房状态下拉框
function makeStatCombobox()
{
    $("#txtState").combobox({
        width: 150,
        editable:false,
        panelHeight: 'auto',
        valueField: 'StateId',
        textField: 'StateName',
        method:'post',
        url: '/Ashx/House.ashx?Method=LoadStatCombobox',
        onLoadSuccess: function () {
            var datas = $("#txtState").combobox('getData');
            $("#txtState").combobox('select', datas[0].StateId);
        }
    });
}


