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

        if ($(target).hasClass('deleteOption')) $(target).closest('.optionsContainer').remove();
        if ($(target).hasClass('deleteQuestion')) {
            var confirmDelete = confirm('Are you sure you want to delete this question?');
            if (confirmDelete == true) $(target).closest('.questionContainer').remove();
        }

        if ($(target).hasClass('duplicateQuestion')) {
            var containerId = $(target).closest('.questionContainer').attr('id');
            var questionId = containerId.split('_')[2] ?? 0;

            if (questionId > 0) duplicateQuestion(questionId);
        }
    });
});






function addNewQuestion(data = null) {

    var lastContainerId = $("#questions_container").children().last().attr("id");
    var lastQuestionId = (lastContainerId != undefined) ? lastContainerId.split("_")[2] : 0;
    var newQuestionId = parseInt(lastQuestionId) + 1;

    var html = '<div id="question_container_' + newQuestionId + '" class="questionContainer">';

    /* QUESTION INFO */
    html += '<div class="questionInfo grid grid-cols-2">';

    html += '<div><input id="question_name" type="text" placeholder="Question" class="w-full rounded border border-black"></div>';
    html += '<div class="flex justify-center items center">';
    html += '<select id="question_type" tabindex="-1" class="rounded border border-black"><option value="multiple">Multiple Choice</option><option value="checkbox">Checkbox</option><option value="dropdown">Dropdown</option></select>';
    html += '</div></div>';

    /* QUESTION OPTIONS */
    html += '<div id="options_container" class="optionsContainer grid grid-cols-1 space-y-4 mt-4">';
    html += '<div id="option_container_1" class="optionsContainer question grid grid-cols-2"><div class="optionDescription"><input type="text" placeholder="Option 1" class="optionInput w-full rounded border border-black"></div><div class="deleteIcon text-right"><i class="deleteOption actions fa fa-times"></i></div></div>';
    html += '</div>';

    /* ADD OPTIONS BUTTON */
    html += '<div class="flex justify-center items-center mt-4">';
    html += '<div class="addOption w-12 h-12 rounded-full flex justify-center items-center cursor-pointer bg-green-500"><i class="addOption actions fa fa-plus"></i></div>';
    html += '</div>';

    /* SETTINGS SEPARATOR */
    html += '<hr class="mt-4">';

    /* QUESTION SETTINGS */
    html += '<div class="questionSettings grid grid-cols-3 w-full">';
    html += '<div class="col-span-2 flex space-x-4 justify-end mr-4"><div><i class="duplicateQuestion actions far fa-copy"></i></div><div><i class="deleteQuestion actions far fa-trash-alt"></i></div></div>';
    html += '<div class="flex space-x-2 pl-4 border-l-[1px]"><div>Required</div><div>button</div></div>';
    html += '</div>';

    $("#questions_container").append(html);


    if (data != null) {
        var questionContainer = $("#question_container_" + newQuestionId);
        var questionName = data.name ?? '';
        var questionType = data.type ?? '';
        var questionOptions = data.options ?? [];

        if (questionName != "") $(questionContainer).find("#question_name").val(questionName);
        if (questionType != "") $(questionContainer).find('#question_type').val(questionType);

        if (questionOptions.length > 0) {
            getQuestionOptionsHtml(questionOptions).then(function (html) {
                $(questionContainer).find("#options_container").html(html);
            });
        }
    }


    $("html, body").animate({ scrollTop: $(document).height() - $(window).height() }); //Scroll to bottom of page
}

function getQuestionOptionsHtml(options = []) {
    return new Promise(function (resolve, reject) {
        var html = "";

        if (options.length > 0) {
            $.each(options, function (index, option) {
                var optionId = option.id;
                var optionName = option.name;

                html += `<div id="option_container_${optionId}" class="optionsContainer question grid grid-cols-2">`;

                html += '<div class="optionDescription">';
                html += `<input type="text" placeholder="Option ${optionId}" value="${optionName}" class="optionInput w-full rounded border border-black">`;
                html += '</div>';


                html += '<div class="deleteIcon text-right">';
                html += '<i class="deleteOption actions fa fa-times"></i>';
                html += '</div>';

                html += '</div>';
            });
        } else {
            html += '<div id="option_container_1" class="optionsContainer question grid grid-cols-2"><div class="optionDescription"><input type="text" placeholder="Option 1" class="optionInput w-full rounded border border-black"></div><div class="deleteIcon text-right"><i class="deleteOption actions fa fa-times"></i></div></div>';
        }

        resolve(html);
    });
}

function duplicateQuestion(questionId) {
    getQuestionData(questionId).then(function (questionData) {
        addNewQuestion(questionData);
    });
}

function addQuestionOption(questionId) {
    var questionContainer = $("#question_container_" + questionId);
    var lastoptionsContainerId = $(questionContainer).find("#options_container").children().last().attr('id');

    var lastOptionId = (lastoptionsContainerId != undefined) ? lastoptionsContainerId.split('_')[2] : 0;
    var newOptionId = parseInt(lastOptionId) + 1;
    var optionsContainer = $(questionContainer).find("#options_container");

    var html = '<div id="option_container_' + newOptionId + '" class="optionsContainer grid grid-cols-2">';
    html += '<div class="optionDescription"><input type="text" placeholder="Option ' + newOptionId + '" class="optionInput w-full rounded border border-black"></div>'; //Option
    html += '<div class="deleteIcon text-right"><i class="deleteOption actions fa fa-times"></i></div>'; // Delete icon
    html += '</div>';

    //TODO: Find best way to scroll after adding option
    $(optionsContainer).append(html);
}


function getQuestionData(questionId) {

    return new Promise(function (resolve, reject) {
        var container = $("#question_container_" + questionId);
        var questionInfo = $(container).find('.questionInfo');
        var questionName = $(questionInfo).find("#question_name").val();
        var questionType = $(questionInfo).find("#question_type option:selected").val();
        var questionOptions = $(container).find('#options_container').children();

        var data = {
            "name": questionName,
            "type": questionType,
            "options": []
        };

        $.each(questionOptions, function (index, optionContainer) {
            var containerId = $(optionContainer).attr('id');
            var optionId = containerId.split('_')[2] ?? 0;
            var optionName = $(optionContainer).find('.optionDescription input').val();

            var option = { "id": optionId, "name": optionName };
            data.options.push(option);
        });


        resolve(data);
    });
}