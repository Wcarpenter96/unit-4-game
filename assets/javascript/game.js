var selectedPlayer = false;
var selectedEnemy = false;
var enemiesDead = 0;
var elementsMastered = 0;

var enemyHP
var playerHP
var attackPower
var ATKstat = ''
var DEFstat = ''

var $Water = $("#Water")
var $Fire = $("#Fire")
var $Air = $("#Air")
var $Earth = $("#Earth")

$('#enemyMessage').text('Welcome to')
$('#title').text('ELEMENTS')
$('#playerMessage').text('Select your Element')

$('.element').on('click', function () {
    if (!selectedPlayer) {
        $('#title').text('')
        $(this).addClass("player")
        $(this).appendTo("#player")
        selectedPlayer = true
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
        playerHP = $('.player').data('health')
        $('#playerMessage').text('Player HP: ' + playerHP)
        attackPower = $('.player').data('attack')
        var $attack = $('<button>')
        $attack.text('Attack')
        $($attack).appendTo("#player")
        $($attack).addClass('attack')
        $($attack).attr('onclick', 'Attack()')
        $('.attack').attr('disabled', true);
        ShowStats($Water);
        ShowStats($Fire);
        ShowStats($Air);
        ShowStats($Earth);
        $('.player').find('.ATKstats').text('')
        $('.player').find('.DEFstats').text('')
        $('#enemyMessage').text('Select your Opponent')
    }
    if (selectedPlayer && !selectedEnemy) {
        if (!$(this).hasClass("player")) {
            $(this).addClass("enemy")
            $(this).appendTo("#enemy")
            selectedEnemy = true
            enemyHP = $('.enemy').data('health')
            $('.attack').attr('disabled', false);
            $('#enemyMessage').text('Enemy HP: ' + enemyHP)
        }
    }
});

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

function Attack() {
    enemyHP -= attackPower
    attackPower += 2
    if (enemyHP > 0) {
        playerHP -= $('.enemy').data('counter')
        $('#playerMessage').text('Player HP: ' + playerHP)
        $('#enemyMessage').text('Enemy HP: ' + enemyHP)
        if (playerHP <= 0) {
            $('#enemyMessage').text('You Lose')
            $('#playerMessage').text('Select your Element')
            GameOver();
        }
    }
    else {
        console.log('enemy dead')
        $('.attack').attr('disabled', true);
        $('.enemy').hide('slow');
        $('.element').removeClass('enemy')
        enemiesDead++
        if (enemiesDead == 3) {
            Achievement($Water,'Water','blue')
            Achievement($Fire,'Fire','darkorange')
            Achievement($Air,'Air','lightblue')
            Achievement($Earth,'Earth','green')
            elementsMastered++;
            if(elementsMastered === 4){
            $('#enemyMessage').text('You are the')
            $('#title').text('ELEMENT MASTER')
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

    function Achievement (element,elementClass,color){
        if (element.hasClass('player') && !$('#achievements').hasClass(elementClass)) {
            var $achievement = $('<div>')
            var $title = $('<h5></h5>')
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