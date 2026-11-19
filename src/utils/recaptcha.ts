// eslint-disable-next-line @typescript-eslint/no-require-imports
const axios = require('axios')

export const fxVerifyRecaptcha = async (token: string) => {
  // Ejemplo de uso
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (!secretKey) {
    throw new Error('RECAPTCHA_SECRET_KEY no está configurada')
  }
  // verifyRecaptcha(secretKey, token)
  //   .then((data) => console.log('Validación reCAPTCHA:', data))
  //   .catch((err) => console.error(err))
  const url = 'https://www.google.com/recaptcha/api/siteverify'
  try {
    const response = await axios.post(url, null, {
      params: {
        secret: secretKey,
        response: token,
      },
    })
    console.log(response.data)
    return response.data // Contiene 'success' y otros datos.
  } catch (error) {
    console.error('Error validando reCAPTCHA:', error)
    throw error
  }
}
