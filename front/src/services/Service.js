import DashbordMockService_OBJ from "./DashbordMockService";
import DashbordService_OBJ from "./DashbordService";
import conf from "./conf";

const urlParams = new URLSearchParams(window.location.search);

let useMock = conf.currentEnv === conf.environement.production ? false : true;
let User;
if (useMock) {
    let DashbordMockService = await new DashbordMockService_OBJ()
    await DashbordMockService.getInfo().then((data)=>{
        User = {
            MainData: data.USER_MAIN_DATA.find((elem)=>elem.id === parseInt(urlParams.get("user")) || elem.userId === parseInt(urlParams.get("user"))),
            UserActivity: data.USER_ACTIVITY.find((elem)=>elem.id === parseInt(urlParams.get("user")) || elem.userId === parseInt(urlParams.get("user"))),
            UserSessions: data.USER_AVERAGE_SESSIONS.find((elem)=>elem.id === parseInt(urlParams.get("user")) || elem.userId === parseInt(urlParams.get("user"))),
            UserPerformance: data.USER_PERFORMANCE.find((elem)=>elem.id === parseInt(urlParams.get("user")) || elem.userId === parseInt(urlParams.get("user"))).data
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
            return value;
        }),
        UserActivity: await DashbordService.GetUserActivity().then((value)=>{
            return value;
        }),
        UserSessions: await DashbordService.GetUserAverageSessions().then((value)=>{
            return value;
        }),
        UserPerformance: await DashbordService.GetUserPerformance().then((value)=>{
            return value ? value.data : '';
        }),
    }
    : User = {
        status:500
    }
}

export default User;