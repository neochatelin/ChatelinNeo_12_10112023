const urlParams = new URLSearchParams(window.location.search);

class DashbordService_OBJ{
    async GetBackendData(url){
        const reponse = await fetch(url);
        let data;
        data = await reponse.json();
        if (!reponse.ok) {
            return {status: reponse.status}
        }
        return data.data;
    }
    
    async GetUserMainInfo(){
        return this.GetBackendData("http://localhost:3001/user/"+urlParams.get('user'))
    }
    async GetUserActivity(){
        return this.GetBackendData("http://localhost:3001/user/"+urlParams.get('user')+"/activity")
    }
    async GetUserAverageSessions(){
        return this.GetBackendData("http://localhost:3001/user/"+urlParams.get('user')+"/average-sessions")
    }
    async GetUserPerformance(){
        return this.GetBackendData("http://localhost:3001/user/"+urlParams.get('user')+"/performance")
    }
}

export default DashbordService_OBJ;