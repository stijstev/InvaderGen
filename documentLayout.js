window.onload = function () {
    let elUserMessage = document.querySelector('#userMessage');
    let elInputs = {}
    let currentMenu = 'createAnInvader';
    function getBtns() {
        elInputs.btnSave = document.querySelector('#btnSave');
        elInputs.btnCreate = document.querySelector('#btnCreate');
        elInputs.btnView = document.querySelector('#btnView');
    }
    function addListeners() {
        elInputs.btnSave.addEventListener('click', function () {
            insertMenu('saveAnInvader');
            if (canvas) {
                canvas.style.display = 'block';
            }
        }, false);
        elInputs.btnCreate.addEventListener('click', function () {
            insertMenu('createAnInvader');
            if (canvas) {
                canvas.style.display = 'block';
            }
        }, false);
        elInputs.btnView.addEventListener('click', function () {
            insertMenu('viewAnInvader');
            if (canvas && canvas.style.display !== 'none') {
                canvas.style.display = 'none';
            }
            writeLoadResults();
        }, false);
    }
    function insertMenu(menu) {
        document.querySelector(`#${currentMenu}`).style.display = 'none';
        console.log(menu);
        currentMenu = menu;
        document.querySelector(`#${currentMenu}`).style.display = 'block';
    }
    getBtns();
    addListeners();

    function writeLoadResults() {
        let results;
        let elLoadResults;
        if (!localStorage.getItem("invaders")) {
            userMessage('userMessage', "No invaders to load, save some!")
        } else {
            let elLoadResults = document.getElementById('viewAnInvader');
            elLoadResults.innerHTML = ' ';
            results = JSON.parse(localStorage.getItem("invaders"));
            for (let i = 0; i < results.length; i++) {
                let result = results[i];
                let tempStr = `
                <div class="g__column g__column-3">
                    <div class="loadResult">
                        <div class="resultImageContainer"><img src="${result.image}" class="resultImage"></img></div>
                        <h3>${result.title}</h3>
                        <p>${result.desc}</p>
                    </div>
                </div>
                `
                elLoadResults.innerHTML += tempStr;
            }
        }
    }
}

