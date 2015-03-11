var cssAnimator = {
    process: function($elem, modifierFunc, finishedFunc, opts) {
        var listenTo = opts.listenAtElem ? opts.listenAtElem : $elem;

        var eventNs         = '.r'+Math.floor(Math.random()*100000)+' ';
        var transEvents     = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend '
        	.replace(/\s/g,eventNs);
        var animEvents      = 'animationend oAnimationEnd webkitAnimationEnd '
        	.replace(/\s/g,eventNs);
        

        var bind = function() {
            var eventsToTrigger = transEvents+' '+animEvents;

            listenTo.off(eventsToTrigger).one(eventsToTrigger, function(){
                listenTo.off(eventsToTrigger);
                finishedFunc($elem);
            });


            modifierFunc($elem);

            var animDuration    = parseFloat(listenTo.css('animation-duration'))*1000;
            var transDuration   = parseFloat(listenTo.css('transition-duration'))*1000;
            
            if (isNaN(animDuration)) {
                animDuration = 0;
            }

            if (isNaN(transDuration)) {
                transDuration = 0;
            }

            if (transDuration==0 && animDuration==0) {
                listenTo.off(eventsToTrigger);
                finishedFunc($elem);
            }

            if (opts.useDuration) {
                //uses duration instead of ...end-event
                listenTo.off(eventsToTrigger);
                var durationMs = Math.max(animDuration,transDuration);

                if (typeof opts.useDuration=='function') {
                    durationMs = opts.useDuration(durationMs);
                }

                setTimeout(function(){
                    finishedFunc($elem);
                }, durationMs+5);
            }
        };


        setTimeout(bind, opts.delayMs ? opts.delayMs : 0);        
    },
    animate: function($elem, modFunc, finFunc, useDuration) {
        this.process($elem, modFunc, finFunc, {"useDuration": useDuration});
    }
};
