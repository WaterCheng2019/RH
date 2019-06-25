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
                string CustomerPwd = context.Request["Pwd1"];
                string CityId = context.Request["City"];
                DateTime BornDate = Convert.ToDateTime(context.Request["BornDate"]);
                string Telephone = context.Request["Telephone"];


                int page = Convert.ToInt32(context.Request["page"]);
                int rows = Convert.ToInt32(context.Request["rows"]);
                string sort = context.Request["sort"];
                string order = context.Request["order"];

                string ProvinceId1 = context.Request["ProvinceId"];


                string CustomName = context.Request["CustomName"];
                string ProvinceId2 = context.Request["ProvinceId1"];
                string CityId1 = context.Request["CityId"];

                string CustomerId= context.Request["CustomerId"];



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
                        ResultData = GetCustomList(CustomName, ProvinceId2, CityId1, page, rows, sort, order);
                        break;
                    case "getProvices":
                        ResultData = getProvices();
                        break; 
                     case "getCityById":
                        ResultData = getCityById(ProvinceId1);
                        break;
                    case "GetCustomerById":
                        ResultData = GetCustomerById(CustomerId);
                        break; 
                    case "EditCustomer":
                        ResultData = EditCustomer(CustomerId, CustomerName, CustomerPwd, CityId, BornDate, Telephone);
                        break;
                    case "DeleteCustomer":
                        ResultData = DeleteCustomer(CustomerId);
                        break;

                }
            }
            catch (Exception ex)
            {
                ResultData = JsonConvert.SerializeObject(new { meg="异常 " });
            }

            context.Response.Write(ResultData);
        }
        //获取省信息
        public string GetAllProvice()
        {
            using (RentHouseEntities re = new RentHouseEntities())
            {
                re.Configuration.ProxyCreationEnabled = false;//避免序列化时造成依赖

                List<Province> provinces = re.Provinces.ToList();

                return JsonConvert.SerializeObject(provinces);
            }
        }

        //获取市信息
        public string GetAllCity(int ProvinceId)
        {
            using (RentHouseEntities re = new RentHouseEntities())
            {

                re.Configuration.ProxyCreationEnabled = false;//避免序列化时造成依赖

                List<City> citys = (from i in re.Cities where i.ProvinceId == ProvinceId select i).ToList();

                return JsonConvert.SerializeObject(citys);
            }
        }
        //增加
        public string AddCustomer(string CustomerName, string CustomerPwd, string CityId, DateTime BornDate, string Telephone)
        {
            using (RentHouseEntities re = new RentHouseEntities())
            {
                int cityId = Convert.ToInt32(CityId);
                re.Customers.Add(new RH.Customer()
                {
                    CustomerName = CustomerName,
                    CustomerPwd = CustomerPwd,
                    CityId = cityId,
                    BornDate = BornDate,
                    Telephone = Telephone
                });

                if (re.SaveChanges() > 0)
                {
                    return JsonConvert.SerializeObject(new { meg = "sueecss" });
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
        public string GetCustomList(String CustomName, String ProvinceId2, String CityId1, int page, int rows, string sort, string order)
        {
            //IQueryable<RH.Customer> customs = null;
            using (RentHouseEntities re = new RentHouseEntities())
            {
                re.Configuration.ProxyCreationEnabled = false;

                //1.查询
                var customs = from i in re.Customers
                              join a in re.Cities on i.CityId equals a.CityId
                              join c in re.Provinces on a.ProvinceId equals c.ProvinceId
                              select new
                              {
                                  i.CustomerId,
                                  i.CustomerName,
                                  i.BornDate,
                                  i.Telephone,
                                  cityName = (c.ProvinceName + "—" + a.CityName),
                                  i.CustomerPwd,
                                  c.ProvinceId,
                                  a.CityId
                              };
                if (!String.IsNullOrEmpty(CustomName))
                {
                    customs = customs.Where(i=>i.CustomerName== CustomName);
                }

                if (!String.IsNullOrEmpty(ProvinceId2) && ProvinceId2 != "-1")
                {
                    int Id = Convert.ToInt32(ProvinceId2);
                    customs = customs.Where(i =>i.ProvinceId== Id);
                }

                if (!String.IsNullOrEmpty(CityId1) && CityId1 != "-1")
                {
                    int Id = Convert.ToInt32(CityId1);
                    customs = customs.Where(i=>i.CityId== Id);
                }


                //2.排序
                if (order == "desc")
                {
                    switch (sort)
                    {
                        case "CustomerId":
                            customs = customs.OrderByDescending(i => i.CustomerId);
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
                if (page <= 1)
                {
                    customs = customs.Take(rows);
                }
                else
                {
                    customs = customs.Skip((page - 1) * rows).Take(rows);
                }


                return JsonConvert.SerializeObject(new { total = count, rows = customs.ToList() });
            }
        }
        //获取查询的省份信息
        public string getProvices()
        {
            using (RentHouseEntities re = new RentHouseEntities())
            {
                re.Configuration.ProxyCreationEnabled = false;
                List<Province> proveinces = (from i in re.Provinces select i).ToList();

                proveinces.Insert(0, new Province() { ProvinceId = -1, ProvinceName = "全部" });

                return JsonConvert.SerializeObject(proveinces);
            }
        }
        //根据省份信息筛选出城市
        public string getCityById(string ProvinceId)
        {
            using (RentHouseEntities re=new RentHouseEntities())
            {
                int ID = Convert.ToInt32(ProvinceId);
                re.Configuration.ProxyCreationEnabled = false;
                List<City> citys = null;
                if (ProvinceId!="-1")
                {
                    citys=re.Cities.Where(i => i.ProvinceId == ID).ToList();
                }
                else
                {
                    citys = re.Cities.ToList();
                }
                citys.Insert(0, new City() { CityId = -1, CityName = "全部" });
                return JsonConvert.SerializeObject(citys);

            }
        }
        
        public string GetCustomerById(String CustomerId)
        {
            using (RentHouseEntities re=new RentHouseEntities())
            {
                re.Configuration.ProxyCreationEnabled = false;
                int Id = Convert.ToInt32(CustomerId);

                var customer = (from a in re.Customers
                                       join b in re.Cities on a.CityId equals b.CityId
                                       join c in re.Provinces on b.ProvinceId equals c.ProvinceId
                                       where a.CustomerId==Id
                                       select new
                                       {
                                           a.CustomerId,
                                           a.CustomerName,
                                           a.CustomerPwd,
                                           a.Telephone,
                                           a.BornDate,
                                           b.CityId,
                                           c.ProvinceId
                                       }).FirstOrDefault();

                return JsonConvert.SerializeObject(customer);
            }
        }
        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="CustomerId"></param>
        /// <param name="CustomerName"></param>
        /// <param name="CustomerPwd"></param>
        /// <param name="CityId"></param>
        /// <param name="BornDate"></param>
        /// <param name="Telephone"></param>
        /// <returns></returns>
        public string EditCustomer(string CustomerId, string CustomerName, string CustomerPwd, string CityId, DateTime BornDate, string Telephone)
        {
            using (RentHouseEntities re=new RentHouseEntities())
            {
                int Id = Convert.ToInt32(CustomerId);
                int cityId = Convert.ToInt32(CityId);

                RH.Customer c = re.Customers.Where(i => i.CustomerId == Id).FirstOrDefault();
                if (c!=null)
                {
                    c.CustomerName = CustomerName;
                    c.CustomerPwd = CustomerPwd;
                    c.CityId = cityId;
                    c.BornDate = BornDate;
                    c.Telephone = Telephone;
                }

                if (re.SaveChanges()>0)
                {
                    return JsonConvert.SerializeObject(new { meg= "sueecss" });
                }
                else
                {
                    return JsonConvert.SerializeObject(new { meg = "修改失败" });
                }

            }
        }
        public string DeleteCustomer(String CustomerId)
        {
            int Id = Convert.ToInt32(CustomerId);

            using (RentHouseEntities re=new RentHouseEntities())
            {
                RH.Customer c = re.Customers.Find(Id);
                re.Customers.Remove(c);
                if (re.SaveChanges()>0)
                {
                    return JsonConvert.SerializeObject(new { meg="success" });
                }
                else
                {
                    return JsonConvert.SerializeObject(new { meg = "Fail" });
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