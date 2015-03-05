var cssAnimator = {
    general: function($elem, addClass, removeClass, finishCallback, isTransition, delayMs) {
    	var exec = function() {
    		var transEvents     = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
	        var animEvents      = 'animationend oAnimationEnd webkitAnimationEnd';
	        
	        var evts = animEvents;
	        if (isTransition) {
	            evts = transEvents;
	        }

	        if (removeClass && !$elem.hasClass(removeClass)) {
	        	finishCallback($elem);
	        	return;
	        }
	        
	        $elem.one(evts, function(){
	            $elem.off(evts);
	            finishCallback($elem);
	        });
	        
	        if (addClass!==false && addClass!==null) {
	            $elem.addClass(addClass);
	        }
	        
	        if (removeClass!==false && removeClass!==null) {
	            $elem.removeClass(removeClass);
	        }
    	};
        
        setTimeout(function(){
    		exec();
    	}, delayMs ? delayMs : 0);
    },
    transition: function($elem, addClass, removeClass, finishCallback, delayMs) {
        this.general($elem, addClass, removeClass, finishCallback, true, delayMs);
    },
    animation: function($elem, addClass, removeClass, finishCallback, delayMs) {
        this.general($elem, addClass, removeClass, finishCallback, false, delayMs);
    }
};
