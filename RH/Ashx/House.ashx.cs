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


            string Type = context.Request["Type"];
            string selectValue= context.Request["selectValue"];
            string sort = context.Request["sort"];
            string order = context.Request["order"];
            int page= Convert.ToInt32(context.Request["page"]);
            int rows= Convert.ToInt32(context.Request["rows"]);

            //保存房屋信息参数
            string txtPrice= context.Request["txtPrice"];
            string txtAddress = context.Request["txtAddress"];
            string TypeName1 = context.Request["TypeName1"];
            string txtMaster = context.Request["txtMaster"];
            string txtPhone = context.Request["txtPhone"];
            string txtState = context.Request["txtState"];
            string txtDes1 = context.Request["txtDes1"];

            string Hid = context.Request["Hid"];

            string pram = context.Request["pram"];//删除的参数

            try
            {
                switch (Method)
                {
                    case "GetHouseList":
                        jsonData = GetHouseList(selectValue,sort, order, page, rows);
                        break;
                    case "LoadHouseTypeCombobox":
                        jsonData = LoadHouseTypeCombobox(Type);
                        break;
                    case "LoadStatCombobox":
                        jsonData = LoadStatCombobox();
                        break;
                    case "SaveHouse":
                        jsonData=SaveHouse(txtPrice,txtAddress,TypeName1,txtMaster,txtPhone,txtState,txtDes1);
                        break; 
                    case "GetHouseDetail":
                        jsonData = GetHouseDetail(Hid);
                        break; 
                    case "DetailAllInfo":
                        jsonData = DetailAllInfo(Hid) ;
                        break; 
                    case "EditHoust":
                        jsonData = EditHoust(Hid, txtPrice, txtAddress, TypeName1, txtMaster, txtPhone, txtState, txtDes1);
                        break;    
                    case "DeleHouses":
                        jsonData = DeleHouses(pram);
                        break;
                }
            }
            catch (Exception ex)
            {
                jsonData = JsonConvert.SerializeObject(new { meg= "异常" });
            }

            context.Response.Write(jsonData);
        }


        /// <summary>
        /// 1、查询 2、排序 3、分页
        /// </summary>
        /// <param name="sort"></param>
        /// <param name="order"></param>
        /// <param name="page"></param>
        /// <param name="rows"></param>
        /// <returns></returns>
        public string GetHouseList(string selectValue, string sort,string order,int page,int rows)
        {
            using (RentHouseEntities re = new RentHouseEntities())
            {
                //re.Configuration.ProxyCreationEnabled = false;
                
                IQueryable<v_house> houses=null;

                //1.查询
                if (!String.IsNullOrEmpty(selectValue)&& selectValue!="-1")
                {
                    int TypeId = Convert.ToInt32(selectValue);
                    houses = re.v_house.Where(i => i.TypeId == TypeId);
                }
                else
                {
                    houses = re.v_house;
                }
           

                

                //2.排序
                if (order == "desc")
                {
                    switch (sort)
                    {
                        case "Price":
                            houses=houses.OrderByDescending(i => i.Price);
                            break;
                    }
                }
                else
                {
                    switch (sort)
                    {
                        case "Price":
                            houses=houses.OrderBy(i=>i.Price);
                            break;
                    }
                }

                //3.分页
                int count = houses.Count();
                if (count>0)
                {
                    if (page<=1)
                    {
                        houses = houses.Take(rows);
                    }
                    else
                    {
                        houses = houses.Skip((page - 1) * rows).Take(rows);
                    }

                }

                return JsonConvert.SerializeObject(new { total = count, rows = houses });
            }
        }

        /// <summary>
        /// 加载类型
        /// </summary>
        /// <returns></returns>
        public string LoadHouseTypeCombobox(String Type)
        {
            using (RentHouseEntities re=new RentHouseEntities())
            {
                re.Configuration.ProxyCreationEnabled = false;//避免序列化时造成依赖

                List<HouseType> houseTypes = (from i in re.HouseTypes select i).ToList();
                if (Type!="1")
                {
                    houseTypes.Insert(0, new HouseType() { Id = -1, TypeName = "全部" });
                }
         
                //IQueryable<HouseType> houseTypes = from i in re.HouseTypes select i;

                return JsonConvert.SerializeObject(houseTypes.ToList());
            }
        }
        /// <summary>
        /// 获取所有的房屋状态
        /// </summary>
        /// <returns></returns>
        public string LoadStatCombobox()
        {
            using (RentHouseEntities re=new RentHouseEntities())
            {
                re.Configuration.ProxyCreationEnabled = false;
                List<State> sates = re.States.ToList();
                return JsonConvert.SerializeObject(sates);
            }
        }
        /// <summary>
        /// 保存出租房屋信息
        /// </summary>
        /// <returns></returns>
        public string SaveHouse(string txtPrice, string txtAddress, string TypeName1, string txtMaster, string txtPhone, string txtState, string txtDes1)
        {
            using (RentHouseEntities re=new RentHouseEntities())
            {
                string jsonData = String.Empty;
                re.Houses.Add(new RH.House()
                {
                    Price = Convert.ToDecimal(txtPrice),
                    Address = txtAddress,
                    TypeId = Convert.ToInt32(TypeName1),
                    MaterName = txtMaster,
                    Telephone = txtPhone,
                    StateId = Convert.ToInt32(txtState),
                    Discription = txtDes1
                });

                if (re.SaveChanges()>0)
                {
                    jsonData = JsonConvert.SerializeObject(new { meg="OK" });
                }
                return jsonData;
            }

        }
        /// <summary>
        /// 根据ID,获取单个信息
        /// </summary>
        public string GetHouseDetail(string Hid)
        {
            string resultData = "";

            int ID = Convert.ToInt32(Hid);

            using (RentHouseEntities re=new RentHouseEntities())
            {
                var h = re.Houses.Where(i => i.Hid == ID).FirstOrDefault();

                resultData = "编号是:"+h.Hid+"<br/>"+h.Discription;
            }

            return resultData;
        }
        public string DetailAllInfo(string Hid)
        {
            string resultData = "";

            int ID = Convert.ToInt32(Hid);

            using (RentHouseEntities re = new RentHouseEntities())
            {
                re.Configuration.ProxyCreationEnabled = false;//避免序列化时造成循环依赖

                var h = re.Houses.Where(i => i.Hid == ID).FirstOrDefault();

                resultData = JsonConvert.SerializeObject(h);
            }

            return resultData;
        }
        //修改
        public string EditHoust(string Hid, string txtPrice, string txtAddress, string TypeName1, string txtMaster, string txtPhone, string txtState, string txtDes1)
        {
            string resultData = "";

            int ID = Convert.ToInt32(Hid);

            using (RentHouseEntities re = new RentHouseEntities())
            {
                var h = re.Houses.Where(i => i.Hid == ID).FirstOrDefault();

                if (h!=null)
                {
                    h.Price = Convert.ToDecimal(txtPrice);
                    h.Address = txtAddress;
                    h.TypeId = Convert.ToInt32(TypeName1);
                    h.MaterName = txtMaster;
                    h.Telephone = txtPhone;
                    h.StateId = Convert.ToInt32(txtState);
                    h.Discription = txtDes1;
                }

                if (re.SaveChanges()>0)
                {
                    resultData = JsonConvert.SerializeObject(new { meg="OK" });
                }
                else
                {
                    resultData = JsonConvert.SerializeObject(new { meg = "修改失败！！" });
                }

                
            }

            return resultData;
        }
        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="pram"></param>
        /// <returns></returns>
        public string DeleHouses(string pram)
        {
            using (RentHouseEntities re=new RentHouseEntities())
            {
                string jsonData = "";
                string[] Ids = pram.Split(',');

                if (Ids.Length>0)
                {
                    foreach (string id in Ids)
                    {
                        int d = Convert.ToInt32(id);
                        RH.House h = re.Houses.Where(i=>i.Hid==d).FirstOrDefault();
                        re.Houses.Remove(h);
                    }
                    if (re.SaveChanges()>0)
                    {
                        jsonData = JsonConvert.SerializeObject(new { meg="OK" });
                    }
                    else
                    {
                        jsonData = JsonConvert.SerializeObject(new { meg="失败" });
                    }

                }
                return jsonData;
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