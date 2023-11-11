cc.Class({
    extends: cc.Component,
    properties: {
        Eventx2Nap: cc.Node,
    },
    onLoad () {
        console.log('onLoad'+cc.RedT.IS_LOGIN);
    },
    start(){
        console.log('start:'+cc.RedT.IS_LOGIN);
       
    },
    onEnable(){
        if (cc.RedT.IS_LOGIN) {
            this.Eventx2Nap.active = true; 
        }else{
            this.Eventx2Nap.active = false; 
        }
    },
    onClose: function() {
        this.Eventx2Nap.active = false; 
        this.node.active = false; 
        
    },
});
