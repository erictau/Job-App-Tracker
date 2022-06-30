module.exports = {
    convertDateString
}

function convertDateString(date) {
    date = new Date(date.toLocaleDateString('en-US', {timeZone: 'UTC'}))
    return date.getFullYear() + '-'
    + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
    + ('0' + date.getDate()).slice(-2)
}