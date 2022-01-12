@extends('layouts.app')

@section('content')


<div class="formContainer bg-purple-100 w-1/2 m-auto">

    <div class="formInfo bg-white w-[90%] p-4 mt-4 space-y-4 rounded m-auto">
        <div>
            <input type="text" placeholder="Form title" class="w-full rounded border border-black">
        </div>

        <div>
            <input type="text" placeholder="Form description" class="w-full rounded border border-black">
        </div>
    </div>

    <div id="questions_container">
        <div id="question_container_1" class="questionContainer">

            <div class="questionInfo grid grid-cols-2">
                <div>
                    <input type="text" placeholder="Question" class="w-full rounded border border-black">
                </div>
                <div class="flex justify-center items center">
                    <select name="questionType" class="rounded border border-black">
                        <option value="multiple">Multiple Choice</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="dropdown">Dropdown</option>
                    </select>
                </div>
            </div>

            <div id="options_container" class="questionOptions grid grid-cols-1 space-y-4 mt-4">
                <div id="option_container_1" class="optionContainer grid grid-cols-2">
                    <div class="optionDescription">
                        Option 1
                    </div>

                    <div class="deleteIcon text-right">
                        <i class="deleteOption actions fa fa-times"></i>
                    </div>
                </div>
            </div>

            <div class="flex justify-center items-center mt-4">
                <div class="addOption w-12 h-12 rounded-full flex justify-center items-center cursor-pointer bg-green-500">
                    <i class="addOption actions fa fa-plus"></i>
                </div>
            </div>

            <hr class="mt-4">

            <div class="questionSettings grid grid-cols-3 w-full">

                <div class="col-span-2 flex space-x-4 justify-end mr-4">
                    <div><i class="actions far fa-copy"></i></div>
                    <div><i class="deleteQuestion actions far fa-trash-alt"></i></div>
                </div>

                <div class="flex space-x-2 pl-4 border-l-[1px]">
                    <div>Required</div>
                    <div>button</div>
                </div>
            </div>
        </div>

    </div>

    <div class="addQuestionContainer flex justify-center items-center mt-4 pb-4">
        <div id="div_add_question" class="w-12 h-12 rounded-full flex justify-center items-center bg-green-500 cursor-pointer">
            <i id="btn_add_question" class="actions fa fa-plus"></i>
        </div>
    </div>


</div>


@endsection