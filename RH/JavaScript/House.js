$(function () {
    makeDataGrid();
});
//实例化房屋列表
function makeDataGrid()
{
    $("#tbHouse").datagrid({
        width: 900,
        title: '房屋列表',
        iconCls:'icon-save',
        panlHeight: 'auto',

        striped: true,//显示斑马效果
        rownumbers: true,//显示行号
        singleSelect:true,//只选择一行
        idField: 'Hid',

        autoRowHeight:false,
        
        sortName: 'Price',
        sortOrder: 'desc',

        
        pagination: true,//底部显示分页工具
        pageSize: 5,
        pageList:[5,10,15],

        method:'post',
        url: '/Ashx/House.ashx?Method=GetHouseList',
        toolbar:'#tb',

        columns:[
            [
                {align:'center',width:60},
                {titleL:'基本信息',colspan:3,align:'center',width:390},
                {titleL:'房东信息',colspan:3,align:'center',width:240}
            ],//第一个表头
            [
               { field: 'Hid', checkbox: true, width: 60 },
               { field: 'Price', title: '租金', align: 'center', width: 110, sortable: true },//, formatter: formatRent
               { field: 'Address', title: '地址', align: 'center',  width: 180 },
               { field: 'TypeName', title: '房屋类型', align: 'center', width: 100 },
               { field: 'StateName', title: '是否出租', align: 'center', width: 100 },
               { field: 'MaterName', title: '房主', align: 'center',  width: 90 },
               { field: 'Telephone', title: '联系方式', align: 'center', width: 110 },

            ]//第二个表头
                ]
    });

}
//格式化，租金
function formatRent(value,rowData,rowIndex)
{
    if (vale==undefined) {
        return "";
    }
    var result=value.toFixed(2);
    if (result>400) {
        result = '<span style="color:red;">' + result + '</span>';
    }
    return result;
            
}