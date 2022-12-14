const SamplePlayer = () => ({

    samples : {},
    init : function(data){

    },
    addSample : function(sampleName, url){
        this.samples[sampleName] = new Audio(url);
        console.log(this.samples[sampleName]);
    }, 
    play : function(sampleName){
        setTimeout(() => {
            this.samples[sampleName].muted = false;
        }, 50);
        this.samples[sampleName].muted = true;
        this.samples[sampleName].currentTime = 0;
        this.samples[sampleName].play();

    }

});

export default SamplePlayer;