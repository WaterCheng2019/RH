using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace RH.Ashx
{
    /// <summary>
    /// Customer 的摘要说明
    /// </summary>
    public class Customer : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";

            String ResultData = "";

           

            try
            {
                String method = context.Request["Method"];
                string ProvinceId = context.Request["ProvinceId"];

                string CustomerName = context.Request["CName"];
                string CustomerPwd= context.Request["Pwd1"];
                int CityId= Convert.ToInt32(context.Request["City"]);
                DateTime BornDate= Convert.ToDateTime(context.Request["BornDate"]);
                string Telephone= context.Request["Telephone"];


                int page= Convert.ToInt32(context.Request["page"]);
                int rows= Convert.ToInt32(context.Request["rows"]);
                string sort= context.Request["sort"];
                string order= context.Request["order"];

                switch (method)
                {

                    case "GetAllProvice":
                        ResultData = GetAllProvice();
                        break;
                    case "GetAllCity":
                        ResultData = GetAllCity(Convert.ToInt32(ProvinceId));
                        break;
                    case "AddCustomer":
                        ResultData = AddCustomer(CustomerName, CustomerPwd, CityId, BornDate, Telephone);
                        break;
                    case "GetCustomList":
                        ResultData = GetCustomList(page, rows, sort, order);
                        break;
                }
            }
            catch (Exception ex)
            {
         
            }
          
            context.Response.Write(ResultData);
        }
        //获取省信息
        public string GetAllProvice()
        {
            using (RentHouseEntities re=new RentHouseEntities())
            {
                re.Configuration.ProxyCreationEnabled = false;//避免序列化时造成依赖

                List<Province> provinces = re.Provinces.ToList();

                return JsonConvert.SerializeObject(provinces);
             }
        }

        //获取市信息
        public string GetAllCity(int ProvinceId)
        {
            using (RentHouseEntities re=new RentHouseEntities())
            {

                re.Configuration.ProxyCreationEnabled = false;//避免序列化时造成依赖

                List<City> citys = (from i in re.Cities where i.ProvinceId==ProvinceId select i).ToList();

                return JsonConvert.SerializeObject(citys);
            }
        }

        public string AddCustomer(string CustomerName,string CustomerPwd,int CityId,DateTime BornDate,string Telephone)
        {
            using (RentHouseEntities re=new RentHouseEntities())
            {
                re.Customers.Add(new RH.Customer()
                {
                    CustomerName = CustomerName,
                    CustomerPwd = CustomerPwd,
                    CityId = CityId,
                    BornDate = BornDate,
                    Telephone = Telephone
                });

                if (re.SaveChanges()>0)
                {
                    return JsonConvert.SerializeObject(new { meg="sueecss" });
                }
                else
                {
                    return JsonConvert.SerializeObject(new { meg = "添加账户失败！！！" });
                }
            }
        }

        /// <summary>
        ///获取会员信息
        /// </summary>
        /// <returns></returns>
        public string GetCustomList(int page,int rows,string sort,string order)
        {
            IQueryable<RH.Customer> customs = null;

            using (RentHouseEntities re=new RentHouseEntities())
            {
                //1.查询
                customs = from i in re.Customers select i;

                //2.排序
                if (order=="desc")
                {
                    switch (sort)
                    {
                        case "CustomerId":
                            customs = customs.OrderByDescending(i=>i.CustomerId);
                            break;
                    }
                }
                else
                {
                    switch (sort)
                    {
                        case "CustomerId":
                            customs = customs.OrderBy(i => i.CustomerId);
                            break;
                    }
                }

                //3.分页
                int count = customs.Count();
                if (page<=1)
                {
                    customs = customs.Take(rows);
                }
                else
                {
                    customs = customs.Skip((page - 1) * rows).Take(rows);
                }


                return JsonConvert.SerializeObject(new {total=count, rows=customs.ToList() });
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