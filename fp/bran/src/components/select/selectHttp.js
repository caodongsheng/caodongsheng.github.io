import {postjson} from '@/scripts/syn'
export function get_type_list(_this,demand,parmas_id,typeCode){
    /*  if(demand==1){
        return _this.$store.state.select_address;
      }
      else{
       return  _this.$store.state.select
      }*/
    // console.log(_this)
    // _this.$http.post('http://user.eap2.net/api/demand/classify',{
    //     params: {
    //       help_type_code: 1
    //     }
    // }).then(function (res) {
    //     console.log(res);
    //     if(res){
    //
    //     }
    // }).catch(function (error) {
    //     console.log(error);
    // });
    if(demand==1){//地区
        if(_this.$store.state.select_address.length<=0 || _this.$store.state.select_address == null){
            _this.$store.state.select_address=[
                {
                    "id": "448502271404146688",
                    "help_type_code": "2",
                    "category_name": "北京",
                    "nodes": [
                        {
                            "id": "456548348741025792",
                            "help_type_code": "2",
                            "category_name": "通州",
                            "nodes": [
                                {
                                    "id": "456817154939944961",
                                    "help_type_code": "2",
                                    "category_name": "街1",
                                    "nodes": []
                                },
                                {
                                    "id": "456817154939944962",
                                    "help_type_code": "2",
                                    "category_name": "东风北桥",
                                    "nodes": []
                                },
                                {
                                    "id": "456817154939944963",
                                    "help_type_code": "2",
                                    "category_name": "将台",
                                    "nodes": []
                                },
                                {
                                    "id": "456817154939944",
                                    "help_type_code": "2",
                                    "category_name": "898",
                                    "nodes": []
                                },{
                                    "id": "456817154939944963",
                                    "help_type_code": "2",
                                    "category_name": "扶贫网",
                                    "nodes": []
                                },
                                {
                                    "id": "4568171549399449631",
                                    "help_type_code": "2",
                                    "category_name": "扶贫网2",
                                    "nodes": []
                                },
                                {
                                    "id": "4568171549399449632",
                                    "help_type_code": "2",
                                    "category_name": "扶贫网3",
                                    "nodes": []
                                },
                                {
                                    "id": "4568171549399449636",
                                    "help_type_code": "2",
                                    "category_name": "扶贫网5",
                                    "nodes": []
                                }
                            ]
                        }
                     ]
                 }
              ]
              return _this.$store.state.select_address;
        }
        // console.log(_this.$store.state.select);
      return _this.$store.state.select_address;
    }else{ //需求
        // if(_this.$store.state.select.length<=0 || _this.$store.state.select == null){
            _this.$http.post('hts/demand/classify',{
                'help_type_code': typeCode
            }).then(function (res) {
                _this.$store.state.select=res.data.vos
            }).catch(function (error) {
                console.log(error);
            });
        // }else{
             // parmas_id
             // console.log(_this.$store.state.select)
             let a=_this.$store.state.select
             for(let i=0;i<_this.$store.state.select.length;i++){
                 // console.log(_this.$store.state.select[i].id)
                 if(_this.$store.state.select[i].id===parmas_id){
                     a= _this.$store.state.select[i].nodes
                 }
             }
             return a
        // }


    }

}
export function get_status_list(_this,i,type,level){
     // console.log(_this)
     // console.log('title:',_this.datas[i].title)
    //_this.$http.post('http://user.eap2.net/api/demand/classify',{

    //   _this.$http.post('hts/demand/classify',{
    //     'help_type_code': ''
    // }).then(function (res) {
    //     console.log(res);
    //     if(res){

    //     }
    // }).catch(function (error) {
    //     console.log(error);
    // });

   // let title = _this.datas[i].title
   _this.$store.state.select_type_status = _this.$store.state.select_status;
   if(type == 4){
       _this.$store.state.select_type_status = ['全部','帮扶中','待送出','已送出','发布超时','帮扶成功','帮扶失败','已关闭','待审核','审核不通过']
   }else if(type == 1 || type == 2 || type == 3){
    _this.$store.state.select_type_status=['全部','帮扶中','等待提现','提现中','发布超时','帮扶成功','帮扶失败','已关闭','待审核','审核不通过']
   }else if(type == 0 || type == ''){
       _this.$store.state.select_type_status = ['全部','帮扶中','等待提现','提现中','待送出','已送出','发布超时','帮扶成功','帮扶失败','已关闭','待审核','审核不通过']
   }else if(type == 5){
        // _this.$store.state.select_type_status = ['教育','医疗','住房','物品','自强'];
        let typeList = ['全部'];
        _this.$store.state.select_type_status = typeList.concat(_this.$store.state.helptypeList);
   }
   else{
        if(level == 1){
            _this.$store.state.select_type_status=['全部','省级','市级','县级','乡级','村级'];
        }else if(level == 2){
            _this.$store.state.select_type_status=['全部','市级','县级','乡级','村级'];
        }else if(level == 3){
            _this.$store.state.select_type_status=['全部','县级','乡级','村级'];
        }else if(level == 4){
             _this.$store.state.select_type_status=['全部','乡级','村级'];
        }else{
            _this.$store.state.select_type_status=['村级'];
        }
   }
    // if(_this.$store.state.select_status.length<=0 || _this.$store.state.select_status == null){
    //         // if(_this.datas[i].title == '类型') {
    //         //     _this.$store.state.select_status=['全部','帮扶中','等待提现','提现中','待送出','已送出','发布超时','帮扶成功','帮扶失败','已关闭','待审核','审核不通过']
    //         // }else if(_this.datas[i].title == '管理员类型'){
    //         //          // console.log(2222)
    //         //     _this.$store.state.select_status = ['全部','省级','市级','县级','乡级','村级'];
    //         // }
    //         _this.$store.state.select_status=['全部','帮扶中','等待提现','提现中','待送出','已送出','发布超时','帮扶成功','帮扶失败','已关闭','待审核','审核不通过']
    //     }
    // console.log(_this.$store.state.select_status);
    return _this.$store.state.select_type_status;

}
