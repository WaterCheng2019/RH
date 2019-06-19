$(function () {
    makeTree();
});

//实例导航菜单
function makeTree()
{
    $("#meau").tree({
        animate: true,
        width: 200,
        method:'post',
        url: 'Ashx/Index.ashx?Method=GetMeanu',
        onSelect: function (node)//单击菜单栏事件
        {
            if (node.attribute.url != null) {
                addTabs(node.text, node.attribute.url);
            }    
        }
        });
}

//添加选项卡
function addTabs(title, url)
{
    var flag = $("#tabs").tabs("exists", title);
    if (!flag) {//选项卡不存在
        $("#tabs").tabs("add", {//调用Tabs组件add方法
            title: title,
            iconCls: 'icon-save',
            selected: true,
            closable: true,
            content: creatFram(url)
        });
    }
    else {//选项卡存在
        $("#tabs").tabs("select", title);
    }
}

//增加选项卡中，创建子窗口
function creatFram(url)
{
    var s = '<iframe scrolling="auto" frameborder="0" src="' + url + '" width=99% height=99%></iframe>';
    return s;

}

function ChangeTheme()
{    
    var $easyuiThere = $("#easyuiTheme");
    var Theme=$("option:selected").val();
    var url = $easyuiThere.attr("href");
    var href = url.substring(0, url.indexOf('themes')) + '/themes/' + Theme+"/easyui.css";
    $easyuiThere.attr('href', href);
}



