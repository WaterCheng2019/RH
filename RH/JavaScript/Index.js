$(function () {
    makeTree();
});

//实例导航菜单
function makeTree()
{
    $("#meau").tree({
        animate: true,
        width:200,
        url: 'Ashx/Index.ashx?Method=GetMeanu'
       
        
    });
    //var json = { "Id": 0, "text": "房屋出租管理系统", "state": null, "children": [{ "Id": 1, "text": "房屋出租", "state": null, "children": [], "attribute": { "url": null } }, { "Id": 2, "text": "账号管理", "state": null, "children": [], "attribute": { "url": null } }], "attribute": { "url": null } }
    //console.info(json);
}