/**
 * Created by SPACEY on 2017/1/15.
 */
//export {ajax}
import jQuery from 'jquery'
/*ajax方法*/
let ajax = function(url,sendData,success){
    jQuery.ajax({
        url: url,
        type: 'POST',
        data: sendData,
        dataType: 'json',
        xhrFields: {withCredentials: true},
        success: function(data){
            success(data);
        }
    });
};

export {ajax}