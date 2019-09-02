var selectedPlayer = false;
var selectedEnemy = false;

var enemyHP
var playerHP
var attackPower

var $Earth = $("#Earth")
var $Fire = $("#Fire")
var $Air = $("#Air")
var $Water = $("#Water")

$Earth.data({
    health: 100,
    attack: 10,
    counter: 10
});

$Fire.data({
    health: 50,
    attack: 10,
    counter: 10,
});

$Air.data({
    health: 150,
    attack: 10,
    counter: 5,
});

$Water.data({
    health: 100,
    attack: 10,
    counter: 5,
});

console.log('Select Player')

$('.element').on('click', function () {
    if (!selectedPlayer) {
        $(this).addClass("offset-8 player")
        selectedPlayer = true
        console.log('Select Enemy')

    }
    if (selectedPlayer && !selectedEnemy) {
        if (!$(this).hasClass("player")) {
            $(this).addClass("offset-4 enemy")
            selectedEnemy = true
            enemyHP = $('.enemy').data('health')
            playerHP = $('.player').data('health')
            attackPower = $('.player').data('attack')
        }
    }
});

$('#Attack').on('click', function () {

    enemyHP -= attackPower
    playerHP -= $('.enemy').data('counter')
    attackPower += 2
    console.log('Enemy HP: ' + enemyHP)
    console.log('Player HP: ' + playerHP)
});


$(document).on("click", ".player", function () {
    console.log('player')
});

$(document).on("click", ".enemy", function () {
    console.log('enemy')
});


