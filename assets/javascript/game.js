var selectedPlayer = false;
var selectedEnemy = false;
var enemiesDead = 0;

var enemyHP
var playerHP
var attackPower
var ATKstat = ''
var DEFstat = ''

var $Water = $("#Water")
var $Fire = $("#Fire")
var $Air = $("#Air")
var $Earth = $("#Earth")

$('#playerMessage').text('Select your Element')

$('.element').on('click', function () {
    if (!selectedPlayer) {
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
        $($attack).attr('onclick','Attack()')
        $('.attack').attr('disabled', true);
        ShowStats($Water);
        ShowStats($Fire);
        ShowStats($Air);
        ShowStats($Earth);
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

function ShowStats($element){
    switch($element.data('health')){
        case 150: $('.ATKstats').text('ATK+1')
        case 100: $('.ATKstats').text('ATK+0')
        case 50: $('.ATKstats').text('ATK-1')
    }
    switch($element.data('counter')){
        case 15: $('.DEFstats').text('DEF+1')
        case 10: $('.DEFstats').text('DEF+0')
        case 5: $('.DEFstats').text('DEF-1')
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
            $('#enemyMessage').text('You Lose!')
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
            $('#enemyMessage').text('You Win!')
            $('#playerMessage').text('Select another Element')
            GameOver();
        }
        else {
            selectedEnemy = false;
            $('#enemyMessage').text('Select another Opponent')
        }
    }
}

function GameOver() {
    $('.attack').remove()
    $('.element').removeClass('enemy player')
    $('.element').appendTo("#house")
    $('.element').show('slow');
    selectedPlayer = false;
    selectedEnemy = false;
    enemiesDead = 0;
}