class DashbordMockService_OBJ{
    async getInfo(){
        return await fetch(window.location.origin+"/data/data.json").then(async (res)=>{
            return res.json();
        })
    }
}

export default DashbordMockService_OBJ;