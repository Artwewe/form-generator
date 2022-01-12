$(document).ready(function () {
    $("#div_add_question").on("click", function (event) {
        addNewQuestion();
    });

    $(document).on('click', function (event) {
        var target = event.target;

        if ($(target).hasClass('addOption')) {
            var questionContainerId = $(target).closest('.questionContainer').attr('id');
            var questionId = questionContainerId.split('_')[2];

            addQuestionOption(questionId);
        };
    });
});






function addNewQuestion() {
    var lastContainerId = $("#questions_container").children().last().attr("id");
    var lastQuestionId = lastContainerId.split("_")[2];
    var newQuestionId = parseInt(lastQuestionId) + 1;

    var html = '<div id="question_container_' + newQuestionId + '" class="questionContainer">';

    /* QUESTION INFO */
    html += '<div class="questionInfo grid grid-cols-2">';
    html += '<div><input type="text" placeholder="Question" class="w-full rounded border border-black"></div>';
    html += '<div class="flex justify-center items center">';
    html += '<select name="questionType" class="rounded border border-black"><option value="multiple">Multiple Choice</option><option value="checkbox">Checkbox</option><option value="dropdown">Dropdown</option></select>';
    html += '</div></div>';

    /* QUESTION OPTIONS */
    html += '<div id="options_container" class="optionsContainer grid grid-cols-1 space-y-4 mt-4">';
    html += '<div id="option_container_1" class="question grid grid-cols-2"><div class="questionDescription">Option 1</div><div class="deleteIcon text-right"><i class="actions fa fa-times"></i></div></div>';
    html += '</div>';

    /* ADD OPTIONS BUTTON */
    html += '<div class="flex justify-center items-center mt-4">';
    html += '<div class="addOption w-12 h-12 rounded-full flex justify-center items-center cursor-pointer bg-green-500"><i class="addOption actions fa fa-plus"></i></div>';
    html += '</div>';

    /* SETTINGS SEPARATOR */
    html += '<hr class="mt-4">';

    /* QUESTION SETTINGS */
    html += '<div class="questionSettings grid grid-cols-3 w-full">';
    html += '<div class="col-span-2 flex space-x-4 justify-end mr-4"><div><i class="actions far fa-copy"></i></div><div><i class="actions far fa-trash-alt"></i></div></div>';
    html += '<div class="flex space-x-2 pl-4 border-l-[1px]"><div>Required</div><div>button</div></div>';
    html += '</div>';

    $("#questions_container").append(html);
    $("html, body").animate({ scrollTop: $(document).height() - $(window).height() }); //Scroll to bottom of page
}

function addQuestionOption(questionId) {
    var questionContainerId = "question_container_" + questionId;
    var questionContainer = $("#" + questionContainerId);
    var lastOptionContainerId = $(questionContainer).find("#options_container").children().last().attr('id');
    var lastOptionId = lastOptionContainerId.split('_')[2];
    var newOptionId = parseInt(lastOptionId) + 1;
    var optionsContainer = $(questionContainer).find("#options_container");

    var html = '<div id="option_container_' + newOptionId + '" class="question grid grid-cols-2">';
    html += '<div class="questionDescription">Option ' + newOptionId + '</div>'; //Option
    html += '<div class="deleteIcon text-right"><i class="actions fa fa-times"></i></div>'; // Delete icon
    html += '</div>';


    //TODO: Find best way to scroll after adding option
    $(optionsContainer).append(html);
}