<template>
  <div class="container">
    <h2>Statistics for this course execution</h2>
    <div v-if="teacherDashboard != null" class="stats-container">
      <!-- student stats -->
      <div class="items">
        <div ref="totalStudents" class="icon-wrapper">
          <animated-number :number="teacherDashboard.studentStats[teacherDashboard.studentStats.length-1].numStudents"
                           data-cy="teacherStudentStatsNumStudents"/>
        </div>
        <div class="project-name">
          <p>Number of Questions</p>
        </div>
      </div>
      <div class="items">
        <div ref="totalStudents" class="icon-wrapper">
          <animated-number :number="teacherDashboard.studentStats[teacherDashboard.studentStats.length-1].numMore75CorrectQuestions"
                           data-cy="teacherStudentStatsNumMore75CorrectQuestions" />
        </div>
        <div class="project-name">
          <p>Number of Students who Solved >= 75% Questions</p>
        </div>
      </div>
      <div class="items">
        <div ref="totalStudents" class="icon-wrapper">
          <animated-number :number="teacherDashboard.studentStats[teacherDashboard.studentStats.length-1].numAtLeast3Quizzes"
                           data-cy="teacherStudentStatsNumAtLeast3Quizzes" />
        </div>
        <div class="project-name">
          <p>Number of Students of Solved >= 3 Quizzes</p>
        </div>
      </div>
      <!-- questions stats -->
      <div class="items">
        <div ref="numAvailable" class="icon-wrapper">
          <animated-number :number="teacherDashboard.questionStats[teacherDashboard.questionStats.length - 1].numAvailable"
                                    data-cy="teacherQuestionStatsNumAvailable" />
        </div>
        <div class="project-name">
          <p>Number of Questions</p>
        </div>
      </div>
      <div class="items">
          <div ref="answeredQuestionsUnique" class="icon-wrapper">
              <animated-number :number="teacherDashboard.questionStats[teacherDashboard.questionStats.length - 1].answeredQuestionsUnique"
                                data-cy="teacherQuestionStatsAnsweredQuestionsUnique"/>
          </div>
          <div class="project-name">
              <p>Number of Questions Solved (Unique)</p>
          </div>
      </div>
      <div class="items">
          <div ref="averageQuestionsAnswered" class="icon-wrapper">
              <animated-number :number="teacherDashboard.questionStats[teacherDashboard.questionStats.length - 1].averageQuestionsAnswered"
                                data-cy="teacherQuestionStatsAverageQuestionsAnswered"/>
          </div>
          <div class="project-name">
              <p>Number of Questions Correctly Solved (Unique, Average Per Student)</p>
          </div>
      </div>
      <!-- quiz stats -->
      <div class="items">
          <div ref="totalQuizzes" class="icon-wrapper">
            <animated-number :number="teacherDashboard.quizStats[teacherDashboard.quizStats.length - 1].numQuizzes"
                              data-cy="teacherQuizStatsNumQuizzes"/>
          </div>
          <div class="project-name">
            <p>Number of Quizzes</p>
          </div>
      </div>
      <div class="items">
        <div ref="totalStudents" class="icon-wrapper">
          <animated-number :number="teacherDashboard.quizStats[teacherDashboard.quizStats.length - 1].numUniqueAnsweredQuizzes"
                            data-cy="teacherQuizStatsNumUniqueAnsweredQuizzes"/>
        </div>
        <div class="project-name">
          <p>Number of Average Solved Quizzes</p>
        </div>
      </div>
      <div class="items">
        <div ref="totalStudents" class="icon-wrapper">
          <animated-number :number="teacherDashboard.quizStats[teacherDashboard.quizStats.length - 1].averageQuizzesSolved"
                            data-cy="teacherQuizStatsNumAverageSolvedQuizzes"/>
        </div>
        <div class="project-name">
          <p>Number of Unique Quizzes Solved</p>
        </div>
      </div>
      <div v-if="teacherDashboard.studentStats.length > 1"> <!--  -->
        <!-- student stats -->
        <div class="items">
          <div ref="22" class="bar-chart">
            <BarChart :barChartStats="studentBarChartStats"/>
          </div>
        </div>
        <!-- questions stats -->
        <div class="items">
          <div ref="22" class="bar-chart">
            <BarChart :barChartStats="questionBarChartStats"/>
          </div>
        </div>
        <!-- quiz stats -->
        <div class="items">
          <div ref="22" class="bar-chart">
            <BarChart :barChartStats="quizBarChartStats" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import RemoteServices from '@/services/RemoteServices';
import AnimatedNumber from '@/components/AnimatedNumber.vue';
import TeacherDashboard from '@/models/dashboard/TeacherDashboard';
import BarChartStats from '@/models/dashboard/BarChartStats';
import BarChart from '@/components/BarChart.vue';

@Component({
  components: { AnimatedNumber, BarChart },
})

export default class TeacherStatsView extends Vue {
  @Prop() readonly dashboardId!: number;
  teacherDashboard: TeacherDashboard | null = null;
  studentBarChartStats: BarChartStats | null = null;
  questionBarChartStats: BarChartStats | null = null;
  quizBarChartStats: BarChartStats | null = null;
  async created() {
    await this.$store.dispatch('loading');
    try {
      this.teacherDashboard = await RemoteServices.getTeacherDashboard();
      this.studentBarChartStats = new BarChartStats(1, this.teacherDashboard.studentStats, this.teacherDashboard.questionStats, this.teacherDashboard.quizStats);
      this.questionBarChartStats = new BarChartStats(2, this.teacherDashboard.studentStats, this.teacherDashboard.questionStats, this.teacherDashboard.quizStats);
      this.quizBarChartStats = new BarChartStats(3, this.teacherDashboard.studentStats, this.teacherDashboard.questionStats, this.teacherDashboard.quizStats);
    } catch (error) {
      await this.$store.dispatch('error', error);
    }
    await this.$store.dispatch('clearLoading');
  }
}

</script>

<style lang="scss" scoped>
.stats-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  align-content: center;
  height: 100%;

  .items {
    background-color: rgba(255, 255, 255, 0.75);
    color: #1976d2;
    border-radius: 5px;
    flex-basis: 25%;
    margin: 20px;
    cursor: pointer;
    transition: all 0.6s;
  }

  .bar-chart {
    background-color: rgba(255, 255, 255, 0.90);
    height: 500px;
    width: 500px;
  }
}

.icon-wrapper,
.project-name {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-wrapper {
  font-size: 100px;
  transform: translateY(0px);
  transition: all 0.6s;
}

.icon-wrapper {
  align-self: end;
}

.project-name {
  align-self: start;
}

.project-name p {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
  transform: translateY(0px);
  transition: all 0.5s;
}

.items:hover {
  border: 3px solid black;

  & .project-name p {
    transform: translateY(-10px);
  }

  & .icon-wrapper i {
    transform: translateY(5px);
  }
}
</style>
