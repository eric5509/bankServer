import { trimValue } from "./helper.js"

export const validate = ({firstName, middleName, lastName, email, phone, street, city, state, country,postalCode, imf, cot, accountType, pin, password, birthDate, gender}) => {
    if (
        !trimValue(firstName) ||
        !trimValue(middleName) ||
        !trimValue(lastName) ||
        !trimValue(email) ||
        !trimValue(phone) ||
        !trimValue(gender) ||
        !trimValue(birthDate) ||
        !trimValue(street) ||
        !trimValue(city) ||
        !trimValue(state) ||
        !trimValue(country) ||
        !trimValue(postalCode) ||
        !trimValue(imf) ||
        !trimValue(cot) ||
        !trimValue(accountType) ||
        !trimValue(pin) ||
        !trimValue(password)
      ) return false
      return true
}


export const maleAvatars = [26, 29, 16, 44, 40, 31, 17, 41, 20, 46]

export const femaleAvatars = [90, 92, 76, 68, 57, 74, 58, 75, 51, 59]