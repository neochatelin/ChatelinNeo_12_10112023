import DashbordMockService_OBJ from "./DashbordMockService";
import DashbordService_OBJ from "./DashbordService";
import conf from "./conf";
import ModelUserMainData from "../model/modelUserMainData";
import ModelUserActivity from "../model/modelUserActivity";
import ModelUserSessions from "../model/modelUserSessions";
import ModelUserPerformance from "../model/modelUserPerformance";

const urlParams = new URLSearchParams(window.location.search);

let useMock = conf.currentEnv === conf.environement.production ? false : true;
let User;
if (useMock) {
    let DashbordMockService = await new DashbordMockService_OBJ()
    await DashbordMockService.getInfo().then((data)=>{
        User = {
            MainData:       new ModelUserMainData(data.USER_MAIN_DATA.find((elem)=>elem.id === parseInt(urlParams.get("user")) || elem.userId === parseInt(urlParams.get("user")))),
            UserActivity:   new ModelUserActivity(data.USER_ACTIVITY.find((elem)=>elem.id === parseInt(urlParams.get("user")) || elem.userId === parseInt(urlParams.get("user")))),
            UserSessions:   new ModelUserSessions(data.USER_AVERAGE_SESSIONS.find((elem)=>elem.id === parseInt(urlParams.get("user")) || elem.userId === parseInt(urlParams.get("user")))),
            UserPerformance:new ModelUserPerformance(data.USER_PERFORMANCE.find((elem)=>elem.id === parseInt(urlParams.get("user")) || elem.userId === parseInt(urlParams.get("user"))))
        }
    })
}else{
    let DashbordService = new DashbordService_OBJ();
    let status = 'OK';
    await DashbordService.GetUserMainInfo().catch((err)=>{
        console.log(err);
        status = "500"
    });
    status !== "500" ?
    User = {
        MainData: await DashbordService.GetUserMainInfo().then((value)=>{
            return new ModelUserMainData(value);
        }),
        UserActivity: await DashbordService.GetUserActivity().then((value)=>{
            return new ModelUserActivity(value);
        }),
        UserSessions: await DashbordService.GetUserAverageSessions().then((value)=>{
            return new ModelUserSessions(value);
        }),
        UserPerformance: await DashbordService.GetUserPerformance().then((value)=>{
            return new ModelUserPerformance(value);
        }),
    }
    : User = {
        status:500
    }
}

export default User;

