// Assigned Variables
var selectedPlayer = false;
var selectedEnemy = false;
var enemiesDead = 0;
var elementsMastered = 0;
// Variables
var enemyHP
var playerHP
var attackPower
var ATKstat = ''
var DEFstat = ''
// JQuery Variables
var $Water = $("#Water")
var $Fire = $("#Fire")
var $Air = $("#Air")
var $Earth = $("#Earth")

// Setup
$('#enemyMessage').text('Welcome to')
$('#title').text('ELEMENTS')
$('#playerMessage').text('Select your Element')

// When Player selects Element
$('.element').on('click', function () {
    if (!selectedPlayer) {
        // Assign the Element 
        $('#title').text('')
        $(this).addClass("player")
        $(this).appendTo("#player")
        selectedPlayer = true
        // Stats are assigned to the other Elements based on the Player's Element 
        if ($Water.hasClass('player')) {
            $Water.data({
                health: 100,
                attack: 10,
                counter: 10,
            });
            $Fire.data({
                health: 100,
                attack: 10,
                counter: 5,
            });
            $Air.data({
                health: 50,
                attack: 10,
                counter: 5,
            });
            $Earth.data({
                health: 150,
                attack: 10,
                counter: 15,
            });

        } else if ($Fire.hasClass('player')) {
            $Water.data({
                health: 150,
                attack: 10,
                counter: 15,
            });
            $Fire.data({
                health: 100,
                attack: 10,
                counter: 10,
            });
            $Air.data({
                health: 50,
                attack: 10,
                counter: 5,
            });
            $Earth.data({
                health: 100,
                attack: 10,
                counter: 5,
            });

        } else if ($Air.hasClass('player')) {
            $Water.data({
                health: 100,
                attack: 10,
                counter: 5,
            });
            $Fire.data({
                health: 50,
                attack: 10,
                counter: 15,
            });
            $Air.data({
                health: 100,
                attack: 10,
                counter: 10,
            });
            $Earth.data({
                health: 150,
                attack: 10,
                counter: 10,
            });
        } else {
            $Water.data({
                health: 50,
                attack: 10,
                counter: 15,
            });
            $Fire.data({
                health: 150,
                attack: 15,
                counter: 10,
            });
            $Air.data({
                health: 100,
                attack: 10,
                counter: 5,
            });
            $Earth.data({
                health: 100,
                attack: 10,
                counter: 10,
            });
        }
        // Player's Element Stats are assigned
        playerHP = $('.player').data('health')
        attackPower = $('.player').data('attack')
        $('#playerMessage').text('Player HP: ' + playerHP)
        // Display Stats for unselected Elements
        ShowStats($Water);
        ShowStats($Fire);
        ShowStats($Air);
        ShowStats($Earth);
        $('.player').find('.ATKstats').text('')
        $('.player').find('.DEFstats').text('')
        // Attack Button Setup
        var $attack = $('<button>')
        $attack.text('Attack')
        $($attack).appendTo("#player")
        $($attack).addClass('attack')
        $($attack).attr('onclick', 'Attack()')
        $('.attack').attr('disabled', true);
        // Prompt User to select opponent 
        $('#enemyMessage').text('Select your Opponent')
    }
    // When Player selects Enemy
    if (selectedPlayer && !selectedEnemy) {
        // Assign the Element
        if (!$(this).hasClass("player")) {
            $(this).addClass("enemy")
            $(this).appendTo("#enemy")
            selectedEnemy = true
            // Assign Element Stats to Enemy Stats
            enemyHP = $('.enemy').data('health')
            $('.attack').attr('disabled', false);
            $('#enemyMessage').text('Enemy HP: ' + enemyHP)
        }
    }
});

//Displays easy-to-read stats for the User
function ShowStats($element) {
    switch ($element.data('health')) {
        case 150: $element.find('.DEFstats').text('DEF: +1')
            break;
        case 100: $element.find('.DEFstats').text('DEF: +0')
            break;
        case 50: $element.find('.DEFstats').text('DEF: -1')
            break;
    }
    switch ($element.data('counter')) {
        case 15: $element.find('.ATKstats').text('ATK: +1')
            break;
        case 10: $element.find('.ATKstats').text('ATK: +0')
            break;
        case 5: $element.find('.ATKstats').text('ATK: -1')
            break;
    }
}

// When Player attacks Enemy
function Attack() {
    enemyHP -= attackPower
    attackPower += 2
    if (enemyHP > 0) {
        playerHP -= $('.enemy').data('counter')
        $('#playerMessage').text('Player HP: ' + playerHP)
        $('#enemyMessage').text('Enemy HP: ' + enemyHP)
        // Enemy beats player
        if (playerHP <= 0) {
            $('#enemyMessage').text('You Lose')
            $('#playerMessage').text('Select your Element')
            GameOver();
        }
    }
    // Player beats Enemy
    else {
        console.log('enemy dead')
        $('.attack').attr('disabled', true);
        $('.enemy').hide('slow');
        $('.element').removeClass('enemy')
        enemiesDead++
        // Player beats all three Enemeies
        if (enemiesDead == 3) {
            Achievement($Water,'Water','blue')
            Achievement($Fire,'Fire','darkorange')
            Achievement($Air,'Air','lightblue')
            Achievement($Earth,'Earth','green')
            elementsMastered++;
            // Player beats all three Enemies with all four Elements
            if(elementsMastered === 4){
            $('#enemyMessage').text('You are the')
            $('#title').text('ELEMENT MASTER')
            $('#playerMessage').text('')
            }else{
            $('#enemyMessage').text('You Win')
            $('#playerMessage').text('Select another Element')
            }
            GameOver();
        }
        else {
            selectedEnemy = false;
            $('#enemyMessage').text('Select another Opponent')
        }
    }
    // Outputs proper Achievement div in the Achievments row
    function Achievement (element,elementClass,color){
        if (element.hasClass('player') && !$('#achievements').hasClass(elementClass)) {
            var $achievement = $('<div>')
            var $title = $('<p></p>')
            $title.addClass('title')
            $title.text(elementClass + " Master")
            $achievement.append($title)
            $achievement.attr({
                class:'col-1',
                class:'text-center'
            })
            $achievement.css({
                backgroundColor: color,
                color: "white",
                opacity: "0.8",
                padding: "30px",
            })
            $achievement.appendTo("#achievements")
            $('#achievements').addClass(elementClass)
        }
    }
}

// Resets Game
function GameOver() {
    $('.attack').remove()
    $('.element').removeClass('enemy player')
    $('.element').appendTo("#house")
    $('.element').show('slow');
    $('.ATKstats').text('')
    $('.DEFstats').text('')
    selectedPlayer = false;
    selectedEnemy = false;
    enemiesDead = 0;
}