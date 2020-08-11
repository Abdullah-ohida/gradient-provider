const css = document.querySelector('.css');
const colorbox1 = document.querySelector('.color1');
const colorbox2 = document.querySelector('.color2');
const linear = document.getElementById('gradient');
const btn = document.querySelector('.btn');
const output1 = document.querySelector('.output1');
const output2 = document.querySelector('.output2');
const copy = document.querySelectorAll('.copy');
const degree = document.querySelector('.degree');
const submitBtn = document.querySelector('.submit');

[colorbox1, colorbox2].forEach(colorbox => colorbox.addEventListener('input', () => {
    linear.style.background = `linear-gradient(to right, ${colorbox1.value}, ${colorbox2.value})`
}))
    let fCol = '';
    let sCol = '';
function changeGradient(firstcolor, secondcolor) {
    let angle = Math.floor(Math.random() * 360);
    fCol = firstcolor;
    sCol = secondcolor;
    if(degree.value === '') {
        linear.style.background = `linear-gradient(${angle}deg, ${firstcolor}, ${secondcolor})`;
        css.textContent = `linear-gradient(${angle}deg, ${firstcolor}, ${secondcolor})`;
    } else if(degree.value > 360){
        Swal.fire({
            title: 'Input value between 0 to 360',
            toast: true,
            width: 600,
            padding: '3em',
          })
    }else {
        linear.style.background = `linear-gradient(${degree.value}deg, ${fCol}, ${sCol})`;
        css.textContent = `linear-gradient(${degree.value}deg, ${fCol}, ${sCol})`;
        degree.value = "";
    }
};

submitBtn.addEventListener('click', () => {
    changeGradient(fCol, sCol)
})

btn.addEventListener('click', doprocess);

function getRandomColors() {
    let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let color1 = "#";
    let color2 = "#";
    let colorarray = []

    for (let i = 0; i < 6; i++) {
        color1 += values[(Math.floor(Math.random() * values.length))];
        color2 += values[(Math.floor(Math.random() * values.length))];
    }

    output1.value = color1;
    output1.style.color = color1;
    output2.value = color2;
    output2.style.color = color2;
    color1.value = color1;
    color2.value = color2;
    colorarray.push(color1, color2);
    return colorarray;
}

function doprocess() {
    let colors = getRandomColors()
    changeGradient(colors[0], colors[1])
    colorbox1.value = colors[0]
    colorbox2.value = colors[1];
    copy.forEach(item => item.style.display = 'inline-block');
}

copy.forEach(item => {
    item.addEventListener('click', () => {
        item.select();
        document.execCommand('copy');
        let msg = new SpeechSynthesisUtterance();
        if('speechSynthesis' in window){
            msg.text = `${item.value} copied to clipboard`;
            window.speechSynthesis.speak(msg);
        }else{
            alert("Sorry, your browser doesn't support text to speech!")
        }
        
        Swal.fire({
            position: 'top-end',
            toast: true,
            title: `${msg.text}`,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true, 
            icon: 'success'
        })
    })
});

