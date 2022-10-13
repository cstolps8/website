


var job = [
    {
        name: "DevOps",
        percent: "90%",
    },
    {
        name: "Git",
        percent: "85%",
    },
    {
        name: "Jenkins",
        percent: "65%",
    },
    {
        name: "Openshift",
        percent: "55%",
    },
    {
        name: "AWS",
        percent:"30%"
    },
    {
        name: "Azure DevOps",
        percent:"10%"
    },
    {
        name: "Javascript",
        percent: "65%",
    },
    {
        name: "Linux",
        percent: "80%",
    },
    {
        name: "Windows",
        percent: "90%",
    },
    {
        name: "Mac",
        percent: "65%",
    }

]
$(function index() {

    job.forEach(element => {

        $("#myKnowledge").append(`
        <p>${element.name}</p>
        <div class="progress">
            <div class="progress-value" style="--progBar:${element.percent}"></div> <p class="loaingPercent">${element.percent}</p>
        </div>
        `)
    });

    function index() {


    }


});