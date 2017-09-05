export default {

  loginAPI:function (username,password,callBack,errorCallBack) {
    axios.post('/login',
      {
        username:username,
        password:password
      }).then(function (response) {
      if (response.data.code === 0) {
        callBack(response.data.data);
      }else {
        errorCallBack(response.data.message);
      }
    })
  },

  /**
   * 石头列表
   */
  getStoneListAPI:function (pageNum, stoneName,callBack) {
    axios.get('/au/stone/stoneList/'+ pageNum +"?stoneName="+stoneName).then(function (response) {
      if(response.data.code === 0) {
        callBack(response.data.data)
      }else {
        alert("出现异常")
      }
    })
  },

  /**
   * 添加大理石
   * @param stoneName
   * @param costPrice
   * @param sellPrice
   * @param remainNum
   * @param sellPoints
   * @param callBack
   * @param errorBack
   */
  editStoneAPI:function (stoneId,stoneName,costPrice,sellPrice,remainNum,sellPoints,callBack,errorBack) {
    axios.post('/au/stone/editStone',{
      stoneId:stoneId,
      stoneName:stoneName,
      costPrice:costPrice,
      sellPrice:sellPrice,
      remainNum:remainNum,
      sellPoints:sellPoints
    }).then(function (response) {
      if (response.data.code === 0) {
        callBack(response.data.data);
      }else {
        errorBack(response.data.message);
      }
    })
  },

  /**
   * 石材大理石
   * @param stoneId
   * @param callBack
   * @param errorBack
   */
  deleteStoneAPI:function (stoneId, callBack, errorBack) {
    axios.delete('/au/stone/' + stoneId).then(function (response) {
      if (response.data.code === 0) {
        callBack(response.data.code)
      }else {
        errorBack(response.data.message);
      }
    })
  },

  batchDeleteStonesAPI(stoneIds, callBack, errorBack) {
    axios.delete('/au/stone/batchDelete/' + stoneIds).then(function (response) {
      if (response.data.code === 0) {
        callBack(response.data.code)
      }else {
        errorBack(response.data.message);
      }
    })
  }
}
