const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const formatDate = (minutes, hours, amPm) => {
    if (hours) {
        switch (true) {
            case (hours < 10):
                hours = '0'+hours
                break
            case (hours > 12):
                hours = hours - 12
                amPm = 'PM'
                break
            case (hours == 0):
                hours = 12
                break
            default:
                hours = hours
                amPm = amPm
        }
        if (minutes < 10) minutes = '0'+minutes
        return {
            minutes,
            hours,
            amPm
        }
    }
}
export default {
    days,
    months,
    formatDate
}