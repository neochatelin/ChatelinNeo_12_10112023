import ModelKeyData from "./modelKeyData";
import ModelUserInfos from "./modelUserInfos";

class ModelUserMainData {
    constructor(UserMainData){
        this.KeyData = new ModelKeyData(UserMainData.data.keyData)
        this.id = UserMainData.id;
        this.userInfos = new ModelUserInfos(UserMainData.userInfos);
        this.score = UserMainData.score ? UserMainData.score : UserMainData.todayScore;
    }
}

export default ModelUserMainData;