export default class TeacherDashboardQuizStats {
    numQuizzes!: number;
    numUniqueAnsweredQuizzes!: number;
    averageQuizzesSolved!: number;
    courseExecutionYear!: number;

    constructor(jsonObj?: TeacherDashboardQuizStats) {
        if (jsonObj) {
            this.numQuizzes = jsonObj.numQuizzes;
            this.numUniqueAnsweredQuizzes = jsonObj.numUniqueAnsweredQuizzes;
            this.averageQuizzesSolved = jsonObj.averageQuizzesSolved;
            this.courseExecutionYear = jsonObj.courseExecutionYear;
        }
    }
}
