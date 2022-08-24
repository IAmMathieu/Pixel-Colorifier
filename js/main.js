var app = {
    styles: [
        'plain',
        'empty',
        'light',
        'highlight',
    ],
    bottomElm: document.querySelector('.bottom'),
    topElm: document.querySelector('.top'),
    tailleGrille: document.createElement('article'),
    caseSize: document.createElement('input'),
    sizeButton: document.createElement('button'),
    gridSize: document.querySelector('.caseSize'),
    launchButton: document.querySelector('.sizeButton'),
    casesContainer: document.createElement('article'),
    pixelSize: document.createElement('input'),

    formCreate: function() {
        this.tailleGrille.classList.add('tailleGrille');
        this.topElm.append(this.tailleGrille);
        this.caseSize.classList.add('caseSize');
        this.caseSize.placeholder = 'Taille de la grille';
        this.tailleGrille.append(this.caseSize);
        this.pixelSize.classList.add('pixelSize');
        this.pixelSize.placeholder = 'Taille des pixels';
        this.tailleGrille.append(this.pixelSize);
        this.sizeButton.classList.add('sizeButton');
        this.sizeButton.textContent = 'Valider';
        this.tailleGrille.append(this.sizeButton);
    },

    invaderCreate: function() {
        this.casesContainer.classList.add('casesContainer')
        this.bottomElm.append(this.casesContainer);

    },

    createGrid: function() {
        var container = this.casesContainer;
        var inputNum = this.caseSize;
        var pixelValue = this.pixelSize;
        const changeBGC = this.changeBackgroundColor;
        this.sizeButton.addEventListener('click', function () {
            var pixelNum = parseInt(pixelValue.value, 10)
            var grille = parseInt(inputNum.value, 10);
            container.textContent = '';
            var largeur = Math.sqrt(grille);
            container.style.width = `${largeur * (pixelNum + 10)}px`;
            for (i = 0; i < grille; i++) {
                var cases = document.createElement('div');
                cases.addEventListener('click', changeBGC);
                cases.classList.add('caseStyle');
                cases.style.width = `${pixelNum}px`;
                cases.style.height = `${pixelNum}px`
                cases.style.backgroundColor = 'grey';
                cases.style.border = '5px solid black';
                container.append(cases);
            };
        });
    },

    changeBackgroundColor: function(event) {
        var cases = event.target;
        var caseBGColor = cases.style.backgroundColor;
        if (caseBGColor === 'grey') {
            cases.style.backgroundColor = 'black';
            cases.style.border = '5px solid grey';
        } else {
            cases.style.backgroundColor = 'grey';
            cases.style.border = '5px solid black';
        }
    },

    init: function() {
        this.formCreate();
        this.invaderCreate();
        this.createGrid();
    }
}

app.init();