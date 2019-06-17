using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RH
{
    public class TreeNode
    {
        public TreeNode()
        {
            children = new List<TreeNode>();
            attribute = new NodeAttributet();
        }

        public int Id { get; set; }
        public string text { get; set; }
        public string state { get; set; }

        public List<TreeNode> children { get; set; }//子节点
        public NodeAttributet attribute { get; set; }//自定义属性

    }

    public class NodeAttributet
    {
        public String url { get; set; }
    }
}