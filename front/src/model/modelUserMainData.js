import ModelKeyData from "./modelKeyData";
import ModelUserInfos from "./modelUserInfos";

class ModelUserMainData {
    constructor(UserMainData){
        this.keyData = new ModelKeyData(UserMainData.keyData)
        this.id = UserMainData.id;
        this.userInfos = new ModelUserInfos(UserMainData.userInfos);
        this.score = UserMainData.score ? UserMainData.score*100 : UserMainData.todayScore*100;
    }
}

export default ModelUserMainData;