const SamplePlayer = () => ({

    samples : {},
    init : function(data){

    },
    addSample : (name, url) => {
        samples[name] = {
            audio : new Audio(url),
            play : this.audio.play()
        }
    } 

});

export default SamplePlayer;