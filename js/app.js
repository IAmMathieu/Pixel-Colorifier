// tableau (array) pour lister les choix de couleurs
var styles= [
    'plain',
    'empty',
    'light',
    'highlight',
];

// variable qui récupérera la couleur choisie
var choosenColor = 'empty';


// variable qui contient la taille de la grille choisie avec valeur par defaut a 64 (grille 8*8)
var grille = 64;

// variable qui contient la taille en px de chaque cases a colorer avec une valeur par defaut a 50px
var taillePX = 50;

// variables qui récupere les balises HTML des sections bottom et top en les selectionnants par leur nom de class
var bottomElm = document.querySelector('.bottom');
var topElm = document.querySelector('.top');


// creation de la balise article qui contient les input taille grille/ taille pixel et le button valider
var tailleGrille = document.createElement('article');
tailleGrille.classList.add('tailleGrille'); // ajout d'une classe a la balise crée
topElm.append(tailleGrille); // ajout de la balise comme dernier enfant de la balise section top


//creation de l'input qui recuperera la taille choisie par l'utilisateur de la grille
var caseSize = document.createElement('input');
caseSize.classList.add('caseSize') // ajout d'une class pour son css
caseSize.placeholder = 'Taille de la grille'; // ajout du message par defaut dans l'input
tailleGrille.append(caseSize); // ajout de la grille comme dernier enfant a la balise article (tailleGrille) crée au dessus

// pareil qu'au dessus
var pixelSize = document.createElement('input');
pixelSize.classList.add('pixelSize')
pixelSize.placeholder = 'Taille des pixels';
tailleGrille.append(pixelSize);

// comme au dessus mais creation d'un bouton a la place d'un input
var sizeButton = document.createElement('button');
sizeButton.classList.add('sizeButton');
sizeButton.textContent = 'Valider';
tailleGrille.append(sizeButton);

// var styleSelectorContainer = document.createElement('aside');
// styleSelectorContainer.classList.add('styleContainer');
// bottomElm.append(styleSelectorContainer);

// for (style of styles) {
//     var styleButton = document.createElement('button');
//     styleButton.classList.add('btn');
//     styleButton.classList.add(style);
//     styleSelectorContainer.append(styleButton);
// }




// selection de la balise input pour la taille des pixels
var pixelValue = document.querySelector('.pixelSize')
pixelSize.addEventListener('change', changePixelValue); // ajout d'un event listener sur cet input qui si ont a changé sa valeur et active la fonction changePixelValue


//creation de la fonction changePixelValue
function changePixelValue() {
    taillePX = parseInt(pixelSize.value, 10); //recupération de la valeur inscrite dans l´input via pixelSize.value et utilisation de parseInt(valeur, 10) pour la convertir en nombre décimal (base 10)
    return taillePX //retour de la valeur pour pouvoir l'utiliser hors de la fonction
}


// selection de l'input pour le choix de la taille de la grille
var gridSize = document.querySelector('.caseSize');
gridSize.addEventListener('change', changeGridSize); // ajout d'un event listener sur cet input qui reagit si on a changé sa valeur et lance la fonction changeGridSize


// creation de la function changeGridSize
function changeGridSize() {
    grille = parseInt(gridSize.value); // recuperation de la valeur isncrite dans l'input via gridSize.value et convertion en nombre decimal base 10
    return grille // retour de la valeur pour exploitation hors de la fonction
}



// selection du boutton valider
var launchButton = document.querySelector('.sizeButton');
launchButton.addEventListener('click', refreshGrid); // ajout d'un event listener sur le bouton valider qui s'active au click et execute la fonction refreshGrid

// creation de la balise article qui contiendra le space invader et les boutons de choix de couleurs
var casesContainer = document.createElement('article');
casesContainer.classList.add('casesContainer')// ajout d'une classe en rapport au css pour la stylisation
bottomElm.append(casesContainer);// ajout de la balise en dernier enfant de la balise section bottom (classe bottom)


// creation de la balise aside qui contiendra les 4 boutons de choix de couleur
var styleSelectorContainer = document.createElement('aside');
styleSelectorContainer.classList.add('styleContainer');// ajout d'une classe css en rapport au styles.css pour la stylisation
bottomElm.append(styleSelectorContainer); // ajout de la balise en dernier enfant de la balise section bottom (en dessous de celle contenant le space invader)


// for ... of est une boucle qui va itérer chaque element du tableau styles[] les uns apres les autres (equivalent a for (i=0; i<styles.length; i++)
for (style of styles) {
    var styleButton = document.createElement('button');// a chaque iteration de la boucle on cree un bouton
    styleButton.addEventListener('click', colorChoice);// on lui ajout un event listener qui reagit au click et active la fonction colorChoice
    styleButton.classList.add(style);// on lui ajoute une classe qui a pour nom la valeur de l'element iteré (style[0])
    styleSelectorContainer.append(styleButton);// ajout chaque bouton en enfant de la balise aside qui doit les contenir
}



// creation de la fonction refreshGrid qui va crée notre space invader
function refreshGrid() {
    casesContainer.textContent = '';// reset d'une ancienne grid existante
    var largeur = Math.sqrt(grille);// creation d'une variable largeur qui sera la racine carrée de la taille de la grille pour connaitre le nombre de cases par coté (64 > 8 cases)
    casesContainer.style.width = `${largeur * (taillePX + 10)}px`;// modification de la taille (width) du container qui englobe les cases du space invader (nb case * (taille d'une case + ses bordures gauche et droite)
    //la modification de la taille permet de mettre les cases a la ligne du dessous grace au flex-wrap quand le nb de cases par ligne definie est atteint
    

    //creation des cases via une boucle for partant de 0 et allant jusqu'a la taille definie, on compte de zero donc taille max exclu (grille 64 > 0 a 63)
    for (i = 0; i < grille; i++) {
        var cases = document.createElement('div');// creation de la div qui sera une case du space invader
        cases.addEventListener('click', changeBackgroundColor);// ajout de l'event listener qui detectera si on click dessus et lancera la fonction changeBackgroundColor
        cases.classList.add('caseStyle');// ajout de la classe lié au css
        cases.style.backgroundColor = 'grey';// ajout de la couleur en inline (<div style={background-color: 'grey'}></div>) pour eviter le double click sur les cases pour le premier changement de couleur
        cases.style.width = `${taillePX}px`;// definition de taille width de la case avec la valeur recuperer via l'input
        cases.style.height = `${taillePX}px`;// definition de taille height de la case avec la valeur recuperer via l'input
        cases.style.border = '5px solid black';// ajout d´une bordure
        casesContainer.append(cases);// on place chaque case dans la balise article créee pour les contenir
    };
}


// creation de la fonction qui recuperer le choix de couleur
function colorChoice(event) {
    colorChoice = event.target; // on recupere les infos du bouton de choix de couleur click via event.target
    choosenColor = colorChoice.className;// on change valeur de la variable contenant le choix de couleur et lui entrant comme parametre le nom de la classe du bouton choix (empty, plain, light, highlight)
    colorChoice.style.border = '3px solid black' //on change la bordure du bouton qui a ete clické pour l'identifier visuellement sur le site
    }

// function qui va permettre de changer la couleur des cases du space invader
function changeBackgroundColor(event) {
    var cases = event.target; //ici on identifie quelle case a ete clickée

    //ensuite via des if on compare la valeur recuperer par la fonction colorChoice qui pour savoir quelle couleur appliquer 
    //et on change le background-color et le border de chaque case suivant le choix
    if (choosenColor === 'plain') {
        cases.style.backgroundColor = 'silver';
        cases.style.border = '5px solid darkgrey';
    } else if (choosenColor === 'empty'){
        cases.style.backgroundColor = 'blue';
        cases.style.border = '5px solid darkblue';
    } else if (choosenColor === 'light') {
        cases.style.backgroundColor = 'gold';
        cases.style.border = '5px solid darkgoldenrod';
    } else if (choosenColor === 'highlight') {
        cases.style.backgroundColor = 'lightgreen';
        cases.style.border = '5px solid green';
    }
};

// THE END

// reste a faire (si tu veux te triturer le cerveau)

// quand une couleur est choisie, le border des autres boutons reviennent a leur etat d'origine

//finir le refactoring du code (bonus avec app et app.init) > trouver comment passer les valeurs d'une methodes à une autre au sein d'un objet (different que passer les valeur d'une fonction a une autre hors objet)
//ajouter les deniers elements crées pour les bonus 2 et 3.