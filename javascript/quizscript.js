$(document).ready(function () {
    const questions = [
        {
            question: "Q1/4. Which of the following is a client site language??",
            correctAnswer: "Javascript",
            options: ["Java", "C", "Python", "Javascript"]
        },
        {
            question: "Q2/4. What does HTML stand for?",
            correctAnswer: "Hypertext Markup Language",
            options: ["Hypertext Markup Language", "Cascading Style Sheet", "Helicopters Terminals Motorboats Lamborginis", "Jason Object Notation"]
        },
        {
            question: "Q3/4. What year was JavaScript launched?",
            correctAnswer: "1995",
            options: ["1996", "1995", "1994", "None of the above"]
        },
        {
            question: "Q4/4. What does CSS stands for?",
            correctAnswer: "Cascading Style Sheet",
            options: ["Hypertext Markup Language", "Cascading Style Sheet", "Helicopters Terminals Motorboats Lamborginis", "Jason Object Notation"]
        }

    ];

    let userResponses = [];
    let currentQuestionIndex = 0;

    function displayQuestion(index) {
        $(".question p").text(questions[index].question);
        $(".options").empty();

        const options = questions[index].options || [];

        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            const label = $(`<label><input type="radio" name="answer" value="${option}">${option}</label>`);
            $(".options").append(label);
        }



        $("input[type=radio]").on("click", function () {
            const selectedAnswer = $(this).val();
            const correctAnswer = questions[currentQuestionIndex].correctAnswer;
            const feedback = $(".feedback");

            if (selectedAnswer === correctAnswer) {
                feedback.text("Correct answer!").removeClass("incorrect").addClass("correct");
            } else {
                feedback.text("Incorrect answer. The correct answer is " + correctAnswer).removeClass("correct").addClass("incorrect");
            }
            $("input[type=radio]").attr("disabled", true);

        });
    }

    function finishQuiz() {
        $("#submit").hide();
        $("#refresh").show();
    }

    displayQuestion(currentQuestionIndex);

    $("#submit").on("click", function () {
        userResponses[currentQuestionIndex] = $("input[name=answer]:checked").val();
        $("input[type=radio]").attr("disabled", true);

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        } else {

            let correctAnswers = 0;
            for (let i = 0; i < questions.length; i++) {
                if (userResponses[i] === questions[i].correctAnswer) {
                    correctAnswers++;
                }
            }
            const grade = (correctAnswers / questions.length) * 100;


            const feedback = $(".feedback");
            
            if (grade >= 50) {
                feedback.text(`Your Grade: ${grade.toFixed(2)}% - PASSED`).addClass("Passed");
            } else {
                feedback.text(`Your Grade: ${grade.toFixed(2)}% - FAILED`).addClass("Failed");
            }
            finishQuiz();
        }
    });

    $("#refresh").on("click", function () {

        currentQuestionIndex = 0;
        userResponses = [];
        $("#submit").show();
        $("#refresh").hide();
        $(".feedback").empty();
        $(".feedback").removeClass("Passed");
        $(".feedback").removeClass("Failed");
        displayQuestion(currentQuestionIndex);
    });
});
