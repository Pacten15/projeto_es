import TeacherDashboardStudentStats from './TeacherDashboardStudentStats';
import TeacherDashboardQuestionStats from './TeacherDashboardQuestionStats';
import TeacherDashboardQuizStats from './TeacherDashboardQuizStats';
export default class BarChartStats {
    stats1: number[] = [];
    stats2: number[] = [];
    stats3: number[] = [];
    courseExecutionsYears: number[] = [];
    datasetLabels: string[] = [];

    constructor(selector: number, studentStats: TeacherDashboardStudentStats[], questionStats: TeacherDashboardQuestionStats[], quizStats: TeacherDashboardQuizStats[]) {
        if (selector == 1) {
            for (const studentStat of studentStats) {
                this.stats1.push(studentStat.numStudents);
                this.stats2.push(studentStat.numMore75CorrectQuestions);
                this.stats3.push(studentStat.numAtLeast3Quizzes);
                this.courseExecutionsYears.push(studentStat.courseExecutionYear);
            }
            this.datasetLabels.push('Total Number of Students');
            this.datasetLabels.push('Students of Solved >= 75% of Questions');
            this.datasetLabels.push('Students who Solved >= 3 Quizzes');
        } else if (selector == 2) {
            for (const questionStat of questionStats) {
                this.stats1.push(questionStat.numAvailable);
                this.stats2.push(questionStat.answeredQuestionsUnique);
                this.stats3.push(questionStat.averageQuestionsAnswered);
                this.courseExecutionsYears.push(questionStat.courseExecutionYear);
            }
            this.datasetLabels.push('Number of Questions');
            this.datasetLabels.push('Number of Questions Solved (Unique)');
            this.datasetLabels.push('Number of Questions Correctly Solved (Unique, Average Per Student)');
        }
        else if (selector == 3) {
            for (const quizStat of quizStats) {
                this.stats1.push(quizStat.numQuizzes);
                this.stats2.push(quizStat.averageQuizzesSolved);
                this.stats3.push(quizStat.numUniqueAnsweredQuizzes);
                this.courseExecutionsYears.push(quizStat.courseExecutionYear);
            }
            this.datasetLabels.push('Total Number of Quizzes');
            this.datasetLabels.push('Number of average Quizzes Solved');
            this.datasetLabels.push('Number of Unique Answered Quizzes');
        }
        }

    }

