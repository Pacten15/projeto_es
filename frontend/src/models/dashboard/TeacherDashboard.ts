import TeacherDashboardStudentStats from './TeacherDashboardStudentStats';
import TeacherDashboardQuestionStats from './TeacherDashboardQuestionStats';
import TeacherDashboardQuizStats from './TeacherDashboardQuizStats';
export default class TeacherDashboard {
  id!: number;
  studentStats : TeacherDashboardStudentStats[] = [];
  questionStats : TeacherDashboardQuestionStats[] = [];
  quizStats : TeacherDashboardQuizStats[] = [];

  constructor(jsonObj?: TeacherDashboard) {
    if (jsonObj) {
      this.id = jsonObj.id;
      this.studentStats = jsonObj.studentStats.map((studentStat: TeacherDashboardStudentStats) => new TeacherDashboardStudentStats(studentStat));
      this.studentStats.sort((a, b) => a.courseExecutionYear < b.courseExecutionYear ? -1 : a.courseExecutionYear > b.courseExecutionYear ? 1 : 0);

      this.questionStats = jsonObj.questionStats.map((questionStat: TeacherDashboardQuestionStats) => new TeacherDashboardQuestionStats(questionStat));
      this.questionStats.sort((a, b) => a.courseExecutionYear < b.courseExecutionYear ? -1 : a.courseExecutionYear > b.courseExecutionYear ? 1 : 0);

      this.quizStats = jsonObj.quizStats.map((quizStat: TeacherDashboardQuizStats) => new TeacherDashboardQuizStats(quizStat));
      this.quizStats.sort((a, b) => a.courseExecutionYear < b.courseExecutionYear ? -1 : a.courseExecutionYear > b.courseExecutionYear ? 1 : 0);
    }
  }
}
