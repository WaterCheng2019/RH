using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace RH.Handler
{
    /// <summary>
    /// Login 的摘要说明
    /// </summary>
    public class Login : IHttpHandler
    { 
        public HttpRequest Request { get; set; }

        public void ProcessRequest(HttpContext context)
        {
            String result = "";
            try
            {
                context.Response.ContentType = "text/plain";
                String method="", Name="", Pwd="";
                if (!String.IsNullOrEmpty(context.Request.QueryString["Method"]))
                {
                    method = context.Request["Method"].ToString();
                }

                if (!String.IsNullOrEmpty(context.Request["Name"]))
                {
                    Name = context.Request["Name"].ToString();
                }


                if (!String.IsNullOrEmpty(context.Request["Pwd"]))
                {
                    Pwd = context.Request["Pwd"].ToString();
                }


                switch (method)
                {
                    case "GetList":
                        result= GetList(Name, Pwd);
                        break;

                }

            }
            catch (Exception ex)
            {
               
                result = JsonConvert.SerializeObject(new { msg = "异常信息" });
            }

            context.Response.Write(result);
        }

        /// <summary>
        /// 登陆
        /// </summary>
        /// <param name="name"></param>
        /// <param name="pwd"></param>
        /// <returns></returns>
        public String GetList(String name, String pwd)
        {
            using (RentHouseEntities re = new RentHouseEntities())
            {
                String JsonResult = "";
                int row = re.Admins.Where(i => i.LoginName == name && i.LoginPwd == pwd).Count();

                if (row > 0)
                {
                    JsonResult = JsonConvert.SerializeObject(new { msg = "success" });
                }
                else
                {
                    JsonResult = JsonConvert.SerializeObject(new { msg = "账号密码错误！！！" });
                }
                return JsonResult;
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