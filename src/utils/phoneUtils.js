const getTelco = (phone) => {
  if (!phone) return ''

  // Ensure the phone starts with '+'
  const num = phone.startsWith('+') ? phone : '+' + phone

  // Tanzania generic rule
  if (num.startsWith('+255')) return 'Tanzania'

  // Safaricom prefixes
  const safaricom = [
    '+25470',
    '+25471',
    '+25472',
    '+254740',
    '+254741',
    '+254742',
    '+254743',
    '+254745',
    '+254746',
    '+254748',
    '+254757',
    '+254758',
    '+254759',
    '+254768',
    '+254769',
    '+25479',
    '+254110',
    '+254111',
    '+254112',
    '+254113',
    '+254114',
    '+254115',
  ]
  if (safaricom.some((prefix) => num.startsWith(prefix))) return 'Safaricom'

  // Airtel prefixes
  const airtel = [
    '+25473',
    '+254750',
    '+254751',
    '+254752',
    '+254753',
    '+254754',
    '+254755',
    '+254756',
    '+254762',
    '+254767',
    '+25478',
    '+25410',
  ]
  if (airtel.some((prefix) => num.startsWith(prefix))) return 'Airtel'

  // Telcom
  if (num.startsWith('+25477')) return 'Telcom'

  // Faiba
  if (num.startsWith('+254747')) return 'Faiba'

  return 'Unknown'
}

const cleanPhoneNumber = (raw) => {
  if (!raw)
    return {
      cleaned: '',
      isValid: false,
      reason: 'Empty: no number provided',
    }

  let str = String(raw).trim()

  if (str.toUpperCase().includes('E')) {
    str = Number(str).toFixed(0)
  }

  let cleaned = str.replace(/\D/g, '')

  if (
    (cleaned.startsWith('254') || cleaned.startsWith('255')) &&
    cleaned.length === 12
  ) {
    cleaned = '+' + cleaned
  } else if (cleaned.length === 9) {
    cleaned = '+254' + cleaned
  }

  let isValid = false
  let reason = ''
  if (cleaned.length !== 13) {
    reason = 'Numbers should be 13 digits long including the + sign'
  } else if (!(cleaned.startsWith('+254') || cleaned.startsWith('+255'))) {
    reason = 'Number should start with +254 or +255'
  } else {
    isValid = true
    reason = ''
  }

  return { cleaned, isValid, reason }
}

const detectDuplicates = (data) => {
  const seen = new Set()
  const duplicates = new Set()

  data.forEach((row) => {
    const phone = row.mobile
    if (seen.has(phone)) {
      duplicates.add(phone)
    } else {
      seen.add(phone)
    }
  })

  // Return a new array with a "isDuplicate" flag
  return data.map((row) => ({
    ...row,
    isDuplicate: duplicates.has(row.mobile),
  }))
}

export { getTelco, detectDuplicates, cleanPhoneNumber }
