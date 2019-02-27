new Vue({
  el: '#nv-quiz',
  data: {
    stage: 0,
    finalStage: 10,
    currentQuestionId: 0,
    success: false,
    bonusInfo: "",
    history: [],
    questions: [
      {
        id: 0,
        text: "Некорректный вопрос",
        answer: null
      },
      {
        id: 1,
        text: "Вы ранее получали имущественный вычет?",
        answer: null
      },
      {
        id: 2,
        text: "Вы работаете/на пенсии?",
        answer: null
      },
      {
        id: 3,
        text: "Вы получали вычет по настоящему имуществу?",
        answer: null
      },
      {
        id: 4,
        text: "Вы получали вычет по иному объекту недвижимости.\n Этот объект приобретен вами до 01.01.2014?",
        answer: null
      }
    ]
  },
  methods: {
    setFinalStage: function(bonusInfo, success) {
      this.bonusInfo = bonusInfo;
      this.success = success;
      this.stage = this.finalStage;
    },
    nextStage: function() {
      this.stage++;
      var qId = this.currentQuestion.id;
      var answer = this.currentQuestion.answer;

      switch (qId) {
        case 0:
          this.currentQuestionId = 1;
          break;
        case 1:
          if (answer == 'true') {
            this.currentQuestionId = 3;
          } else {
            this.setFinalStage("Вы имеете право на имущественный вычет.", true);
          }
          break;
        case 2:
          if (answer == 'true') {
            this.setFinalStage("К сожалению, вы не имеете право на имущественный вычет.", false);
          } else {
            this.setFinalStage("Вы имеете право на имущественный вычет.", true);
          }
          break;
        case 3:
          if (answer == 'true') {
              this.setFinalStage("Вы имеете право на имущественный вычет, однако вам необходимо дополнительно загрузить декларацию 3НДФЛ за последний год.", true);
          } else {
            this.currentQuestionId = 4;
          }
          break;
        case 4:
          if (answer == 'true') {
            this.setFinalStage("К сожалению, вы не имеете право на основной вычет. Однако, если вы не обращались по ипотечным %, то имеете право на вычет по ним.", false);
          } else {
            this.setFinalStage("Вы имеете право на имущественный вычет, однако вам необходимо дополнительно загрузить декларацию 3НДФЛ за последний год, в котором вы обращались.", true);
          }
          break;
        default:
      }
      if (qId != 0) {
        this.history.push(qId);
      }
    },
    prevStage: function() {
      if (this.stage <= 1) {
        return;
      }
      this.stage--;
      this.currentQuestionId = this.history.pop();
    }
  },
  computed: {
    currentQuestion: function() {
      return this.questions[this.currentQuestionId];
    },
    cantGoNext: function() {
      return this.currentQuestion.answer == null;
    },
    cantGoPrev: function() {
      return this.history.length == 0;
    }
  }
});
