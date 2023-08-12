export default class TeacherDashboardQuestionStats {
    numAvailable!: number;
    answeredQuestionsUnique!: number;
    averageQuestionsAnswered!: number;
    courseExecutionYear!: number;

    constructor(jsonObj?: TeacherDashboardQuestionStats) {
        if (jsonObj) {
            this.numAvailable = jsonObj.numAvailable;
            this.answeredQuestionsUnique = jsonObj.answeredQuestionsUnique;
            this.averageQuestionsAnswered = jsonObj.averageQuestionsAnswered
            this.courseExecutionYear = jsonObj.courseExecutionYear;
        }
    }
}
