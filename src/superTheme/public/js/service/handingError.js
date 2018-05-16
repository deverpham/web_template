var handlingError = (response) => {
    if(!('responseText' in response)) {
        console.log(response)
    } else {
        alert('Error:' + response.responseText);
    }
}
module.exports = handlingError;