if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

RedactorPlugins.speech = {
    api: null,
    recognizing: false,
    init: function ()
    {
        var inst = this;
        var inst_text = '';
        var time = new Date;

        // This only works in Google Chrome
        if ('undefined' !== typeof(window.chrome)) {
            // Button
            inst.buttonAdd('speech', 'Speech', this.speechRecognition);
            inst.buttonAwesome('speech', 'fa-microphone');
            inst.buttonTagToActiveState('speech');

            // Webkit Speech Recognition API
            inst.api = new webkitSpeechRecognition;

            inst.api.lang = 'en-US';
            inst.api.continuous = true;
            inst.api.interimResults = true;

            inst.api.onstart = function (e) {
                time = e.timeStamp;
                inst.recognizing = true;
            };

            inst.api.onerror = function (e) {
                switch (e) {
                    case 'no-speech':
                        alert('No speech');
                    break;

                    case 'audio-capture':
                        alert('No microphone');
                    break;

                    case 'not-allowed':
                        if (e.timeStamp - time < 100) {
                            alert('Blocked');
                        } else {
                            alert('Denied');
                        }
                    break;
                }
            };

            inst.api.onresult = function (e) {
                var has_temp = false;
                var temp_text = inst.selectionAll() && inst.getSelectionText() || $.trim(inst_text) + ' ';

                if ('undefined' === typeof(e.results) || !inst.recognizing) {
                    inst.api.stop();
                    return;
                }

                for (var i = e.resultIndex; i < e.results.length; ++i) {
                    if (e.results[i].isFinal) {
                        inst_text += e.results[i][0].transcript;
                    } else {
                        has_temp = true;
                        temp_text += e.results[i][0].transcript;
                    }
                }

                if (temp_text && has_temp) {
                    inst.insertText(capitalizeSentences(temp_text));
                } else {
                    inst.insertText(capitalizeSentences(inst_text));
                }
            };

            inst.api.onend = function () {
                inst.recognizing = false;
            };

            function capitalizeSentences(text) {
                var array = [];
                var sentences = text.match(/\(?[^\.\?\!]+[\.\!\?]*\)?/g);

                (sentences || []).forEach(function (sentence) {
                    array.push($.trim(sentence).replace(/\S/, function (character) {
                        return character.toUpperCase();
                    }));
                });

                return array.join(' ');
            }
        }
    },
    speechRecognition: function ()
    {
        if (this.recognizing) {
            this.api.stop();
        } else {
            this.api.start();
        }
    }
};