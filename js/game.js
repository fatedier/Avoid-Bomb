window.answer = parseInt(Math.random()*100, 10)

$(document).on('ready', begin)

function begin() {
  var range = $('.range')
  loopForTimes( 100, function(i) {
    range.append($('<div class="dot" data-number="'+ (i + 1) + '"></div>'))
  })
}

$(document).on('click', '.dot', function() {
  number = parseInt($(this).data('number'), 10)
  guess(number, 'you')
})

function hubotGuess () {
  setTimeout(function() {
    number = parseInt( $('.dot').eq(parseInt((Math.random()*100, 10)%($('.dot').length - 1)) + 1).data('number'), 10)
    guess(number, 'bot')
  }, 1000)
}

function guess (number, role) {
  write(role + ' guessed ' + number)
  if(number == window.answer) {
    $('.dot[data-number='+ window.answer + ']').addClass('boom')
    write('boom!!!!! ' + role + ' lost!')
  } else if (number < window.answer) {
    $('.dot').filter(function(_, e) {
      return parseInt($(e).data('number'), 10) < number
    }).remove()

    logRange()
  } else {
    $('.dot').filter(function(_,e) {
      return parseInt($(e).data('number'), 10) > number
    }).remove()
    logRange()
  }
  if( role != 'bot' && number != window.answer ) {
    hubotGuess()
  }

}

function logRange() {
  write($('.dot:first').data('number') + ' to ' + $('.dot:last').data('number'))
}

function write(text) {
  $('.range').after('<p>' + text + '</p>')
}

// Because I don't like ot write for()
function loopForTimes( times, callback ) {
  for( var i=0; i < times; i++ ){
    callback(i)
  }
}