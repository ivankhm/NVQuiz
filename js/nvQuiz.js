new Vue({
  el: '#nv-quiz',
  data: {
    stage: 0,
    finalStage: 10,
    currentQuestionId: 0,
    success: false,
    questions: [
      {
        id: 0,
        text: "Некорректный вопрос",
        answer: -1
      },
      {
        id: 1,
        text: "Вы ранее получали имущественный вычет?",
        answer: 0
      },
      {
        id: 2,
        text: "Вы работаете/на пенсии?",
        answer: 0
      },
      {
        id: 3,
        text: "Получали ли вы ранее имущественный вычет?",
        answer: 0
      }
    ]
  },
  methods: {
    nextStage: function() {
      this.stage++;
      this.currentQuestionId++;
    }
  },
  computed: {
    currentQuestionText: function() {
      return this.questions[this.currentQuestionId];
    }
  }
});
