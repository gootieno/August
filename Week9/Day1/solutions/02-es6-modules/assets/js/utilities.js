export const getIndex = () => {
    const wrapper = document.getElementById('wrapper');
    return parseInt(wrapper.dataset.index);
};

export const sayHi = () => {
    console.log('hi')
}

const utils = {
    getIndex: 'f',
    sayHi: 'f'
}