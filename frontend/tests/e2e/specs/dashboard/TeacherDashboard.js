describe('TeacherDashboard', () => {

  beforeEach(() => {
    cy.cleanAll();

    // create new course executions
    cy.createCourseExecutionOnDemoCourse('1st Semester 22/23');
    cy.createCourseExecutionOnDemoCourse('1st Semester 19/20');

    // create demo teacher and associate the new course executions
    cy.demoTeacherLogin();
    cy.associateTeacherWithCourseExecution('1st Semester 22/23');
    cy.associateTeacherWithCourseExecution('1st Semester 19/20');
    cy.contains('Logout').click();
    cy.demoTeacherLogin();

    // create dashboards
    cy.get('[data-cy="dashboardMenuButton"]').click(); // dashboard
    cy.get('[data-cy="dashboardMenuButton"]').next().click(); // change course
    cy.get('[data-cy="courseSelectionListEntry"]').eq(1).click(); // list item 2
    cy.get('[data-cy="dashboardMenuButton"]').click(); // dashboard
    cy.get('[data-cy="dashboardMenuButton"]').next().click(); // change course
    cy.get('[data-cy="courseSelectionListEntry"]').eq(0).click(); // list item 1
    cy.get('[data-cy="dashboardMenuButton"]').click(); // dashboard
    cy.contains('Logout').click();

    // fill stats
    cy.changeStudentStats( '1st Semester 23/24', 'num_students',                13);
    cy.changeStudentStats( '1st Semester 23/24', 'num_more75correct_questions',  7);
    cy.changeStudentStats( '1st Semester 23/24', 'num_at_least3quizzes',        10);
    cy.changeQuestionStats('1st Semester 23/24', 'num_available',               13);
    cy.changeQuestionStats('1st Semester 23/24', 'answered_questions_unique',    7);
    cy.changeQuestionStats('1st Semester 23/24', 'average_questions_answered',  10);
    cy.changeQuizStats(    '1st Semester 23/24', 'num_quizzes',                 13);
    cy.changeQuizStats(    '1st Semester 23/24', 'num_unique_answered_quizzes',  7);
    cy.changeQuizStats(    '1st Semester 23/24', 'average_quizzes_solved',      10);

    cy.changeStudentStats( '1st Semester 22/23', 'num_students',                20);
    cy.changeStudentStats( '1st Semester 22/23', 'num_more75correct_questions', 10);
    cy.changeStudentStats( '1st Semester 22/23', 'num_at_least3quizzes',        12);
    cy.changeQuestionStats('1st Semester 22/23', 'num_available',               20);
    cy.changeQuestionStats('1st Semester 22/23', 'answered_questions_unique',   10);
    cy.changeQuestionStats('1st Semester 22/23', 'average_questions_answered',  12);
    cy.changeQuizStats(    '1st Semester 22/23', 'num_quizzes',                 20);
    cy.changeQuizStats(    '1st Semester 22/23', 'num_unique_answered_quizzes', 10);
    cy.changeQuizStats(    '1st Semester 22/23', 'average_quizzes_solved',      12);

    cy.changeStudentStats( '1st Semester 19/20', 'num_students',                15);
    cy.changeStudentStats( '1st Semester 19/20', 'num_more75correct_questions',  9);
    cy.changeStudentStats( '1st Semester 19/20', 'num_at_least3quizzes',        13);
    cy.changeQuestionStats('1st Semester 19/20', 'num_available',               15);
    cy.changeQuestionStats('1st Semester 19/20', 'answered_questions_unique',    9);
    cy.changeQuestionStats('1st Semester 19/20', 'average_questions_answered',  13);
    cy.changeQuizStats(    '1st Semester 19/20', 'num_quizzes',                 15);
    cy.changeQuizStats(    '1st Semester 19/20', 'num_unique_answered_quizzes',  9);
    cy.changeQuizStats(    '1st Semester 19/20', 'average_quizzes_solved',      13);

    //cy.wait(10000);
  });

  afterEach(() => {
    cy.cleanAll();
  });

  function assertCharts(eqValue, picId) {
    //cy.get('canvas').eq(eqValue).scrollIntoView().wait(2000).screenshot('dashboard/TeacherDashboard.js/' + picId + '-expected');
    cy.get('canvas').eq(eqValue).scrollIntoView().wait(2000).screenshot(picId + '-gotten');
    const PNG = require('pngjs').PNG;
    const pixelmatch = require('pixelmatch');
    cy.readFile(
      './tests/e2e/expected-screenshots/' + picId + '-expected.png', 'base64'
    ).then(baseImage => {
      cy.readFile(
        './tests/e2e/screenshots/dashboard/TeacherDashboard.js/' + picId + '-gotten.png', 'base64'
      ).then(gottenImage => {
        const img1 = PNG.sync.read(Buffer.from(baseImage, 'base64'));
        const img2 = PNG.sync.read(Buffer.from(gottenImage, 'base64'));
        const { width, height } = img1;
        const diff = new PNG({ width, height });
        const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
        const diffPercent = (numDiffPixels / (width * height) * 100);
        expect(diffPercent).to.be.below(8);
      });
    });
  }

  it('teacher accesses 2023 dashboard', () => {
    // login as teacher with the right course execution
    cy.demoTeacherLogin();
    cy.get('[data-cy="dashboardMenuButton"]').next().click(); // change course
    cy.get('[data-cy="courseSelectionListEntry"]').eq(0).click(); // list item 1

    // access dashboard
    cy.intercept('GET', '**/teachers/dashboards/executions/*').as('getDashboard');
    cy.get('[data-cy="dashboardMenuButton"]').click();
    cy.wait('@getDashboard');

    // check if current course execution stats are correct
    cy.get('[data-cy="teacherStudentStatsNumStudents"]')              .should('have.text', '13');
    cy.get('[data-cy="teacherStudentStatsNumMore75CorrectQuestions"]').should('have.text',  '7');
    cy.get('[data-cy="teacherStudentStatsNumAtLeast3Quizzes"]')       .should('have.text', '10');

    cy.get('[data-cy="teacherQuestionStatsNumAvailable"]')            .should('have.text', '13');
    cy.get('[data-cy="teacherQuestionStatsAnsweredQuestionsUnique"]') .should('have.text',  '7');
    cy.get('[data-cy="teacherQuestionStatsAverageQuestionsAnswered"]').should('have.text', '10');

    cy.get('[data-cy="teacherQuizStatsNumQuizzes"]')                  .should('have.text', '13');
    cy.get('[data-cy="teacherQuizStatsNumUniqueAnsweredQuizzes"]')    .should('have.text',  '7');
    cy.get('[data-cy="teacherQuizStatsNumAverageSolvedQuizzes"]')     .should('have.text', '10');

    // check if chart is correct
    assertCharts(0, '2023-StudentStats');
    assertCharts(1, '2023-QuestionStats');
    assertCharts(2, '2023-QuizStats');

    // logout
    cy.contains('Logout').click();
  });

  it('teacher accesses 2022 dashboard', () => {
    // login as teacher with the right course execution
    cy.demoTeacherLogin();
    cy.get('[data-cy="dashboardMenuButton"]').next().click(); // change course
    cy.get('[data-cy="courseSelectionListEntry"]').eq(1).click(); // list item 2

    // access dashboard
    cy.intercept('GET', '**/teachers/dashboards/executions/*').as('getDashboard');
    cy.get('[data-cy="dashboardMenuButton"]').click();
    cy.wait('@getDashboard');

    // check if current course execution stats are correct
    cy.get('[data-cy="teacherStudentStatsNumStudents"]')              .should('have.text', '20');
    cy.get('[data-cy="teacherStudentStatsNumMore75CorrectQuestions"]').should('have.text', '10');
    cy.get('[data-cy="teacherStudentStatsNumAtLeast3Quizzes"]')       .should('have.text', '12');

    cy.get('[data-cy="teacherQuestionStatsNumAvailable"]')            .should('have.text', '20');
    cy.get('[data-cy="teacherQuestionStatsAnsweredQuestionsUnique"]') .should('have.text', '10');
    cy.get('[data-cy="teacherQuestionStatsAverageQuestionsAnswered"]').should('have.text', '12');

    cy.get('[data-cy="teacherQuizStatsNumQuizzes"]')                  .should('have.text', '20');
    cy.get('[data-cy="teacherQuizStatsNumUniqueAnsweredQuizzes"]')    .should('have.text', '10');
    cy.get('[data-cy="teacherQuizStatsNumAverageSolvedQuizzes"]')     .should('have.text', '12');

    // check if chart is correct
    assertCharts(0, '2022-StudentStats');
    assertCharts(1, '2022-QuestionStats');
    assertCharts(2, '2022-QuizStats');

    // logout
    cy.contains('Logout').click();
  });

  it('teacher accesses 2019 dashboard', () => {
    // login as teacher with the right course execution
    cy.demoTeacherLogin();
    cy.get('[data-cy="dashboardMenuButton"]').next().click(); // change course
    cy.get('[data-cy="courseSelectionListEntry"]').eq(2).click(); // list item 3

    // access dashboard
    cy.intercept('GET', '**/teachers/dashboards/executions/*').as('getDashboard');
    cy.get('[data-cy="dashboardMenuButton"]').click();
    cy.wait('@getDashboard');

    // check if current course execution stats are correct
    cy.get('[data-cy="teacherStudentStatsNumStudents"]')              .should('have.text', '15');
    cy.get('[data-cy="teacherStudentStatsNumMore75CorrectQuestions"]').should('have.text',  '9');
    cy.get('[data-cy="teacherStudentStatsNumAtLeast3Quizzes"]')       .should('have.text', '13');

    cy.get('[data-cy="teacherQuestionStatsNumAvailable"]')            .should('have.text', '15');
    cy.get('[data-cy="teacherQuestionStatsAnsweredQuestionsUnique"]') .should('have.text',  '9');
    cy.get('[data-cy="teacherQuestionStatsAverageQuestionsAnswered"]').should('have.text', '13');

    cy.get('[data-cy="teacherQuizStatsNumQuizzes"]')                  .should('have.text', '15');
    cy.get('[data-cy="teacherQuizStatsNumUniqueAnsweredQuizzes"]')    .should('have.text',  '9');
    cy.get('[data-cy="teacherQuizStatsNumAverageSolvedQuizzes"]')     .should('have.text', '13');

    // check if there is no chart
    cy.get('canvas').should('not.exist');

    // logout
    cy.contains('Logout').click();
  });
});

    
