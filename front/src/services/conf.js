class confOBJ{
    constructor(){
        this.environement = {
            devlopement: 'dev',
            production: 'prod'
        }
        this.currentEnv = 'prod';
    }
}


let conf = new confOBJ();
conf.currentEnv = conf.environement.production;

export default conf;