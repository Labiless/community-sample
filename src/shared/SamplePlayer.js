const SamplePlayer = () => ({

    samples : {},
    init : function(data){

    },
    addSample : function(sampleName, url){
        this.samples[sampleName] = new Audio(url);
    }, 
    play : function(sampleName){
        this.samples[sampleName].play();
    }

});

export default SamplePlayer;