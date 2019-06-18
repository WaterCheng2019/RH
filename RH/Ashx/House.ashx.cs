using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace RH.Ashx
{
    /// <summary>
    /// House 的摘要说明
    /// </summary>
    public class House : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            String jsonData = String.Empty;

            String Method = context.Request["Method"];

            try
            {
                switch (Method)
                {
                    case "GetHouseList":
                        jsonData = GetHouseList();
                        break;

                }
            }
            catch (Exception ex)
            {
                jsonData = JsonConvert.SerializeObject(new { meg= "异常" });
            }



            context.Response.Write(jsonData);
        }

        public string GetHouseList()
        {
            using (RentHouseEntities re = new RentHouseEntities())
            {
                List<v_house> houses = re.v_house.ToList();

                return JsonConvert.SerializeObject(houses);
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