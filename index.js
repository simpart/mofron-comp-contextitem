/**
 * @file  mofron-comp-contextitem.js
 * @brief contextmenu item component for mofron
 * @license MIT
 */
const Text = require('mofron-comp-text');
const Color = require('mofron-effect-color');
const Hover = require('mofron-event-hover');
const Click = require('mofron-event-click');
const comutl  = mofron.util.common;
const ConfArg = mofron.class.ConfArg;

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) ratio parameter
     *                key-value: component option
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("ContextItem");
            this.shortForm('text');
	    this.confmng().add('clickEvent', { type:'event', list:true });
	    /* set config */
	    if (0 < arguments.length) {
                this.config(p1);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    hoverEvent (p1,p2,p3) {
        try {
	    p3.execEffect((true === p2) ? 2:3);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    clickEvent (fnc,prm) {
        try {
            if (undefined === fnc) {
                return this.confmng('clickEvent');
	    }
	    this.confmng('clickEvent',[fnc,prm]);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
	    this.style({
                'align-items': 'center',
                'display':     'flex'
	    });
            this.size('100%','0.3rem');
	    this.effect([
                new Color({ tag:'ContextItem', speed:100, eid:2, type:'base' }),
                new Color({ tag:'ContextItem', speed:100, eid:3, type:'base', color:[255,255,255] })
	    ]);

	    let clk = (c1,c2,c3) => {
                try {
                    let cevt = c1.clickEvent();
		    for (let cidx in cevt) {
                        cevt[cidx][0](c1,c2,cevt[cidx][1]);
		    }
		} catch (e) {
                    console.error(e.stack);
                    throw e;
		}
	    }
            this.event([
	       new Hover(new ConfArg(this.hoverEvent,this)),
	       new Hover(new ConfArg(this.hoverEvent,this.text())),
	       new Click(clk)
            ]);
            this.child(this.text());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    text (prm) {
        try {
	    if ('string' === typeof prm) {
	        this.text().text(prm);
                return;
	    } else if (true === comutl.isinc(prm,'Text')) {
                prm.config({
		    style: { 'margin-left':'0.1rem' },
                    effect:[
                        new Color({ tag:'ContextItem', speed:100, eid:2, type:'main' }),
                        new Color({ tag:'ContextItem', speed:100, eid:3, type:'main' })
                    ],
		});
		
	    }
            return this.innerComp('text', prm, Text);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    invert (prm) {
        try {
	    if (true === prm) {
                this.text().effect({ modname:'Color', tag:'ContextItem', eid:2 }).color([255,255,255]);
	        this.text().effect({ modname:'Color', tag:'ContextItem', eid:3 }).color(this.text().mainColor());
            }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    accentColor (prm, opt) {
        try {
            return this.effect({ modname:'Color', eid:2 }).color(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
}
/* end of file */
