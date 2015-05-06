function muhElem() {
    var weElemNow, weLabelNow, weAllChatNow, weAllChatMessageNow, weKeyNow, weMessageNow, weButtonNow;

    weElemNow = $(document.createElement('span'))
                 .addClass('key-message');

    weLabelNow = $(document.createElement('label'))
                  .addClass('allchat-label');
    weAllChatNow = $(document.createElement('input'))
                   .attr({'type': 'checkbox', 'class': 'allchat'});
    weAllChatMessageNow = $(document.createElement('span'));
    weLabelNow.append(weAllChatNow, weAllChatMessageNow);
    weElemNow.append(weLabelNow, ' ');

    weKeyNow = $(document.createElement('input'))
                .attr({'type': 'text', 'class': 'key', 'placeholder': 'Key'})
                .keyup(function(e) {
                    $(this).data('keyCode', e.which)
                           .val(niceKeyCodes[e.which] || String.fromCharCode(e.which));
                });
    weElemNow.append(weKeyNow).append(' ');
    
    weMessageNow = $(document.createElement('input'))
                    .attr({'type': 'text', 'class': 'message', 'placeholder': 'Type a message', 'maxlength': '70'})
                    .keypress(function(e) {
                        if (e.which == 13) {
                            $(this).next().click();
                        }
                    });
    weElemNow.append(weMessageNow).append(' ');

    weButtonNow = $(document.createElement('button'))
                   .addClass('btn')
                   .text('+')
                   .click(function(){
                        $(this).off('click')
                               .click(function() { $(this).parent().remove() })
                               .addClass('btn-danger')
                               .text('X');
                        $(this).prev().off('keypress');
                        $(this).prev().keypress(function(e) { if (e.which == 13) { $(this).parent().next().children().first().focus() } });
                        $('#messages').append(muhElem());
                        $(this).parent().next().children()[1].focus();
                   });
    weElemNow.append(weButtonNow);

    return weElemNow;
}

var niceKeyCodes = {
    8: "backspace",
    9: "tab",
    13: "enter",
    16: "shift",
    17: "ctrl",
    18: "alt",
    19: "pause/break",
    20: "caps lock",
    27: "escape",
    33: "page up",
    34: "page down",
    35: "end",
    36: "home",
    37: "left arrow",
    38: "up arrow",
    39: "right arrow",
    40: "down arrow",
    45: "insert",
    46: "delete",
    91: "left window",
    92: "right window",
    93: "select key",
    96: "numpad 0",
    97: "numpad 1",
    98: "numpad 2",
    99: "numpad 3",
    100: "numpad 4",
    101: "numpad 5",
    102: "numpad 6",
    103: "numpad 7",
    104: "numpad 8",
    105: "numpad 9",
    106: "multiply",
    107: "add",
    109: "subtract",
    110: "decimal point",
    111: "divide",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "num lock",
    145: "scroll lock",
    186: ",",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'"
};

$('#messages').append(muhElem());

function generate() {
    var macros = '';
    $('.key-message').each(function() {
      if ($(this).children('.message').val()) {
        macros += '    macros[' + $(this).children('.key').data('keyCode') + '] = {"message": "' + $(this).children('.message').val() + '", "toAll": ' + $(this).find('.allchat').prop('checked') + '}; // ' + $(this).children('.key').val() + '\n' }});
    $('#insert').text(macros);
    var fileContent = $('#code-output').text();
    var file = new Blob([fileContent], {type: "data:text/csv;charset=utf-8"});

    var downloadLink = $(document.createElement('a'))
                        .attr({'download': 'chat-macros.user.js', 'href': (window.URL || window.webkitURL).createObjectURL(file)})
                        .text('Click to download your script');
    $('#downloadLink').empty().append(downloadLink);
    $('#code-output').show('fast');
}
$('#generate').click(generate);

// http://stackoverflow.com/a/987376
$('pre').dblclick(function() {
    var doc = document,
        range, selection;
    if (doc.body.createTextRange) { //ms
        range = doc.body.createTextRange();
        range.moveToElementText(this);
        range.select();
    } else if (window.getSelection) { //all others
        selection = window.getSelection();        
        range = doc.createRange();
        range.selectNodeContents(this);
        selection.removeAllRanges();
        selection.addRange(range);
    }
});
