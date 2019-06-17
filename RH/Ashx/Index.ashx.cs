using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace RH.Ashx
{
    /// <summary>
    /// Index 的摘要说明
    /// </summary>
    public class Index : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            String JsonData = "";

            try
            {
                String Method = context.Request["Method"].ToString();
                switch (Method)
                {
                    case "GetMeanu":

                        JsonData = GetTreeList();

                        break;
                }

            }
            catch (Exception ex)
            {
                
            }



            context.Response.Write(JsonData);
        }

        public string GetTreeList()
        {
            using (RentHouseEntities re=new RentHouseEntities())
            {
                List<TreeNode> nodes = new List<TreeNode>();

                TreeNode rNode = new TreeNode() { Id = 0, text = "房屋出租管理系统" };

                List<Menu> menus = re.Menus.ToList();

                if (menus!=null)
                {
                    foreach (Menu menu in menus)
                    {
                        TreeNode Menu = new TreeNode() { Id=menu.MenuId, text=menu.MenuName};

                        AddMenuLevel(Menu.Id,Menu);//添加一级菜单子节点

                        rNode.children.Add(Menu);
                    
                    }
                }
                return JsonConvert.SerializeObject(rNode);

            }
        }
        
        public void AddMenuLevel(int MenuId,TreeNode node)
        {
            using (RentHouseEntities re=new RentHouseEntities())
            {
                List<MenuLevel> menuLevels = re.MenuLevels.Where(i=>i.MenuId==MenuId).ToList();
                foreach (MenuLevel menulevel  in menuLevels)
                {
                    TreeNode MenuLevel = new TreeNode() { Id = menulevel.MenuId, text = menulevel.MenuLevelName };
                    MenuLevel.attribute.url = menulevel.MenuLevelURL;
                    node.children.Add(MenuLevel);
                }
            }
            
        }  

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}