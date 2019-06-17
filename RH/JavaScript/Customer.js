$(function() {
    makeDialog();
});

//扩展验证规则
$.extend($.fn.validatebox.defaults.rules,
    {
        phone://自定义验证手机号
            {
                validator: function (value)
                {
                    return /^(13|15|18|17)\d{9}$/i.test(value);//正则表达式
                },
                message:'手机号格式不正确'
            },
        userName://验证用户名，英文字母和数字组成4~16位字符，以字母开头
            {
                validator: function (value)
                {
                    return /^[a-zA-Z][a-zA-Z0-9]{3,16}$/.test(value);
                },
                message: '用户名由英文字母和数字组成的4~16位字符，以字母开头'
            },
        pwdAgain:
            {
                validator: function (value,param)//param参数，数组类型
                {
                    return value == $(param[0]).val();
                },
                message:'两次密码不一致'
            }
    }
)
//实例化dl
function makeDialog()
{
    $("#dl").dialog({
        width: 600,
        height: 350,
        toolbar: '#btnAdd'
    });
}
function makeNameValidatebox()
{
    $("#").validatebox({
        required: true,
        missingMessage: '',
        validType: 'userName'
    });
}
function makePwd1Validatebox()
{

}

function makePwd2Validatebox()
{

}

//实例化省和直辖市
function makeProvince()
{
    $("#").combobox({
        width: 150,
        valueFileId: '',
        textFild: '',
        url: '',
        method: 'post',
        paneHeight: 'auto',
        editable: false,
        onLoadSuccess: function ()
        {
            var datas = $(this).combobox("getData");

            $(this).combobox("select", datas[0].ID);

            LoadCity($('#province').combobox('getValue'));
        },
        onSelect: function (record)
        {
            LoadCity(record.ID);
        }
    });
}
function loadCity(princeID)
{
    var strUrl = "Pro" + princeID;
    $("#city").combobox({
        width: 150,
        editable: false,
        url: strUrl,
        valueFileId: '',
        textFild: '',
        paneHeight: 'auto',
        onLoadSuccess: function ()
        {
            var datas = $(this).combobox("getData");
            $(this).combobox("select",datas[0].ID);
        }
    });
}


