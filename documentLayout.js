window.onload = function () {
    let elUserMessage = document.querySelector('#userMessage');
    let elInputs = {}
    let currentMenu = 'createAnInvader';
    function getBtns() {
        elInputs.btnSave = document.querySelector('#btnSave');
        elInputs.btnCreate = document.querySelector('#btnCreate');
        elInputs.btnLoad = document.querySelector('#btnLoad');
    }
    function addListeners() {
        elInputs.btnSave.addEventListener('click', function () {
            insertMenu('saveAnInvader');
            canvas.style.display = 'block';
        }, false);
        elInputs.btnCreate.addEventListener('click', function () {
            insertMenu('createAnInvader');
            canvas.style.display = 'block';
        }, false);
        elInputs.btnLoad.addEventListener('click', function () {
            insertMenu('loadAnInvader');
            if (canvas && canvas.style.display !== 'none')  {
                canvas.style.display = 'none';
            }
            writeLoadResults(); //TODO: add error handling for when the user clicks twice
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
        if (!localStorage.getItem("invaders")) {
            userMessage('userMessage', "No invaders to load, save some!")
        } else {
            let loadResults = document.getElementById('loadResults');
            let results = JSON.parse(localStorage.getItem("invaders"));
            let tempStr = null;
            let columnCounter = null;
            let resultIndex = 0;
    
            for (let i = 0; i < results.length; i + 3) {
                tempStr = '<div class="g__row">'
                for(let i = 0; i <= 3; i++){
                    result = results[resultIndex];
                    tempStr += `
                    <div class="g__column g__column-3">
                        <div class="loadResult">
                            <img src="${result.image}" class="resultImage"></img>
                            <h3>${result.title}</h3>
                            </p>${result.desc}</p>
                        </div>
                    </div>
                    `
                    console.log(tempStr);
                    resultIndex++
                }
                tempStr += '</div>'
                loadResults.innerHTML += tempStr;
                tempStr = null;
            }
        }
    }
}
        