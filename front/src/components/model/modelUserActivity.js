class ModelUserActivity {
    constructor(UserActivity){
        this.userId = UserActivity.userId;
        this.sessions = UserActivity.data.sessions;
    }
}

export default ModelUserActivity;