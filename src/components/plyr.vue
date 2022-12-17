<!-- The preferred way to apply the component is by wrapping it with -->
<!-- the <plyr> tag. It has a lot more flexibility as you are able -->
<!-- to manage your element directly. -->
<!-- video element -->
<plyr>
    <video>
        <source src="video.mp4" type="video/mp4" />
        <source src="video.ogg" type="video/ogg" />
    </video>
</plyr>
<!-- audio element -->
<plyr>
    <audio>
        <source src="audio.mp3" type="audio/mp3" />
               <source src="audio.ogg" type="audio/ogg" />
    </audio>
</plyr>
<!-- youtube iframe with progressive enhancement -->
<plyr>
    <div class="plyr__video-embed">
        <iframe src="https://www.youtube.com/embed/bTqVqk7FSmY" allowfullscreen allowtransparency allow="autoplay"></iframe>
    </div>
</plyr>
<!-- youtube div element -->
<plyr>
    <div data-type="youtube" data-video-id="bTqVqk7FSmY" />
</plyr>
<!-- vimeo iframe with progressive enhancement -->
<plyr>
    <div class="plyr__video-embed">
        <iframe src="https://player.vimeo.com/video/147865858" allowfullscreen allowtransparency allow="autoplay"></iframe>
    </div>
</plyr>
<!-- vimeo div element -->
<plyr>
    <div data-type="vimeo" data-video-id="147865858" />
</plyr
