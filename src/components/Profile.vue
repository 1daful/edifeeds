var vm = new Vue({
  el: 'main',
  data: {
    back: '',
    picture: 'https://image.flaticon.com/icons/svg/149/149992.svg',
    name: '',
    birth: '',
    email: '',
    phone: '',
    nationality: '',
  },
  beforeMount() {
    this.generate();
  },
  methods: {
    generate (gender) {
      var self = this;

      $.ajax({
        url: 'https://uinames.com/api/?ext&maxlen=15' + ((gender != null && (gender == "male" || gender == "female")) ? '&gender=' + gender : ''),
        dataType: 'json',
        success: function(data) {

          self.name = data.title + ' ' + data.name + ' ' + data.surname;

          self.gender = data.gender;

          self.birth = new Date(data.birthday.raw*1000).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) + ' (' + data.age + ' years old)';

          self.email = data.email;

          self.phone = data.phone;

          self.nationality = data.region;

          self.picture = data.photo;


          var color = getRandomColor();
          var color1 = shadeColor(color, 40);
          var color2 = shadeColor(color, -40);
          self.back = "linear-gradient(45deg, " + color1 + " 0%, " + color2 + " 100%)";
        }
      });
    },
  }
});

// generate a random color for design
function getRandomColor() {
  var brightness = 4;

  var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
  var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
  var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
  return rgbToHex(mixedrgb[0], mixedrgb[1], mixedrgb[2]);
}

// Shade an hex color
function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);
  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);
  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;
  var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
  var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
  var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));
  return "#" + RR + GG + BB;
}

function rgbToHex(red, green, blue) {
  var rgb = blue | (green << 8) | (red << 16);
  return '#' + (0x1000000 + rgb).toString(16).slice(1)
}


$global_gap: 10px;
$shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
$shadow_hover: 0 6px 10px rgba(0,0,0,0.16), 0 6px 10px rgba(0,0,0,0.23);

@import url('https://fonts.googleapis.com/css?family=Nunito');

body {
  height: 100vh;
  margin: 0; padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  font-family: 'Nunito', sans-serif;
  color: rgb(50, 50, 50);

  main {
    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    .card {
      width: 470px;
      min-height: 185px;

      display: flex;

      padding: $global_gap;
      border-radius: 5px;
      box-shadow: $shadow;
      background: rgba(255, 255, 255, .8);

      .avatar {
        width: 100px;
        height: 100px;
        margin-right: $global_gap;
        border-radius: 50%;
        //box-shadow: $shadow;
        //border: 4px solid rgba(255, 255, 255, .5);
      }

      .infos {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;

        div {

          &:not(:last-child) {
            margin-bottom: $global_gap;
          }

          &.capitalize {
            text-transform: capitalize;
          }

          &.name {
            font-size: 150%;
            font-weight: bold;
          }

          i {
            margin-right: $global_gap;
          }
        }
      }
    }

    .refresh {
      display: flex;
      flex-direction: column;

      margin-left: $global_gap * 4;

      i {
        position: relative;
        height: 40px;
        width: 40px;
        margin: $global_gap 0;
        font-size: 110%;
        line-height: 40px;
        background: rgba(255, 255, 255, .8);
        box-shadow: $shadow;
        border-radius: 50%;
        cursor: pointer;

        transition: background .2s ease-in-out, box-shadow .2s ease-in-out;

        &:hover {
          background: white;
          box-shadow: $shadow_hover;

          &:after {
            opacity: 1;
          }
        }

        &:after {
          content: attr(data-text);
          position: absolute;
          left: calc(100% + #{$global_gap});
          top: 50%;
          transform: translateY(-50%);
          font-size: 80%;
          font-family: 'Nunito', sans-serif;
          line-height: initial;
          background: white;
          padding: ($global_gap / 4) $global_gap;
          border-radius: 1000px;
          box-shadow: $shadow;
          pointer-events: none;
          opacity: 0;
          transition: opacity .2s ease-in-out;
        }
      }
    }
  }

  @media only screen and (max-width: 800px) {
    main {
      flex-direction: column !important;
      font-size: 80%;

      .card {
        max-width: 80%;
        width: auto;
        min-height: 150px;
      }

      .refresh {
        flex-direction: row;

        margin-left: 0;
        margin-top: $global_gap * 3;

        i {
          margin: 0 $global_gap;

          &:after {
            display: none;
          }
        }
      }
    }
  }

  .copy {
    position: absolute;
    bottom: 0; right: 0;
    padding: ($global_gap / 2) $global_gap;
    color: white;

    a {
      color: inherit;
    }
  }
}



var vm = new Vue({
  el: 'main',
  data: {
    back: '',
    picture: 'https://image.flaticon.com/icons/svg/149/149992.svg',
    name: '',
    birth: '',
    email: '',
    phone: '',
    nationality: '',
  },
  beforeMount() {
    this.generate();
  },
  methods: {
    generate (gender) {
      var self = this;

      $.ajax({
        url: 'https://uinames.com/api/?ext&maxlen=15' + ((gender != null && (gender == "male" || gender == "female")) ? '&gender=' + gender : ''),
        dataType: 'json',
        success: function(data) {

          self.name = data.title + ' ' + data.name + ' ' + data.surname;

          self.gender = data.gender;

          self.birth = new Date(data.birthday.raw*1000).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) + ' (' + data.age + ' years old)';

          self.email = data.email;

          self.phone = data.phone;

          self.nationality = data.region;

          self.picture = data.photo;


          var color = getRandomColor();
          var color1 = shadeColor(color, 40);
          var color2 = shadeColor(color, -40);
          self.back = "linear-gradient(45deg, " + color1 + " 0%, " + color2 + " 100%)";
        }
      });
    },
  }
});

// generate a random color for design
function getRandomColor() {
  var brightness = 4;

  var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
  var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
  var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
  return rgbToHex(mixedrgb[0], mixedrgb[1], mixedrgb[2]);
}

// Shade an hex color
function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);
  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);
  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;
  var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
  var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
  var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));
  return "#" + RR + GG + BB;
}

function rgbToHex(red, green, blue) {
  var rgb = blue | (green << 8) | (red << 16);
  return '#' + (0x1000000 + rgb).toString(16).slice(1)
}
