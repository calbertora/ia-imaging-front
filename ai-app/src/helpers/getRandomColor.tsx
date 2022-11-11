import randomColor from 'randomcolor';

export const getRandomColor=()=>randomColor({

    luminosity: 'light',
    format:'rgbArray'

})