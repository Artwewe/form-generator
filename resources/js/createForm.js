$(document).ready(function () {
    $("#div_add_question").on("click", function (event) {
        addNewQuestion();
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
    html += '<div class="questionOptions grid grid-cols-1 space-y-4 mt-4">';
    html += '<div class="question grid grid-cols-2"><div class="questionDescription">Option 1</div><div class="deleteIcon text-right"><i class="actions fa fa-times"></i></div></div>';
    html += '</div>';

    /* ADD OPTIONS BUTTON */
    html += '<div class="addOptionContainer flex justify-center items-center mt-4">';
    html += '<div class="w-12 h-12 rounded-full flex justify-center items-center cursor-pointer bg-green-500"><i class="actions fa fa-plus"></i></div>';
    html += '</div>';

    /* SETTINGS SEPARATOR */
    html += '<hr class="mt-4">';

    /* QUESTION SETTINGS */
    html += '<div class="questionSettings grid grid-cols-3 w-full">';
    html += '<div class="col-span-2 flex space-x-4 justify-end mr-4"><div><i class="actions far fa-copy"></i></div><div><i class="actions far fa-trash-alt"></i></div></div>';
    html += '<div class="flex space-x-2 pl-4 border-l-[1px]"><div>Required</div><div>button</div></div>';
    html += '</div>';

    $("#questions_container").append(html);
    $("html, body").animate({ scrollTop: $(document).height()-$(window).height() }); //Sroll to bottom of page
}

function addQuestionOption() {

}
