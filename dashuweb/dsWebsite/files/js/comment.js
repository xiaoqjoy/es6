function add0(m){return m<10?'0'+m:m }

//得到yyyy-mm-dd hh:mm:sss的时间格式
function format(shijianchuo){

    var time = new Date(shijianchuo);

    var y = time.getFullYear();

    var m = time.getMonth()+1;

    var d = time.getDate();

    var h = time.getHours();

    var mm = time.getMinutes();

    var s = time.getSeconds();

    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);

}

//得到yyyy-mm-dd的时间格式
function format1(shijianchuo){

    var time = new Date(shijianchuo);

    var y = time.getFullYear();

    var m = time.getMonth()+1;

    var d = time.getDate();

    return y+'-'+add0(m)+'-'+add0(d);

}


function isEmpty(str){
    if(str === undefined||str == "undefined"||str==null||$.trim(str)=="")return true;
    return false;
}

function fileChange(othis) {
    $('.file-input').val($(othis).val());
}
