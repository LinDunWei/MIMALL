const filter = {
    currency : function(val) {
        if(!val){
            return '0.00'
        }else{
            return '￥'+val.toFixed(2)+'元'
        }

    }

}
export default filter