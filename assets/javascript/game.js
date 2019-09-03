var selectedPlayer = false;
var selectedEnemy = false;
var enemiesDead = 0;

var enemyHP
var playerHP
var attackPower

var $Water = $("#Water")
var $Fire = $("#Fire")
var $Air = $("#Air")
var $Earth = $("#Earth")

$('#Attack').attr('disabled', true);
console.log('Select Player')

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
        attackPower = $('.player').data('attack')
        console.log('Select Enemy')
    }
    if (selectedPlayer && !selectedEnemy) {
        if (!$(this).hasClass("player")) {
            $(this).addClass("enemy")
            $(this).appendTo("#enemy")
            selectedEnemy = true
            enemyHP = $('.enemy').data('health')
            $('#Attack').attr('disabled', false);
            console.log(enemyHP)
        }
    }
});

$('#Attack').on('click', function () {
    enemyHP -= attackPower
    attackPower += 2
    if (enemyHP > 0) {
        playerHP -= $('.enemy').data('counter')
        if (playerHP <= 0) {
            console.log('You lose')
            GameOver();
        }
    }
    else {
        console.log('enemy dead')
        $('#Attack').attr('disabled', true);
        $('.enemy').hide('slow');
        $('.element').removeClass('enemy')
        enemiesDead++
        if (enemiesDead == 3) {
            console.log('You Win!')
            GameOver();
        }
        else {
            selectedEnemy = false;
            console.log('Select Another Enemy')
        }
    }
    console.log('Enemy HP: ' + enemyHP)
    console.log('Player HP: ' + playerHP)
});

function GameOver() {
    $('#Attack').attr('disabled', true);
    $('.element').removeClass('enemy player')
    $('.element').appendTo("#house")
    $('.element').show('slow');
    selectedPlayer = false;
    selectedEnemy = false;
    enemiesDead = 0;
}