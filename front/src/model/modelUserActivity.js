class ModelUserActivity {
    constructor(UserActivity){
        this.userId = UserActivity.userId;
        this.sessions = UserActivity.sessions;
    }
}

export default ModelUserActivity;