const SamplePlayer = () => ({

    samples : {},
    init : function(data){

    },
    addSample : function(sampleName, url){
        this.samples[sampleName] = url;
    }, 
    play : function(sampleName){
        new Audio(this.samples[sampleName]).play();
    }

});

export default SamplePlayer;