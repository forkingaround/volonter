export function isTextOnly (inputValue) {
    //console.log(typeof inputValue);
    // Regex to match letters
    const regex = /^[a-zA-Z\- éàèùçâêîôûëïü]+$/;
    const str = inputValue.trim();///\s+/;
    //console.log('validation', inputValue, typeof inputValue, inputValue.length, blanks.test(inputValue), regex.test(inputValue));
    //if (inputValue.length > 0 && blanks.test(inputValue))  {
    //    return false;
    //} else {
        return regex.test(str) ? true : false;
    //};
}