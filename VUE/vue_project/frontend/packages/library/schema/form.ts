import * as Yup from 'yup'

const userInfoSchema = Yup.object().shape({
  firstName: Yup.string().min(4, 'First name should be minimum 4 character').required('First name is required'),
  lastName: Yup.string().min(5, 'Last name should be minimum 5 character').required('Last name is required'),
  email: Yup.string().email('Please type correct email address').required('Email is required'),
})

export { userInfoSchema }
